
export const APP_CONFIG = {
  name: 'VoltStream',
  tagline: 'Stream Your Passion, Build Your Community',
  description: 'The streaming platform built for creators'
};

export const API_URLS = {
  base: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  auth: '/auth',
  streams: '/streams',
  users: '/users'
};

export const ROUTES = {
  home: '/',
  auth: {
    login: '/auth/login',
    signup: '/auth/signup'
  },
  stream: {
    create: '/stream/create',
    watch: '/stream/:id'
  },
  profile: '/profile'
};

export const FEATURES = [
  {
    id: 1,
    icon: 'Video',
    title: 'Professional Studio',
    description: 'Broadcast-quality streaming with multi-source support and real-time effects.',
    features: [
      'Multi-camera switching',
      'Screen share with audio',
      'Real-time filters & effects',
      'Custom scene transitions'
    ]
  },
  {
    id: 2,
    icon: 'DollarSign',
    title: 'Smart Monetization',
    description: 'Multiple revenue streams with automated tools and detailed analytics.',
    features: [
      'Subscription tiers',
      'Donation goals & alerts',
      'Merchandise integration',
      'Revenue analytics'
    ]
  },
  {
    id: 3,
    icon: 'Users',
    title: 'Community Tools',
    description: 'Engage your audience with interactive features and moderation tools.',
    features: [
      'Advanced chat moderation',
      'Community posts',
      'Follower management',
      'Engagement analytics'
    ]
  },
  {
    id: 4,
    icon: 'Globe',
    title: 'Global Reach',
    description: 'Stream to multiple platforms simultaneously with optimized delivery.',
    features: [
      'Multi-platform streaming',
      'Global CDN delivery',
      'Automatic transcoding',
      'Mobile app support'
    ]
  },
  {
    id: 5,
    icon: 'BarChart3',
    title: 'Analytics & Insights',
    description: 'Understand your audience with detailed analytics and growth insights.',
    features: [
      'Real-time viewer metrics',
      'Audience demographics',
      'Revenue tracking',
      'Growth recommendations'
    ]
  },
  {
    id: 6,
    icon: 'Shield',
    title: 'Enterprise Security',
    description: 'Bank-level security with content protection and compliance tools.',
    features: [
      'End-to-end encryption',
      'Content DRM protection',
      'GDPR & CCPA compliant',
      'Two-factor authentication'
    ]
  }
];

export const STATS = [
  {
    icon: 'Video',
    number: '50,000+',
    label: 'Active Streamers',
    description: 'Creators streaming daily'
  },
  {
    icon: 'Eye',
    number: '2.5M+',
    label: 'Total Viewers',
    description: 'Monthly active viewers'
  },
  {
    icon: 'Clock',
    number: '1M+',
    label: 'Hours Streamed',
    description: 'Content hours per month'
  },
  {
    icon: 'Globe',
    number: '150+',
    label: 'Countries Served',
    description: 'Global reach'
  }
];

export const CREATORS = [
  {
    id: 1,
    name: 'Alex Chen',
    category: 'Gaming',
    followers: '125K followers',
    quote: "VoltStream's tools helped me grow from 0 to 125K followers in just 8 months. The community features are incredible!",
    avatar: '/api/placeholder/64/64'
  },
  {
    id: 2,
    name: 'Maria Santos',
    category: 'Digital Art',
    followers: '85K followers',
    quote: "The monetization features let me turn my passion into my full-time career. Best decision I ever made!",
    avatar: '/api/placeholder/64/64'
  },
  {
    id: 3,
    name: 'David Kumar',
    category: 'Technology',
    followers: '200K followers',
    quote: "The multi-platform streaming saved me hours every week. I can focus on content instead of managing multiple streams.",
    avatar: '/api/placeholder/64/64'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Thompson',
    title: 'Gaming Streamer',
    rating: 5,
    quote: "Switched to VoltStream 6 months ago and my viewer engagement is up 300%. The chat features are amazing!",
    verified: true
  },
  {
    id: 2,
    name: 'Mike Rodriguez',
    title: 'Music Producer',
    rating: 5,
    quote: "The audio quality is pristine. Finally found a platform that doesn't compress my music. Highly recommend!"
  },
  {
    id: 3,
    name: 'Emily Park',
    title: 'Art Teacher',
    rating: 5,
    quote: "Teaching online has never been easier. The screen sharing and recording features are perfect for my art classes."
  }
];

export const FAQS = [
  {
    id: 1,
    question: 'Is VoltStream really free to start?',
    answer: 'Yes! Our Starter plan is completely free and includes 720p streaming, basic chat features, and up to 50 concurrent viewers. You can upgrade anytime as your audience grows.'
  },
  {
    id: 2,
    question: 'Can I stream to multiple platforms at once?',
    answer: 'With our Professional plan and above, you can stream simultaneously to multiple platforms including Twitch, YouTube, Facebook, and more.'
  },
  {
    id: 3,
    question: 'What equipment do I need to start streaming?',
    answer: 'You can start with just a webcam and microphone. Our platform works with any streaming software like OBS, XSplit, or our built-in browser streaming tool.'
  },
  {
    id: 4,
    question: 'How do I monetize my streams?',
    answer: 'VoltStream offers multiple monetization options including subscriber tiers, donations, merchandise integration, and sponsored content tools (available on Creator plan and above).'
  },
  {
    id: 5,
    question: 'Is there a mobile app?',
    answer: 'Yes! We have mobile apps for both iOS and Android that support streaming and viewing. You can stream directly from your phone or watch streams on the go.'
  },
  {
    id: 6,
    question: 'What kind of support do you offer?',
    answer: 'We provide 24/7 community support for all users, priority email support for paid plans, and dedicated phone support for Professional and Enterprise customers.'
  }
];
