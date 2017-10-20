import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { ApolloClient } from 'react-apollo';
import rootReducer from '../reducers';


const client = new ApolloClient();

export default function configureStore(initialState) { // eslint-disable-line
  return createStore(
    combineReducers({
      rootReducer,
      apollo: client.reducer()
    }),
    initialState,
    compose(
      applyMiddleware(client.middleware(), thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}

