const path = require('path');
const fs = require('fs');

exports.createPages = require('./gatsby/create-pages');
exports.onCreateNode = require('./gatsby/on-create-node');
exports.createSchemaCustomization = require('./gatsby/create-schema-customization');

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
