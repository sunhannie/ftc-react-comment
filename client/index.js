import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { createStore,applyMiddleware,compose} from 'redux'
import { Provider} from 'react-redux'
import thunk from 'redux-thunk'

import {rootReducer,addCountAsync} from './reducers/question'
import App from './app'  //不需要添加{}
const middleware = [ thunk ];
const enhancer = compose(
  applyMiddleware(...middleware),
);
// const store = createStore(rootReducer,
//    enhancer);

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

store.dispatch(addCountAsync());  
ReactDOM.render(
  <Provider store={store}>
  <App/>
  </Provider>,
  document.getElementById('root')
);
