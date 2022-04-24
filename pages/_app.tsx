import type { AppProps } from 'next/app';
import '../styles/reset.scss';
import '../styles/main.scss';
import '../styles/todo.scss';
import { store } from '../lib/configureStore';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
