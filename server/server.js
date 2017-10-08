import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
// import path from 'path';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import webpack from 'webpack';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackMiddleware from 'webpack-dev-middleware'; // eslint-disable-line
import webpackConfig from '../webpack.config';
import db from './newModels';
import schema from './schema';


dotenv.config();

const app = express();

// const router = express.Router();
const port = process.env.PORT || 5600;


app.use(logger('tiny'));
if (process.env.NODE_ENV !== 'test') {
  const compiler = webpack(webpackConfig);
  app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use('/graphql', bodyParser.json(), graphqlExpress({
  context: { db },
  schema
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
    // passHeader: `'Authorization': 'bearer token-foo@bar.com'`,
}));

// parse incoming request bodies as json with body-parser
// app.use(bodyParser.json());
// parse incoming request as querystrings also
// app.use(bodyParser.urlencoded({ extended: false }));


// routes(router);
// app.use('/api-docs', express.static(path.join(__dirname, './public/api-docs')));
app.listen(port, () => {
  console.log(`Server started on port ${port}`); // eslint-disable-line
});

// app.use(router);


export default app;
