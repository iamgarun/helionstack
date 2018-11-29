import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { matchRoutes } from 'react-router-config';
import { AppContainer } from 'react-hot-loader';

import Layout from '../../framework/layout';
import PageContainer from '../../containers/App';
import routes from '../../containers/App/routes';
import configureStore from '../../configureStore';
import history from '../../helpers/history';

const clientRender = () => {
  const { url, currentUser = {} } = window.window.__INITIAL_STATE__;
  const newState = { url, currentUser };

  const store = configureStore({}, history);
  const MOUNT_NODE = document.getElementById('root');

  const Entry = () => (
    <React.Fragment>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <PageContainer url={url} />
        </ConnectedRouter>
      </Provider>
    </React.Fragment>
  );

  const render = App => {
    ReactDOM.render(
      EASY_ENV_IS_DEV ? (
        <AppContainer>
          <App />
        </AppContainer>
      ) : (
        <App />
      ),
      MOUNT_NODE,
    );
  };

  if (EASY_ENV_IS_DEV && module.hot) {
    module.hot.accept();
  }

  render(Entry);
};

const serverRender = (context, options) => {
  const url = context.state.url;
  const branch = matchRoutes(routes, url);

  const promises = branch.map(({ route }) => {
    const fetch = route.component.fetch;
    return fetch instanceof Function ? fetch() : Promise.resolve(null);
  });

  return Promise.all(promises).then(data => {
    const initState = context.state;
    const { url, currentUser = {} } = initState;
    const newState = { currentUser };

    data.forEach(item => {
      Object.assign(newState, item);
    });

    context.state = Object.assign({}, context.state, newState);
    const store = configureStore({});

    return () => (
      <Layout>
        <React.Fragment>
          <Provider store={store}>
            <StaticRouter location={url} context={{}}>
              <PageContainer url={url} />
            </StaticRouter>
          </Provider>
        </React.Fragment>
      </Layout>
    );
  });
};

export default (EASY_ENV_IS_NODE ? serverRender : clientRender());
