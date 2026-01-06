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

  return await addDoc(postsRef, {
    ...data,
    userId: auth.currentUser.uid,
    displayName: generateAnonymousName(),
    createdAt: serverTimestamp(),
    likes: 0,
    hasWarning: Boolean(data.warningText || data.hasCrisisLanguage),
    isAdmin: false,
  });
}

export async function getReplies(postId: string) {
  const q = query(
    repliesRef,
    where("postId", "==", postId),
    orderBy("createdAt", "asc")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function addReply(postId: string, content: string) {
  if (!auth.currentUser) throw new Error("Authentication required");

  return await addDoc(repliesRef, {
    postId,
    content,
    userId: auth.currentUser.uid,
    displayName: generateAnonymousName(),
    createdAt: serverTimestamp(),
    likes: 0,
  });
}

export async function likePost(postId: string) {
  const ref = doc(db, "communityPosts", postId);
  await updateDoc(ref, { likes: increment(1) });
}

export async function likeReply(replyId: string) {
  const ref = doc(db, "communityReplies", replyId);
  await updateDoc(ref, { likes: increment(1) });
}
