import express from 'express';
import { CorsMiddleware } from './middleware/cors.middleware.js';

export class Server {

  constructor({ port, routes, acceptedOrigins, publicPath = 'public', serverListener }) {
    this.app = express();
    this.port = port;
    this.routes = routes;
    this.acceptedOrigins = acceptedOrigins;
    this.publicPath = publicPath;
    this.serverListener = undefined;
  }

  async start() {

    //* Middlewares
    this.app.use(CorsMiddleware.corsAllow({ acceptedOrigins: this.acceptedOrigins }))
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
    this.app.disable('x-powered-by');

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //* Routes
    this.app.use(this.routes);

    //* SPA
    this.app.get('*', (req, res) => {
      res.redirect('/');
    });

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`🚀 Server running on port ${this.port}`);
    });

  }

  close() {
    this.serverListener?.close();
  }

}