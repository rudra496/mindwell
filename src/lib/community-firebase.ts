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
export async function postToCommunity(data: {
  title: string;
  content: string;
  category: string;
  triggerWarnings?: string[];
  warningText?: string;
  hasCrisisLanguage?: boolean;
}) {
  if (!auth.currentUser) throw new Error("Authentication required");

  const post: any = {
    title: data.title,
    content: data.content,
    category: data.category,
    triggerWarnings: data.triggerWarnings || [],
    userId: auth.currentUser.uid,
    displayName: generateAnonymousName(),
    createdAt: serverTimestamp(),
    likes: 0,
    hasWarning: Boolean(data.warningText || data.hasCrisisLanguage),
  };

  // only add optional fields if present (avoid undefined errors)
  if (data.warningText) post.warningText = data.warningText;
  if (data.hasCrisisLanguage) post.hasCrisisLanguage = true;

  return await addDoc(postsRef, post);
}

//
// GET ALL POSTS (latest first)
//
export async function getCommunityPosts() {
  const q = query(postsRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...(d.data() as any),
  }));
}
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
export async function addReply(postId: string, content: string) {
  if (!auth.currentUser) throw new Error("Authentication required");

  const reply: any = {
    postId,
    content,
    userId: auth.currentUser.uid,
    displayName: generateAnonymousName(),
    createdAt: serverTimestamp(),
    likes: 0,
  };

  return await addDoc(repliesRef, reply);
}
export async function likePost(postId: string) {
  const ref = doc(db, "communityPosts", postId);
  await updateDoc(ref, { likes: increment(1) });
}
export async function likeReply(replyId: string) {
  const ref = doc(db, "communityReplies", replyId);
  await updateDoc(ref, { likes: increment(1) });
}
