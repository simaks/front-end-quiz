import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components';
import { AppContainer } from 'react-hot-loader';
import store, { history } from './store';
import { Provider } from 'react-redux';
import './index.css';

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render();
