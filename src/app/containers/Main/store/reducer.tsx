import produce from 'immer';
import { ActionType, createReducer } from 'typesafe-actions';
import * as actions from './actions';

type Action = ActionType<typeof actions>;

interface IStore {
    found: number
}

const initialState: IStore = {
  found: 0,
};

const reducer = createReducer<any, Action>(initialState)
  .handleAction(actions.setFound, (state, action) => produce(state, (nexState) => {
    nexState.found = action.payload;
  }));

export { reducer as MainReducer };
