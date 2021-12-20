
const Hapi = require('@hapi/hapi');

const Mainfest = require('./config/mainfest')
const OrganizationRoute = require('./routes/organization/handlers');
const UserRoute = require('./routes/users/handlers');

const db = require('./config/database');

const startServer = async () => {

    const mainfest = Mainfest();

    const server = Hapi.server(mainfest.option);

    server.route({
        method: 'GET',
        path: '/health_check',
        handler: (request, h) => {

            return `Organization API's Health Check Looking good!.`;
        }
    });
    server.route(OrganizationRoute);
    server.route(UserRoute);

    await server.start();
    console.log(`Server up and running on ${server.info.address}:${server.info.port}`);
};


startServer().catch((err) => {

  console.error(err);
  process.exit(1);
});