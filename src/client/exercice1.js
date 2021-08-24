import React from 'react';
import ReactDom from 'react-dom';
import Exercise1 from '../pages/exercise1';

const preloadedState = window._PRELOADED_STATE;

ReactDom.hydrate(
  <Exercise1 {...preloadedState} />,
  document.getElementById('root')
);
