import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { ApolloClient } from 'react-apollo';
import thunk from 'redux-thunk';
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
      applyMiddleware(client.middleware(), thunk)
    )
  );
}
