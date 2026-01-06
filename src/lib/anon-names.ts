// Generate a fun, anonymous display name (for posts/replies)
export function generateAnonymousName() {
  const animals = ["Fox", "Otter", "Bear", "Owl", "Tiger", "Wolf", "Lion", "Rabbit", "Hawk"];
  const adjs = ["Calm", "Kind", "Gentle", "Strong", "Shy", "Brave", "Mellow", "Happy", "Quick"];
  return `${adjs[Math.floor(Math.random()*adjs.length)]}${animals[Math.floor(Math.random()*animals.length)]}${Math.floor(Math.random()*100)}`;
}
