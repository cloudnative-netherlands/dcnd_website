const fs = require('fs');
const path = require('path');

const GTM_ID_PATTERN = /^GTM-[A-Z0-9]+$/;

exports.createPages = require('./gatsby/create-pages');
exports.onCreateNode = require('./gatsby/on-create-node');
exports.createSchemaCustomization = require('./gatsby/create-schema-customization');

exports.onPreBootstrap = ({ reporter }) => {
  // Deploy builds run in CI (GitHub Actions sets CI=true, as does Netlify while
  // that deployment still exists) and `gatsby build` sets NODE_ENV=production.
  // Local production builds stay quiet, exactly as with the previous
  // NETLIFY/CONTEXT check this replaced.
  const isProductionDeployBuild =
    process.env.CI === 'true' && process.env.NODE_ENV === 'production';
  const gtmId = (process.env.GATSBY_GTM_ID || '').trim();

  if (isProductionDeployBuild && !GTM_ID_PATTERN.test(gtmId)) {
    reporter.warn(
      'Production build has no valid GATSBY_GTM_ID; consent-gated Google Analytics will be disabled.'
    );
  }
};

// Dev-only: gatsby develop does not auto-serve index.html for directory URLs
// inside static/. Map /2025/... directory requests to their index.html so the
// frozen 2025 archive behaves the same as in production.
exports.onCreateDevServer = ({ app }) => {
  app.use('/2025', (req, res, next) => {
    const urlPath = req.path.endsWith('/') ? `${req.path}index.html` : req.path;
    const filePath = path.join(__dirname, 'static', '2025', urlPath);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      res.sendFile(filePath);
      return;
    }
    next();
  });
};
