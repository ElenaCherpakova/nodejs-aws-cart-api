import { NestFactory } from '@nestjs/core';

import helmet from 'helmet';

import { AppModule } from './app.module';

const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (req, callback) => callback(null, true),
  });
  app.use(helmet());

  await app.listen(port);
}
bootstrap().then(() => {
  console.log('App is running on %s port', port);
});

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ExpressAdapter } from '@nestjs/platform-express';
// import { Server } from 'http';
// import { createServer, proxy } from 'aws-serverless-express';
// import * as express from 'express';
// import { Callback, Context, Handler } from 'aws-lambda';

// let cachedServer: Server;

// const bootstrapServer = async (): Promise<Server> => {
//   const expressApp = express();
//   const nestApp = await NestFactory.create(
//     AppModule,
//     new ExpressAdapter(expressApp),
//   );
//   nestApp.enableCors({
//     origin: (req, callback) => callback(null, true),
//   });

//   await nestApp.init();
//   return createServer(expressApp);
// };

// export const handler: Handler = async (
//   event: any,
//   context: Context,
//   callback: Callback,
// ) => {
//   if (!cachedServer) {
//     console.log('Initializing server...');
//     cachedServer = await bootstrapServer();
//   }
//   return proxy(cachedServer, event, context, 'PROMISE').promise;
// };
