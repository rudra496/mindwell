import { db, auth } from "./firebase";
import { collection, addDoc, getDocs, query, orderBy, doc, getDoc, updateDoc, increment, serverTimestamp, setDoc } from "firebase/firestore";
import { generateAnonymousName } from "./anon-names";

// Check if a user is banned (for moderation)
// (For production, use a Firestore-triggered function to auto-create 'user' docs on first activity)
export async function isUserBanned(uid: string) {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);
  return snap.exists() && snap.data()?.banned === true;
}

// Create or update user doc (for tracking ban/admin)
export async function ensureUserExists(uid: string, email: string) {
  const usersRef = doc(db, "users", uid);
  await setDoc(usersRef, {
    banned: false,
    email,
    isAdmin: email === "YOUR_ADMIN_EMAIL@gmail.com"  // CHANGE THIS!
  }, { merge: true });
}

export async function postToCommunity({ title, content, category, triggerWarnings = [], warningText = "", hasCrisisLanguage = false }: {
  title: string; content: string; category: string; triggerWarnings?: string[]; warningText?: string; hasCrisisLanguage?: boolean;
}) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not signed in");
  await ensureUserExists(user.uid, user.email!);
  if (await isUserBanned(user.uid)) throw new Error("Banned user");
  await addDoc(collection(db, "posts"), {
    title,
    content,
    category,
    displayName: generateAnonymousName(),
    ownerUID: user.uid,
    isAdmin: user.email === "YOUR_ADMIN_EMAIL@gmail.com",   // CHANGE THIS!
    likes: 0,
    hasWarning: triggerWarnings.length > 0 || hasCrisisLanguage,
    warningText: warningText || "",
    createdAt: serverTimestamp(),
  });
}

export async function getCommunityPosts() {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() })) as any[];
}

// Like a post
export async function likePost(postId: string) {
  const postRef = doc(db, "posts", postId);
  await updateDoc(postRef, { likes: increment(1) });
}

// Replies
export async function addReply(postId: string, content: string) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not signed in");
  if (await isUserBanned(user.uid)) throw new Error("Banned user");
  const reply = {
    content,
    displayName: generateAnonymousName(),
    ownerUID: user.uid,
    createdAt: serverTimestamp(),
    likes: 0,
  };
  await addDoc(collection(db, `posts/${postId}/replies`), reply);
}

export async function getReplies(postId: string) {
  const q = query(collection(db, `posts/${postId}/replies`), orderBy("createdAt", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() })) as any[];
}

export async function likeReply(postId: string, replyId: string) {
  const replyRef = doc(db, `posts/${postId}/replies`, replyId);
  await updateDoc(replyRef, { likes: increment(1) });
}
