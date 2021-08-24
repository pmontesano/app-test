import React from 'react';
import ReactDom from 'react-dom';
import Excercice2 from '../pages/exercise2';

const preloadedState = window._PRELOADED_STATE;

ReactDom.hydrate(
  <Excercice2 {...preloadedState} />,
  document.getElementById('root')
);
