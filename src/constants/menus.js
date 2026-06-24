import LINKS from 'constants/links.js';

const MENUS = {
  header: [
    { text: 'Tickets', ...LINKS.tickets },
    { text: 'Program', ...LINKS.program },
    { text: 'Sponsors', ...LINKS.sponsors },
    { text: 'Team', ...LINKS.team },
    {
      text: 'Past editions',
      children: [{ text: '2025', ...LINKS.past2025 }],
    },
  ],
  footer: {
    conference: [
      { text: 'Tickets', ...LINKS.tickets },
      { text: 'Program', ...LINKS.program },
      { text: 'Sponsors', ...LINKS.sponsors },
      { text: 'Team', ...LINKS.team },
      { text: 'Past editions', children: [{ text: '2025', ...LINKS.past2025 }] },
    ],
    community: [
      { text: 'Our vision', ...LINKS.vision },
      { text: 'Code of Conduct', ...LINKS.conduct },
      { text: 'Diversity tickets', ...LINKS.diversityTickets },
      { text: 'Join our Community', ...LINKS.community },
    ],
    legal: [{ text: 'Privacy', ...LINKS.privacy }],
  },
  mobile: [
    { text: 'Tickets', ...LINKS.tickets },
    { text: 'Program', ...LINKS.program },
    { text: 'Sponsors', ...LINKS.sponsors },
    { text: 'Team', ...LINKS.team },
    {
      text: 'Past editions',
      children: [{ text: '2025', ...LINKS.past2025 }],
    },
  ],
};

export default MENUS;
