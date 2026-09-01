// Sessionize API event ID for Dutch Cloud Native Day 2026.
// Override with GATSBY_SESSIONIZE_EVENT_ID (inlined into the client bundle at build time).
// NOTE: do NOT reuse 2025's id (ndd4283z) — the archived /2025 site depends on it.
const SESSIONIZE_EVENT_ID = process.env.GATSBY_SESSIONIZE_EVENT_ID || 'ek3rx614';

export const SESSIONIZE_GRID_URL = `https://sessionize.com/api/v2/${SESSIONIZE_EVENT_ID}/view/GridSmart`;
export const SESSIONIZE_SPEAKERS_URL = `https://sessionize.com/api/v2/${SESSIONIZE_EVENT_ID}/view/Speakers`;
