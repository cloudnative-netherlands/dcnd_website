import LINKS from 'constants/links.js';

const MENUS = {
  header: [
    { text: 'Sponsors', ...LINKS.sponsors },
    { text: 'Team', ...LINKS.team },
    {
      text: 'Past editions',
      children: [{ text: '2025', ...LINKS.past2025 }],
    },
  ],
  footer: [
    { text: 'Schedule', ...LINKS.schedule },
    { text: 'Code of Conduct', ...LINKS.conduct },
    { text: 'Team', ...LINKS.team },
    { text: 'Our Vision', ...LINKS.vision },
    //{ text: 'Imprint & Data Privacy', ...LINKS.privacy },
  ],
  mobile: [
    { text: 'Sponsors', ...LINKS.sponsors },
    { text: 'Team', ...LINKS.team },
    {
      text: 'Past editions',
      children: [{ text: '2025', ...LINKS.past2025 }],
    },
  ],
};

export default MENUS;
