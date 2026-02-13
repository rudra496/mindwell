/**
 * Application configuration constants
 */

export const config = {
  contact: {
    email: 'contactmindwellorg@gmail.com',
    website: 'https://rudra496.github.io/site',
    github: 'https://github.com/rudra496/mindwell',
    facebook: 'https://www.facebook.com/share/1ApXh7C6L5/',
  },
  site: {
    name: 'MindWell',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://mindwell-navy.vercel.app',
    description: 'World\'s Largest Free Mental Health Platform',
  },
  advisors: {
    farzanaLinkedIn: 'https://www.linkedin.com/in/farzanahussain?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  },
  developer: {
    name: 'Rudra Sarker',
    linkedin: 'https://www.linkedin.com/in/rudra-sarker',
    facebook: 'https://facebook.com/rudra496',
    github: 'https://github.com/rudra496',
    phone: '+880-XXXX-XXXXXX', // To be updated
  },
} as const
