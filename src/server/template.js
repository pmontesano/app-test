const root = (component, bundle, initialState) =>
  `<!doctype html>
        <html>
        <head>
        <script>window._PRELOADED_STATE = ${JSON.stringify({
          initialState,
        })}</script>
        <link rel="stylesheet" type="text/css" href="/static/${bundle}.css" />
        </head>
        <body>
        <div id="root">${component}</div>
        <script src="/static/${bundle}.js"></script>
      </body>
      </html>`;

export default root;
