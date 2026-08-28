import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
  writeBatch,
  QueryDocumentSnapshot,
  DocumentData,
  startAfter,
} from "firebase/firestore";

import { auth, db } from "./firebase";
import { generateAnonymousName } from "./anon-names";

const POSTS_COLLECTION = "posts";
const REPLIES_COLLECTION = "replies";
const DEFAULT_POST_LIMIT = 20;
const DEFAULT_REPLY_LIMIT = 200;

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  category: string;
  triggerWarnings?: string[];
  displayName: string;
  authorId: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  lastActivityAt?: Timestamp;
  likesCount: number;
  commentsCount: number;
  hasWarning?: boolean;
  warningText?: string | null;
}

export interface CommunityReply {
  id: string;
  postId: string;
  parentReplyId: string | null;
  content: string;
  authorId: string;
  displayName: string;
  createdAt?: Timestamp;
  likesCount: number;
}

const requireDb = () => {
  if (!db) throw new Error("Firebase not configured");
  return db;
};

const ensureAuthenticatedUid = () => {
  const uid = auth?.currentUser?.uid;
  if (!uid) throw new Error("Authentication required");
  return uid;
};

const postsRef = () => collection(requireDb(), POSTS_COLLECTION);
const repliesRef = () => collection(requireDb(), REPLIES_COLLECTION);

const mapPost = (snap: QueryDocumentSnapshot<DocumentData>): CommunityPost => {
  const data = snap.data();
  return {
    id: snap.id,
    title: data.title ?? "",
    content: data.content ?? "",
    category: data.category ?? "General Support",
    triggerWarnings: Array.isArray(data.triggerWarnings) ? data.triggerWarnings : [],
    displayName: data.displayName ?? "Anonymous",
    authorId: data.authorId ?? data.userId ?? "",
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    lastActivityAt: data.lastActivityAt,
    likesCount: typeof data.likesCount === "number" ? data.likesCount : data.likes || 0,
    commentsCount: typeof data.commentsCount === "number" ? data.commentsCount : 0,
    hasWarning: Boolean(data.hasWarning),
    warningText: data.warningText ?? null,
  };
};

const mapReply = (snap: QueryDocumentSnapshot<DocumentData>): CommunityReply => {
  const data = snap.data();
  return {
    id: snap.id,
    postId: data.postId,
    parentReplyId: data.parentReplyId ?? null,
    content: data.content ?? "",
    authorId: data.authorId ?? data.userId ?? "",
    displayName: data.displayName ?? "Anonymous",
    createdAt: data.createdAt,
    likesCount: typeof data.likesCount === "number" ? data.likesCount : data.likes || 0,
  };
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

  return addDoc(postsRef(), {
    title: data.title.trim(),
    content: data.content.trim(),
    category: data.category,
    triggerWarnings: data.triggerWarnings || [],
    displayName: generateAnonymousName(),
    authorId: uid,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    lastActivityAt: serverTimestamp(),
    likesCount: 0,
    commentsCount: 0,
    hasWarning: !!data.warningText || !!data.hasCrisisLanguage,
    warningText: data.warningText || null,
  });
}

export function subscribeToCommunityPosts(
  onData: (posts: CommunityPost[]) => void,
  onError?: (error: Error) => void,
  pageSize: number = DEFAULT_POST_LIMIT,
  after?: QueryDocumentSnapshot<DocumentData>
) {
  // Without a configured Firebase, report through the error callback (like
  // onSnapshot failures) instead of throwing synchronously, which would
  // crash the Community modal via the error boundary.
  if (!db) {
    onError?.(new Error("Firebase not configured"));
    return () => undefined;
  }

  let q = query(postsRef(), orderBy("createdAt", "desc"), limit(pageSize));
  if (after) {
    q = query(postsRef(), orderBy("createdAt", "desc"), startAfter(after), limit(pageSize));
  }

  return onSnapshot(
    q,
    (snap) => onData(snap.docs.map(mapPost)),
    (err) => onError?.(err as Error)
  );
}

export function subscribeToReplies(
  postId: string,
  onData: (replies: CommunityReply[]) => void,
  onError?: (error: Error) => void,
  pageSize: number = DEFAULT_REPLY_LIMIT
) {
  const q = query(
    repliesRef(),
    where("postId", "==", postId),
    orderBy("createdAt", "asc"),
    limit(pageSize)
  );

  return onSnapshot(
    q,
    (snap) => onData(snap.docs.map(mapReply)),
    (err) => onError?.(err as Error)
  );
}

export async function addReply(postId: string, content: string, parentReplyId: string | null = null) {
  const uid = ensureAuthenticatedUid();
  const client = requireDb();

  return runTransaction(client, async (tx) => {
    const postRef = doc(client, POSTS_COLLECTION, postId);
    const postSnap = await tx.get(postRef);
    if (!postSnap.exists()) throw new Error("Post not found");

    const newReplyRef = doc(repliesRef());

    tx.set(newReplyRef, {
      postId,
      parentReplyId,
      content: content.trim(),
      authorId: uid,
      displayName: generateAnonymousName(),
      createdAt: serverTimestamp(),
      likesCount: 0,
    });

    const currentCount = Number(postSnap.data().commentsCount || 0);
    tx.update(postRef, {
      commentsCount: currentCount + 1,
      lastActivityAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return newReplyRef;
  });
}

export async function hasUserLikedPost(postId: string, userId: string) {
  const likeRef = doc(requireDb(), POSTS_COLLECTION, postId, "likes", userId);
  const likeSnap = await getDoc(likeRef);
  return likeSnap.exists();
}

export async function hasUserLikedReply(replyId: string, userId: string) {
  const likeRef = doc(requireDb(), REPLIES_COLLECTION, replyId, "likes", userId);
  const likeSnap = await getDoc(likeRef);
  return likeSnap.exists();
}

export async function togglePostLike(postId: string) {
  const uid = ensureAuthenticatedUid();
  const client = requireDb();

  return runTransaction(client, async (tx) => {
    const postRef = doc(client, POSTS_COLLECTION, postId);
    const likeRef = doc(client, POSTS_COLLECTION, postId, "likes", uid);

    const [postSnap, likeSnap] = await Promise.all([tx.get(postRef), tx.get(likeRef)]);
    if (!postSnap.exists()) throw new Error("Post not found");

    const likesCount = Number(postSnap.data().likesCount || 0);

    if (likeSnap.exists()) {
      tx.delete(likeRef);
      tx.update(postRef, {
        likesCount: Math.max(0, likesCount - 1),
        updatedAt: serverTimestamp(),
      });
      return { liked: false, likesCount: Math.max(0, likesCount - 1) };
    }

    tx.set(likeRef, {
      userId: uid,
      createdAt: serverTimestamp(),
    });
    tx.update(postRef, {
      likesCount: likesCount + 1,
      updatedAt: serverTimestamp(),
      lastActivityAt: serverTimestamp(),
    });
    return { liked: true, likesCount: likesCount + 1 };
  });
}

export async function toggleReplyLike(replyId: string) {
  const uid = ensureAuthenticatedUid();
  const client = requireDb();

  return runTransaction(client, async (tx) => {
    const replyRef = doc(client, REPLIES_COLLECTION, replyId);
    const likeRef = doc(client, REPLIES_COLLECTION, replyId, "likes", uid);

    const [replySnap, likeSnap] = await Promise.all([tx.get(replyRef), tx.get(likeRef)]);
    if (!replySnap.exists()) throw new Error("Reply not found");

    const likesCount = Number(replySnap.data().likesCount || 0);

    if (likeSnap.exists()) {
      tx.delete(likeRef);
      tx.update(replyRef, { likesCount: Math.max(0, likesCount - 1) });
      return { liked: false, likesCount: Math.max(0, likesCount - 1) };
    }

    tx.set(likeRef, {
      userId: uid,
      createdAt: serverTimestamp(),
    });
    tx.update(replyRef, { likesCount: likesCount + 1 });

    return { liked: true, likesCount: likesCount + 1 };
  });
}

export async function editReply(replyId: string, content: string) {
  const uid = ensureAuthenticatedUid();
  const client = requireDb();

  const replyRef = doc(client, REPLIES_COLLECTION, replyId);
  const snap = await getDoc(replyRef);
  if (!snap.exists()) throw new Error("Reply not found");
  if ((snap.data().authorId ?? snap.data().userId) !== uid) throw new Error("Unauthorized");

  return updateDoc(replyRef, {
    content: content.trim(),
  });
}

export async function deleteReply(replyId: string) {
  const uid = ensureAuthenticatedUid();
  const client = requireDb();

  const replyRef = doc(client, REPLIES_COLLECTION, replyId);
  const replySnap = await getDoc(replyRef);
  if (!replySnap.exists()) throw new Error("Reply not found");

  const authorId = replySnap.data().authorId ?? replySnap.data().userId;
  if (authorId !== uid) throw new Error("Unauthorized");

  const postId = replySnap.data().postId as string;

  const childRepliesSnap = await getDocs(
    query(repliesRef(), where("parentReplyId", "==", replyId), limit(100))
  );

  const batch = writeBatch(client);
  batch.delete(replyRef);

  const allDeletedReplyIds = [replyId];
  childRepliesSnap.docs.forEach((childDoc) => {
    allDeletedReplyIds.push(childDoc.id);
    batch.delete(doc(client, REPLIES_COLLECTION, childDoc.id));
  });

  const postRef = doc(client, POSTS_COLLECTION, postId);
  const postSnap = await getDoc(postRef);
  if (postSnap.exists()) {
    const currentCount = Number(postSnap.data().commentsCount || 0);
    batch.update(postRef, {
      commentsCount: Math.max(0, currentCount - allDeletedReplyIds.length),
      updatedAt: serverTimestamp(),
    });
  }

  await batch.commit();
}

export async function editPost(postId: string, data: { title: string; content: string }) {
  const uid = ensureAuthenticatedUid();
  const client = requireDb();

  const postRef = doc(client, POSTS_COLLECTION, postId);
  const snap = await getDoc(postRef);
  if (!snap.exists()) throw new Error("Post not found");
  if ((snap.data().authorId ?? snap.data().userId) !== uid) throw new Error("Unauthorized");

  return updateDoc(postRef, {
    title: data.title.trim(),
    content: data.content.trim(),
    updatedAt: serverTimestamp(),
    lastActivityAt: serverTimestamp(),
  });
}

export async function deletePost(postId: string) {
  const uid = ensureAuthenticatedUid();
  const client = requireDb();

  const postRef = doc(client, POSTS_COLLECTION, postId);
  const snap = await getDoc(postRef);
  if (!snap.exists()) throw new Error("Post not found");
  if ((snap.data().authorId ?? snap.data().userId) !== uid) throw new Error("Unauthorized");

  const relatedReplies = await getDocs(query(repliesRef(), where("postId", "==", postId), limit(500)));

  const batch = writeBatch(client);
  batch.delete(postRef);
  relatedReplies.docs.forEach((replyDoc) => batch.delete(doc(client, REPLIES_COLLECTION, replyDoc.id)));

  await batch.commit();
}
