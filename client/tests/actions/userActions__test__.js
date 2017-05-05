import { loadUser } from '../../src/actions/userActions';
import * as types from '../../src/actions/actionTypes';

describe('loadUser-actions', () => {
  it('should create an action to load a user', () => {
    const user = {};
    const expectedAction = {
      type: types.INIT_USERS,
      user
    };
    expect(loadUser(user)).toEqual(expectedAction)
  });
});
