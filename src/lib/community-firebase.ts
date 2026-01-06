import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
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
  if (!auth.currentUser) throw new Error("Not authenticated");

  return await addDoc(postsRef, {
    ...data,
    createdAt: serverTimestamp(),
    userId: auth.currentUser.uid,
    displayName: generateAnonymousName(),
    likes: 0,
    isAdmin: false,
    hasWarning: Boolean(data.warningText || data.hasCrisisLanguage),
  });
}

export async function getReplies(postId: string) {
  const q = query(
    repliesRef,
    orderBy("createdAt", "asc"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .filter((r: any) => r.postId === postId);
}

export async function addReply(postId: string, content: string) {
  if (!auth.currentUser) throw new Error("Not authenticated");

  return await addDoc(repliesRef, {
    postId,
    content,
    createdAt: serverTimestamp(),
    userId: auth.currentUser.uid,
    displayName: generateAnonymousName(),
    likes: 0,
  });
}

export async function likePost(postId: string) {
  const postRef = doc(db, "communityPosts", postId);
  await updateDoc(postRef, { likes: increment(1) });
}

export async function likeReply(replyId: string) {
  const replyRef = doc(db, "communityReplies", replyId);
  await updateDoc(replyRef, { likes: increment(1) });
}
