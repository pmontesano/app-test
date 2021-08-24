import React from 'react';
import ReactDom from 'react-dom';

const preloadedState = window._PRELOADED_STATE;

const startApp = (Component) => {
  ReactDom.hydrate(
    <Component {...preloadedState} />,
    document.getElementById('root')
  );
};

export default startApp;
