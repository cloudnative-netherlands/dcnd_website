import slugify from 'slugify';

const getAnchor = (str) => slugify(str).toLocaleLowerCase();

export default {
  // Pages and sections
  gallery: {
    to: 'https://lightroom.adobe.com/shares/42d27333b09147bba84e9ed1fb859739',
    target: '_blank',
    external: true,
  },
  home: {
    to: '/',
  },
  schedule: {
    to: '/program',
    id: getAnchor('Program'),
    homeTo: '/program',
  },
  program: {
    to: '/program',
    id: getAnchor('Program'),
    homeTo: '/program',
  },
  sponsors: {
    to: `/#${getAnchor('sponsors')}`,
    id: getAnchor('sponsors'),
    homeTo: null,
  },
  workshops: {
    to: '/workshops',
    id: getAnchor('Workshops'),
    homeTo: '/workshops',
  },
  team: {
    to: '/team',
  },
  tickets: {
    to: `/#${getAnchor('tickets')}`,
    id: getAnchor('tickets'),
    homeTo: null,
  },
  diversityTickets: {
    to: '/#diversity-tickets',
    id: getAnchor('diversity tickets'),
    homeTo: null,
  },
  cfp: {
    to: 'https://sessionize.com/dutch-cloud-native-day-2026/',
    target: '_blank',
    external: true,
  },
  vision: {
    to: '/vision',
    target: '_blank',
    external: true,
  },
  conduct: {
    to: '/conduct',
    target: '_blank',
    external: true,
  },
  privacy: {
    to: '/privacy',
    target: '_blank',
    external: true,
  },
  community: {
    to: 'https://www.linkedin.com/company/cloudnativenl',
    target: '_blank',
    external: true,
  },
  past2025: {
    to: '/2025/',
    target: '_blank',
    external: true,
  },

  // Social-links
  linkedin: {
    to: 'https://www.linkedin.com/company/cloudnativenl',
    target: '_blank',
    external: true,
  },
  googlemaps: {
    to: 'https://maps.app.goo.gl/acWQ2KhUjgGY98717',
    target: '_blank',
    external: true,
  },
  speakers: {
    to: `/speakers`,
    id: getAnchor('Speakers'),
    homeTo: '/speakers',
  },
};
