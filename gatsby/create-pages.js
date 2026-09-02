const createStaticPages = require('./create-static-pages');

module.exports = async (options) => {
  await createStaticPages(options);

  options.actions.createRedirect({
    fromPath: '/schedule/',
    toPath: '/agenda/',
    isPermanent: true,
    redirectInBrowser: true,
  });

  options.actions.createRedirect({
    fromPath: '/program/',
    toPath: '/agenda/',
    isPermanent: true,
    redirectInBrowser: true,
  });
};
