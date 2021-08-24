import express from 'express';
import path from 'path';

import template from './template';

/**
 * Routers
 */
import { fetchDataExercice1, fetchDataExercice2, render } from '../controllers';

const server = express();

server.use(
  '/static',
  express.static(path.join(__dirname, '..', '..', 'dist', 'static'))
);

/**
 * Mount routers
 */
server.get('/', (req, res) => {
  res.redirect('/exercise1');
});

server.get('/exercise1', fetchDataExercice1, render(template, 'exercice1'));

server.get('/exercise2', fetchDataExercice2, render(template, 'exercice2'));

server.listen(8080, () => console.log('Server started http://localhosts:8080'));
