import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  getDoc,
  runTransaction,
  writeBatch,
  Timestamp,
} from "firebase/firestore";

import { db, auth } from "./firebase";
import { generateAnonymousName } from "./anon-names";

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  category: string;
  triggerWarnings?: string[];
  displayName: string;
  userId: string;
  createdAt?: Timestamp;
  likes: number;
  likedBy: string[];
  commentsCount: number;
  hasWarning?: boolean;
  warningText?: string | null;
}

export interface CommunityReply {
  id: string;
  postId: string;
  parentReplyId?: string | null;
  content: string;
  userId: string;
  displayName: string;
  createdAt?: Timestamp;
  likes: number;
  likedBy: string[];
}

const getPostsRef = () => {
  if (!db) throw new Error("Firebase not configured");
  return collection(db, "communityPosts");
};

const getRepliesRef = () => {
  if (!db) throw new Error("Firebase not configured");
  return collection(db, "communityReplies");
};

const ensureAuthenticatedUid = () => {
  const uid = auth?.currentUser?.uid;
  if (!uid) throw new Error("Authentication required");
  return uid;
};

export async function postToCommunity(data: {
  title: string;
  content: string;
  category: string;
  triggerWarnings?: string[];
  warningText?: string;
  hasCrisisLanguage?: boolean;
}) {
  const uid = ensureAuthenticatedUid();
  const postsRef = getPostsRef();

  return await addDoc(postsRef, {
    title: data.title.trim(),
    content: data.content.trim(),
    category: data.category,
    triggerWarnings: data.triggerWarnings || [],
    displayName: generateAnonymousName(),
    userId: uid,
    createdAt: serverTimestamp(),
    likes: 0,
    likedBy: [],
    commentsCount: 0,
    hasWarning: !!data.warningText || !!data.hasCrisisLanguage,
    warningText: data.warningText || null,
  });
}

const mapPost = (d: any): CommunityPost => {
  const raw = d.data();
  const likedBy = Array.isArray(raw.likedBy) ? raw.likedBy : [];
  return {
    id: d.id,
    ...raw,
    likedBy,
    likes: typeof raw.likes === "number" ? raw.likes : likedBy.length,
    commentsCount: typeof raw.commentsCount === "number" ? raw.commentsCount : 0,
  } as CommunityPost;
};

const mapReply = (d: any): CommunityReply => {
  const raw = d.data();
  const likedBy = Array.isArray(raw.likedBy) ? raw.likedBy : [];
  return {
    id: d.id,
    ...raw,
    likedBy,
    likes: typeof raw.likes === "number" ? raw.likes : likedBy.length,
    parentReplyId: raw.parentReplyId ?? null,
  } as CommunityReply;
};

export async function getCommunityPosts(): Promise<CommunityPost[]> {
  const q = query(getPostsRef(), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(mapPost);
}

export function subscribeToCommunityPosts(
  onData: (posts: CommunityPost[]) => void,
  onError?: (error: Error) => void
) {
  const q = query(getPostsRef(), orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snap) => onData(snap.docs.map(mapPost)),
    (err) => onError?.(err as Error)
  );
}

export async function addReply(postId: string, content: string, parentReplyId: string | null = null) {
  const uid = ensureAuthenticatedUid();
  if (!db) throw new Error("Firebase not configured");
  const repliesRef = getRepliesRef();

  const reply = await addDoc(repliesRef, {
    postId,
    parentReplyId,
    content: content.trim(),
    userId: uid,
    displayName: generateAnonymousName(),
    createdAt: serverTimestamp(),
    likes: 0,
    likedBy: [],
  });

  await runTransaction(db, async (tx) => {
      const postRef = doc(db, "communityPosts", postId);
      const postSnap = await tx.get(postRef);
      if (!postSnap.exists()) throw new Error("Post not found");
      tx.update(postRef, {
        commentsCount: (postSnap.data().commentsCount || 0) + 1,
      });
    });

  return reply;
}

export async function getReplies(postId: string): Promise<CommunityReply[]> {
  const q = query(getRepliesRef(), where("postId", "==", postId), orderBy("createdAt", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map(mapReply);
}

export function subscribeToReplies(
  postId: string,
  onData: (replies: CommunityReply[]) => void,
  onError?: (error: Error) => void
) {
  const q = query(getRepliesRef(), where("postId", "==", postId), orderBy("createdAt", "asc"));
  return onSnapshot(
    q,
    (snap) => onData(snap.docs.map(mapReply)),
    (err) => onError?.(err as Error)
  );
}

export async function togglePostLike(postId: string) {
  const uid = ensureAuthenticatedUid();
  if (!db) throw new Error("Firebase not configured");

  return runTransaction(db, async (tx) => {
    const postRef = doc(db, "communityPosts", postId);
    const snap = await tx.get(postRef);
    if (!snap.exists()) throw new Error("Post not found");

    const likedBy: string[] = Array.isArray(snap.data().likedBy) ? snap.data().likedBy : [];
    const hasLiked = likedBy.includes(uid);
    const nextLikedBy = hasLiked ? likedBy.filter((id) => id !== uid) : [...likedBy, uid];

    tx.update(postRef, {
      likedBy: nextLikedBy,
      likes: nextLikedBy.length,
    });

    return { liked: !hasLiked, likes: nextLikedBy.length };
  });
}

export async function toggleReplyLike(replyId: string) {
  const uid = ensureAuthenticatedUid();
  if (!db) throw new Error("Firebase not configured");

  return runTransaction(db, async (tx) => {
    const replyRef = doc(db, "communityReplies", replyId);
    const snap = await tx.get(replyRef);
    if (!snap.exists()) throw new Error("Reply not found");

    const likedBy: string[] = Array.isArray(snap.data().likedBy) ? snap.data().likedBy : [];
    const hasLiked = likedBy.includes(uid);
    const nextLikedBy = hasLiked ? likedBy.filter((id) => id !== uid) : [...likedBy, uid];

    tx.update(replyRef, {
      likedBy: nextLikedBy,
      likes: nextLikedBy.length,
    });

    return { liked: !hasLiked, likes: nextLikedBy.length };
  });
}

export async function editReply(replyId: string, content: string) {
  const uid = ensureAuthenticatedUid();
  if (!db) throw new Error("Firebase not configured");

  const replyRef = doc(db, "communityReplies", replyId);
  const snap = await getDoc(replyRef);
  if (!snap.exists()) throw new Error("Reply not found");
  if (snap.data().userId !== uid) throw new Error("Unauthorized");

  return await updateDoc(replyRef, {
    content: content.trim(),
  });
}

export async function deleteReply(replyId: string) {
  const uid = ensureAuthenticatedUid();
  if (!db) throw new Error("Firebase not configured");

  const replyRef = doc(db, "communityReplies", replyId);
  const snap = await getDoc(replyRef);
  if (!snap.exists()) throw new Error("Reply not found");
  if (snap.data().userId !== uid) throw new Error("Unauthorized");

  const postId = snap.data().postId as string;
  const postReplies = await getReplies(postId);

  const children = postReplies.filter((r) => r.parentReplyId === replyId);
  const toDelete = [replyId, ...children.map((c) => c.id)];

  const batch = writeBatch(db);
  toDelete.forEach((id) => batch.delete(doc(db, "communityReplies", id)));

  const postRef = doc(db, "communityPosts", postId);
  const postSnap = await getDoc(postRef);
  const currentCount = (postSnap.data()?.commentsCount || 0) as number;
  batch.update(postRef, { commentsCount: Math.max(0, currentCount - toDelete.length) });

  await batch.commit();
}

export async function editPost(postId: string, data: { title: string; content: string }) {
  const uid = ensureAuthenticatedUid();
  if (!db) throw new Error("Firebase not configured");

  const postRef = doc(db, "communityPosts", postId);
  const snap = await getDoc(postRef);
  if (!snap.exists()) throw new Error("Post not found");
  if (snap.data().userId !== uid) throw new Error("Unauthorized");

  return await updateDoc(postRef, {
    title: data.title.trim(),
    content: data.content.trim(),
  });
}

export async function deletePost(postId: string) {
  const uid = ensureAuthenticatedUid();
  if (!db) throw new Error("Firebase not configured");

  const postRef = doc(db, "communityPosts", postId);
  const snap = await getDoc(postRef);
  if (!snap.exists()) throw new Error("Post not found");
  if (snap.data().userId !== uid) throw new Error("Unauthorized");

  const repliesSnap = await getDocs(query(getRepliesRef(), where("postId", "==", postId)));

  const batch = writeBatch(db);
  batch.delete(postRef);
  repliesSnap.docs.forEach((replyDoc) => {
    batch.delete(doc(db, "communityReplies", replyDoc.id));
  });

  await batch.commit();
}
