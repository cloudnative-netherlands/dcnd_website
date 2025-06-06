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
    to: '/schedule',
    id: getAnchor('Schedule'),
    homeTo: '/schedule',
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
    to: '',
    target: '_blank',
    external: true,
  },
  mission: {
    to: '/mission-statement',
    target: '_blank',
    external: true,
  },
  vision: {
    to: '/vision',
    target: '_blank',
    external: true,
  },
  conduct: {
    to: 'https://cloudnativenetherlands.nl/coc/',
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
