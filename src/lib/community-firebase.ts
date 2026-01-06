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
} from "firebase/firestore";

import { db, auth } from "./firebase";
import { generateAnonymousName } from "./anon-names";

const postsRef = collection(db, "communityPosts");
const repliesRef = collection(db, "communityReplies");

// CREATE POST
export async function postToCommunity(data: {
  title: string;
  content: string;
  category: string;
  triggerWarnings?: string[];
  warningText?: string;
  hasCrisisLanguage?: boolean;
}) {
  if (!auth.currentUser) throw new Error("Authentication required");

  if (!data.title.trim() || !data.content.trim()) {
    throw new Error("Title and content are required");
  }

  const post: any = {
    title: data.title.trim(),
    content: data.content.trim(),
    category: data.category,
    triggerWarnings: data.triggerWarnings || [],
    displayName: generateAnonymousName(),
    userId: auth.currentUser.uid,
    createdAt: serverTimestamp(),
    likes: 0,
    hasWarning: Boolean(data.warningText || data.hasCrisisLanguage),
  };

  if (data.warningText) post.warningText = data.warningText;
  if (data.hasCrisisLanguage) post.hasCrisisLanguage = true;

  return await addDoc(postsRef, post);
}

// GET POSTS
export async function getCommunityPosts() {
  const q = query(postsRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...(d.data() as any),
  }));
}

// GET REPLIES BY POST ID
export async function getReplies(postId: string) {
  const q = query(
    repliesRef,
    where("postId", "==", postId),
    orderBy("createdAt", "asc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...(d.data() as any),
  }));
}

// ADD REPLY
export async function addReply(postId: string, content: string) {
  if (!auth.currentUser) throw new Error("Authentication required");

  if (!content.trim()) throw new Error("Reply cannot be empty");

  const reply: any = {
    postId,
    content: content.trim(),
    userId: auth.currentUser.uid,
    displayName: generateAnonymousName(),
    createdAt: serverTimestamp(),
    likes: 0,
  };

  return await addDoc(repliesRef, reply);
}

// LIKE POST
export async function likePost(postId: string) {
  const ref = doc(db, "communityPosts", postId);
  await updateDoc(ref, { likes: increment(1) });
}

// LIKE REPLY
export async function likeReply(replyId: string) {
  const ref = doc(db, "communityReplies", replyId);
  await updateDoc(ref, { likes: increment(1) });
}
