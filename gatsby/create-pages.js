const createStaticPages = require('./create-static-pages');

module.exports = async (options) => {
  await createStaticPages(options);

  options.actions.createRedirect({
    fromPath: '/schedule/',
    toPath: '/program/',
    isPermanent: true,
    redirectInBrowser: true,
  });
};
