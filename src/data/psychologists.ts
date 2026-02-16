export interface PsychologistProfile {
  name: string
  title: string
  education: string
  experience: string
  imageUrl: string
  whatsapp: string
  phone: string
  skills: string[]
}

export const psychologists: PsychologistProfile[] = [
  {
    name: "Rifat Hasan Tarofder",
    title: "Assistant Clinical Psychologist",
    education: "MS in Clinical Psychology, University of Dhaka",
    experience: "2+ years of clinical experience",
    imageUrl: "/advisors/rifat-hasan-tarofder.jpg",
    whatsapp: "https://wa.me/8801706520948",
    phone: "+8801706520948",
    skills: ["Personality Disorder", "Anxiety Disorders", "Obsessive Compulsive Disorders", "Bipolar & Psychotic Disorders", "Crisis Intervention", "Family & Couple Counseling"],
  },
  {
    name: "Kamrul Hasan",
    title: "Clinical Psychologist",
    education: "University of Dhaka",
    experience: "2+ years of clinical experience",
    imageUrl: "/advisors/kamrul.jpg",
    whatsapp: "https://wa.me/8801835569198",
    phone: "+8801835569198",
    skills: ["Cognitive Behavioral Therapy", "Counseling Psychology", "Mental Health", "Active Listening", "Psychology", "Crisis Management"],
  },
]
