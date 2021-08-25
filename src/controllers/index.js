import React from 'react';
import { getDataExercice1, getDataExercice2 } from '../server/services';
import Exercise1Page from '../pages/exercise1';
import Exercise2Page from '../pages/exercise2';
import ReactDOMServer from 'react-dom/server';

/**
 * Fetch Site data
 */
exports.fetchDataExercice1 = (req, res, next) => {
  getDataExercice1(req)
    .get()
    .then((response) => {
      res.locals.initialState = response.data;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.fetchDataExercice2 = (req, res, next) => {
  getDataExercice2(req)
    .get()
    .then((response) => {
      res.locals.initialState = response.data;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
};

/**
 * Render page
 */
exports.render = (template, page) =>
  function render(req, res) {
    const initialState = res.locals.initialState;

    const Page = (props) =>
      page === 'exercice1' ? (
        <Exercise1Page {...props} />
      ) : (
        <Exercise2Page {...props} />
      );

    const component = ReactDOMServer.renderToString(
      <Page initialState={initialState} />
    );

    /**
     * Render View
     */
    res.send(template(component, page, initialState));
  };
