import { join } from 'path';
import * as express from 'express';
require('dotenv').config();
import * as helmet from 'helmet';
import { createProxyMiddleware } from 'http-proxy-middleware';
import * as cors from 'cors';
import * as compression from 'compression';
import * as winston from 'winston';


const app = express();
const router = express.Router();
const prerender = require('prerender');
let prerenderServer;
/**
 * Set APP ENV CONFIG
 */
const APP_PORT = process.env.APP_PORT;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
/**
 * FOLDER CONFIG
 */
const DIST_FOLDER = join(process.cwd(), './dist/');
const PRERENDER_HOST = process.env.PRERENDER_HOST;
/**
 * *LOGGER
 */
const logger = winston.createLogger();

if (IS_PRODUCTION) {
  prerenderServer = prerender({
  chromeFlags: [ '--no-sandbox', '--headless', '--disable-gpu', '--remote-debugging-port=9222', '--hide-scrollbars', '--disable-dev-shm-usage' ],
  forwardHeaders: true,
  chromeLocation: '/usr/bin/chromium-browser'
});
} else {
  prerenderServer = prerender();
}

async function bootstrap() {
  try {
    prerenderServer.start();
    logger.info(`Prerender server started`, {
      name: 'prerender'
    });
  } catch (e) {
    logger.error('prerender server', e);
  }
  app.use(express.static(DIST_FOLDER));
  app.use(compression());
  app.use(cors());
  app.use(helmet());
  app.use(createProxyMiddleware('/api/v1/', {target: process.env.BACKEND_URL}));
  app.use(require('prerender-node')
    .set('prerenderServiceUrl', 'http://localhost:3000/')
    .set('host', PRERENDER_HOST));
  router.get('/*', ( req, res) => {
    res.sendFile(DIST_FOLDER + `/index.html`);
  });
  app.use(`/`, router);

  app.listen(APP_PORT, () => {
    logger.info(`Node Express server listening on http://localhost:${APP_PORT}`);
  });
}
(async () => {
  try {
    await bootstrap();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
