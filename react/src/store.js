import { applyMiddleware, compose, createStore } from 'redux'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import reducer from './reducers'

export const history = createBrowserHistory();

const middleware = applyMiddleware(thunk, routerMiddleware(history));

export default createStore(
    connectRouter(history)(reducer),
    compose(
        middleware,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
)
