import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const html = read('src/html.jsx');
const hero = read('src/components/pages/home/hero/hero.jsx');
const tickets = read('src/components/pages/home/tickets/tickets.jsx');
const checkout = read('src/components/pages/home/eventbrite-embedded-checkout.jsx');
const sponsors = read('src/components/pages/home/sponsors/sponsors.jsx');
const footer = read('src/components/shared/footer/footer.jsx');
const privacy = read('content/static-pages/privacy.md');
const menus = read('src/constants/menus.js');

assert.match(html, /Cookie-free aggregate analytics/);
assert.match(html, /data-goatcounter="https:\/\/dcnd\.goatcounter\.com\/count"/);
assert.match(html, /src="https:\/\/gc\.zgo\.at\/count\.js"/);

[
  ['ticket-click', 'Ticket click', `${hero}\n${tickets}`],
  ['eventbrite-open', 'Eventbrite checkout opened', `${tickets}\n${checkout}`],
  ['cfp-click', 'CFP click', hero],
  ['sponsor-click', 'Sponsor click', `${hero}\n${sponsors}`],
  ['contact-click', 'Contact click', `${tickets}\n${sponsors}\n${footer}`],
].forEach(([path, title, source]) => {
  assert.match(source, new RegExp(`data-goatcounter-click="${path}"`));
  assert.match(source, new RegExp(`data-goatcounter-title="${title}"`));
});

assert.match(checkout, /window\.goatcounter/);
assert.match(checkout, /typeof window\.goatcounter\.count === 'function'/);
assert.match(checkout, /path: 'eventbrite-open'/);
assert.match(checkout, /event: true/);

assert.match(privacy, /privacy-friendly, cookie-free analytics/);
assert.match(privacy, /We use GoatCounter, an open-source privacy-friendly analytics tool/);
assert.match(privacy, /The embedded Eventbrite checkout is loaded only after you allow/);
assert.match(privacy, /Eventbrite may process your personal data and use cookies/);
assert.match(menus, /Privacy/);
