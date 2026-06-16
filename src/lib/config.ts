/**
 * Application configuration constants
 */

export const config = {
  contact: {
    email: 'contactmindwellorg@gmail.com',
    website: 'https://rudra496.github.io/site',
    github: 'https://github.com/rudra496/mindwell',
    facebook: 'https://www.facebook.com/share/17uZeJjmBc/',
  },
  site: {
    name: 'MindWell',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://rudra496.github.io/mindwell',
    description: 'Open-source mental health education and support platform',
  },
  advisors: {
    farzanaLinkedIn: 'https://www.linkedin.com/in/farzanahussain/',
  },
  developer: {
    name: 'Rudra Sarker',
    linkedin: 'https://www.linkedin.com/company/mindwell-care/',
    facebook: 'https://facebook.com/rudra496',
    github: 'https://github.com/rudra496',
    phone: '+880198822165',
  },
} as const
