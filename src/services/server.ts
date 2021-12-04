import express from 'express';
import handlebars from 'express-handlebars';
import * as http from 'http';
import router from '../routes/index';
import path from 'path';
import session from 'express-session';
import passport from '../middleware/auth';
import compression from 'compression';
import { errorHandler } from './../middleware/error';
import { graphqlHTTP } from 'express-graphql';
import { graphqlRoot, graphqlSchema } from './graphql';

const app = express();
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const publicFolderPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicFolderPath));

app.use(
  session({
    secret: 'key_secret',
    resave: true,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 600000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(errorHandler);

// configuracion de hbs
const layoutDirPath = path.resolve(__dirname, '../../views/layouts');
const defaultLayerPth = path.resolve(
  __dirname,
  '../../views/layouts/index.hbs'
);
const partialDirPath = path.resolve(__dirname, '../../views/partials/');

app.set('view engine', 'hbs');
app.engine(
  'hbs',
  handlebars({
    layoutsDir: layoutDirPath,
    defaultLayout: defaultLayerPth,
    extname: 'hbs',
    partialsDir: partialDirPath,
  })
);

app.use('/api', router);
app.get('/', (req, res) => {
  res.render('main');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlRoot,
    graphiql: true,
  })
);

// creo mi configuracion para socket
const myServer = new http.Server(app);

myServer.on('error', (err) => {
  console.log('ERROR ATAJADO', err);
});

export default myServer;
