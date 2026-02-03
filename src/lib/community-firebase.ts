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
  arrayUnion,
  CollectionReference
} from "firebase/firestore";

import { db, auth } from "./firebase";
import { generateAnonymousName } from "./anon-names";

// =====================================================
// COLLECTION REFERENCES
// =====================================================

// Lazy collection references to avoid errors when Firebase isn't configured
const getPostsRef = () => {
  if (!db) throw new Error("Firebase not configured");
  return collection(db, "communityPosts");
};

const getRepliesRef = () => {
  if (!db) throw new Error("Firebase not configured");
  return collection(db, "communityReplies");
};

// =====================================================
// CREATE COMMUNITY POST
// =====================================================

export async function postToCommunity(data: {
  title: string;
  content: string;
  category: string;
  triggerWarnings?: string[];
  warningText?: string;
  hasCrisisLanguage?: boolean;
}) {
  if (!auth?.currentUser) throw new Error("Authentication required");
  
  const postsRef = getPostsRef();

  return await addDoc(postsRef, {
    title: data.title.trim(),
    content: data.content.trim(),
    category: data.category,
    triggerWarnings: data.triggerWarnings || [],
    displayName: generateAnonymousName(),
    userId: auth.currentUser.uid,

    createdAt: serverTimestamp(),

    // like system enforced in rules
    likes: 0,
    likedBy: [],

    hasWarning: !!data.warningText || !!data.hasCrisisLanguage,
    warningText: data.warningText || null
  });
}

// =====================================================
// GET ALL POSTS (LATEST FIRST)
// =====================================================

export async function getCommunityPosts() {
  const postsRef = getPostsRef();
  const q = query(postsRef, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);

  return snap.docs.map(d => ({
    id: d.id,
    ...d.data()
  }));
}

// =====================================================
// ADD REPLY
// =====================================================

export async function addReply(postId: string, content: string) {
  if (!auth?.currentUser) throw new Error("Authentication required");
  
  const repliesRef = getRepliesRef();

  return await addDoc(repliesRef, {
    postId,
    content: content.trim(),
    userId: auth.currentUser.uid,
    displayName: generateAnonymousName(),

    createdAt: serverTimestamp(),

    likes: 0,
    likedBy: []
  });
}

// =====================================================
// GET REPLIES FOR POST
// =====================================================

export async function getReplies(postId: string) {
  const repliesRef = getRepliesRef();
  const q = query(
    repliesRef,
    where("postId", "==", postId),
    orderBy("createdAt", "asc")
  );

  const snap = await getDocs(q);

  return snap.docs.map(d => ({
    id: d.id,
    ...d.data()
  }));
}

// =====================================================
// LIKE POST (BLOCK MULTIPLE LIKES)
// =====================================================

export async function likePost(postId: string) {
  if (!auth?.currentUser) throw new Error("Authentication required");
  if (!db) throw new Error("Firebase not configured");

  const ref = doc(db, "communityPosts", postId);

  await updateDoc(ref, {
    likes: increment(1),
    likedBy: arrayUnion(auth.currentUser.uid)
  });
}

// =====================================================
// LIKE REPLY (BLOCK MULTIPLE LIKES)
// =====================================================

export async function likeReply(replyId: string) {
  if (!auth?.currentUser) throw new Error("Authentication required");
  if (!db) throw new Error("Firebase not configured");

  const ref = doc(db, "communityReplies", replyId);

  await updateDoc(ref, {
    likes: increment(1),
    likedBy: arrayUnion(auth.currentUser.uid)
  });
}

// =====================================================
// EDIT REPLY
// =====================================================

export async function editReply(replyId: string, content: string) {
  if (!auth?.currentUser) throw new Error("Authentication required");
  if (!db) throw new Error("Firebase not configured");

  return await updateDoc(doc(db, "communityReplies", replyId), {
    content: content.trim()
  });
}

// =====================================================
// DELETE REPLY
// =====================================================

export async function deleteReply(replyId: string) {
  if (!auth?.currentUser) throw new Error("Authentication required");
  if (!db) throw new Error("Firebase not configured");

  return await deleteDoc(doc(db, "communityReplies", replyId));
}

// =====================================================
// EDIT POST
// =====================================================

export async function editPost(postId: string, data: { title: string; content: string }) {
  if (!auth?.currentUser) throw new Error("Authentication required");
  if (!db) throw new Error("Firebase not configured");

  return await updateDoc(doc(db, "communityPosts", postId), {
    title: data.title.trim(),
    content: data.content.trim(),
  });
}

// =====================================================
// DELETE POST
// =====================================================

export async function deletePost(postId: string) {
  if (!auth?.currentUser) throw new Error("Authentication required");
  if (!db) throw new Error("Firebase not configured");

  return await deleteDoc(doc(db, "communityPosts", postId));
}
