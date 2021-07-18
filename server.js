'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');

const server_host = '0.0.0.0';
const server_port = 8080;

const init = async () => {
  const server = Hapi.server({
    port: server_port,
    host: server_host
  });

  // register hapi plugins
  await server.register(
    require('@hapi/inert')
  );

  // serve other files
  server.route({
    method: 'GET',
    path: '/{file_path*}',
    handler: (request, h) => {
      const file_path = request.params.file_path

      const path = Path.join(__dirname, 'templates/spa', file_path)

      return h.file(path)
    }
  });

  // serve home page
  server.route({
    method: 'GET',
    path: '/',
    handler: async (request, h) => {
      const render = require('./render.js')

      const metatags = await render('pages/home/metatags.html.twig', {
        site_color: '#000000',
        description: 'Site description goes here'
      })

      const scripts_top = await render('pages/home/scripts_top.html.twig')
      const scripts_bottom = await render('pages/home/scripts_bottom.html.twig')

      const body = await render('pages/home/body.html.twig', {
        h1: 'Main heading'
      })

      const page = await render('spa/index.html.twig', {
        title: 'SSR Home Page',
        metatags: metatags,
        body: body,
        scripts_top: scripts_top,
        scripts_bottom: scripts_bottom,
      })

      return h.response(page).type('text/html')
    }
  });

  // handling 404/403 pages by overwriting the response
  server.ext('onPreResponse', async function (request, h) {
    const response = request.response

    // 404 pages redirect to spa index
    if (response.output && response.output.statusCode == 404) {
      const render = require('./render.js')

      const metatags = await render('pages/404/metatags.html.twig', {
        site_color: '#000000',
        description: 'Site description goes here'
      })

      const scripts_top = await render('pages/404/scripts_top.html.twig')
      const scripts_bottom = await render('pages/404/scripts_bottom.html.twig')

      const body = await render('pages/404/body.html.twig', {
        h1: '404 Page not found',
        request_url: request.path
      })

      const page = await render('spa/index.html.twig', {
        title: 'Page not found',
        metatags: metatags,
        body: body,
        scripts_top: scripts_top,
        scripts_bottom: scripts_bottom,
      })

      return h.response(page).type('text/html')
    }

    // 403 pages could be done the same way with the above method

    // other pages
    return h.continue;
  });

  await server.start();

  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
