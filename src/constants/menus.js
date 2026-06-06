import LINKS from 'constants/links.js';

const MENUS = {
  header: [
    { text: 'Tickets', ...LINKS.tickets },
    { text: 'Submit a Talk', ...LINKS.cfp },
    { text: 'Sponsors', ...LINKS.sponsors },
    { text: 'Team', ...LINKS.team },
    {
      text: 'Past editions',
      children: [{ text: '2025', ...LINKS.past2025 }],
    },
  ],
  footer: [
    { text: 'Our Vision', ...LINKS.vision },
    { text: 'Team', ...LINKS.team },
    { text: 'Code of Conduct', ...LINKS.conduct },
    //{ text: 'Imprint & Data Privacy', ...LINKS.privacy },
  ],
  mobile: [
    { text: 'Tickets', ...LINKS.tickets },
    { text: 'Submit a Talk', ...LINKS.cfp },
    { text: 'Sponsors', ...LINKS.sponsors },
    { text: 'Team', ...LINKS.team },
    {
      text: 'Past editions',
      children: [{ text: '2025', ...LINKS.past2025 }],
    },
  ],
};

export default MENUS;
