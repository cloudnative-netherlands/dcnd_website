import LINKS from 'constants/links.js';

const MENUS = {
  header: [
    // { text: 'Tickets', ...LINKS.tickets },
    { text: 'Sponsors', ...LINKS.sponsors },
    { text: 'Team', ...LINKS.team },
    { text: 'Agenda', ...LINKS.program },
    { text: 'Workshops', ...LINKS.workshops },
    { text: 'Speakers', ...LINKS.speakers },
    {
      text: 'Past editions',
      children: [{ text: '2025', ...LINKS.past2025 }],
    },
  ],
  footer: {
    conference: [
      // { text: 'Tickets', ...LINKS.tickets },
      { text: 'Workshops', ...LINKS.workshops },
      { text: 'Agenda', ...LINKS.program },
      { text: 'Speakers', ...LINKS.speakers },
      { text: 'Sponsors', ...LINKS.sponsors },
      { text: 'Team', ...LINKS.team },
      { text: 'Past editions', children: [{ text: '2025', ...LINKS.past2025 }] },
    ],
    community: [
      { text: 'Our vision', ...LINKS.vision },
      { text: 'Code of Conduct', ...LINKS.conduct },
      { text: 'Join our Community', ...LINKS.community },
    ],
    legal: [{ text: 'Privacy', ...LINKS.privacy }],
  },
  mobile: [
    // { text: 'Tickets', ...LINKS.tickets },
    { text: 'Sponsors', ...LINKS.sponsors },
    { text: 'Team', ...LINKS.team },
    { text: 'Agenda', ...LINKS.program },
    { text: 'Workshops', ...LINKS.workshops },
    { text: 'Speakers', ...LINKS.speakers },
    {
      text: 'Past editions',
      children: [{ text: '2025', ...LINKS.past2025 }],
    },
  ],
};

export default MENUS;
