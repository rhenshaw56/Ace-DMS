import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  info: {
    title: 'Ace-DMS API',
    version: '1.0.0',
    description: 'Description of the Ace-DMS APIs',
  },
  host: 'https://ace-dms.herokuapp.com',
  basePath: '/',
};
const options = {
  swaggerDefinition,
  validatorUrl: null,
  apis: [
    './server/routes/documentRoutes.js',
    './server/routes/userRoutes.js',
    './server/routes/roleRoutes.js'
  ]
};
const swaggerSpec = swaggerJSDoc(options);

const swagger = (router) => {
  router.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
    res.send(swaggerSpec);
  });
};

export default swagger;
