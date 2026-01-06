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
  increment,
  deleteDoc,
  arrayUnion
} from "firebase/firestore";

import { db, auth } from "./firebase";
import { generateAnonymousName } from "./anon-names";

// COLLECTION REFERENCES
const postsRef = collection(db, "communityPosts");
const repliesRef = collection(db, "communityReplies");

// ---------------- POST ----------------

export async function postToCommunity(data: {
  title: string;
  content: string;
  category: string;
  triggerWarnings?: string[];
  warningText?: string;
  hasCrisisLanguage?: boolean;
}) {
  if (!auth.currentUser) throw new Error("Authentication required");

  return await addDoc(postsRef, {
    title: data.title,
    content: data.content,
    category: data.category,
    triggerWarnings: data.triggerWarnings || [],
    displayName: generateAnonymousName(),
    userId: auth.currentUser.uid,
    createdAt: serverTimestamp(),
    likes: 0,
    likedBy: [],
    hasWarning: !!data.warningText || !!data.hasCrisisLanguage,
    warningText: data.warningText || null
  });
}

// ---------------- REPLIES ----------------

export async function addReply(postId: string, content: string) {
  if (!auth.currentUser) throw new Error("Authentication required");

  return await addDoc(repliesRef, {
    postId,
    content,
    userId: auth.currentUser.uid,
    displayName: generateAnonymousName(),
    createdAt: serverTimestamp(),
    likes: 0,
    likedBy: []
  });
}

export async function getReplies(postId: string) {
  const q = query(
    repliesRef,
    where("postId", "==", postId),
    orderBy("createdAt", "asc")
  );

  const snap = await getDocs(q);

  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// ---------------- LIKE POST (block multiple) ----------------

export async function likePost(postId: string) {
  if (!auth.currentUser) throw new Error("Authentication required");

  const ref = doc(db, "communityPosts", postId);

  await updateDoc(ref, {
    likes: increment(1),
    likedBy: arrayUnion(auth.currentUser.uid)
  });
}

// ---------------- LIKE REPLY (block multiple) ----------------

export async function likeReply(replyId: string) {
  if (!auth.currentUser) throw new Error("Authentication required");

  const ref = doc(db, "communityReplies", replyId);

  await updateDoc(ref, {
    likes: increment(1),
    likedBy: arrayUnion(auth.currentUser.uid)
  });
}

// ---------------- EDIT REPLY ----------------

export async function editReply(replyId: string, content: string) {
  return await updateDoc(doc(db, "communityReplies", replyId), {
    content
  });
}

// ---------------- DELETE REPLY ----------------

export async function deleteReply(replyId: string) {
  return await deleteDoc(doc(db, "communityReplies", replyId));
}
