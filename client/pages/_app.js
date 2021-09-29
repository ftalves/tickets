import 'bootstrap/dist/css/bootstrap.css';

import { buildClient } from 'utils/client';

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

App.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/current');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    ...data,
  };
};

export default App;
