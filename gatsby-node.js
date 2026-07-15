const fs = require('fs');
const path = require('path');

const GTM_ID_PATTERN = /^GTM-[A-Z0-9]+$/;

exports.createPages = require('./gatsby/create-pages');
exports.onCreateNode = require('./gatsby/on-create-node');
exports.createSchemaCustomization = require('./gatsby/create-schema-customization');

exports.onPreBootstrap = ({ reporter }) => {
  const isProductionNetlifyBuild =
    process.env.NETLIFY === 'true' && process.env.CONTEXT === 'production';
  const gtmId = (process.env.GATSBY_GTM_ID || '').trim();

  if (isProductionNetlifyBuild && !GTM_ID_PATTERN.test(gtmId)) {
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
