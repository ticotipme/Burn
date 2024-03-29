import { call, put, takeLatest, select } from 'redux-saga/effects';
import { navigate } from '@app/shared/store/actions';
import { ROUTES } from '@app/shared/constants';
import {ToBurn, ViewFound} from '@core/api';
import { actions } from '.';
import store from '../../../../index';
import { setIsLoaded } from '@app/shared/store/actions';
import { selectIsLoaded } from '@app/shared/store/selectors';
import * as mainActions from '@app/containers/Main/store/actions';


export function* toBurn(
    action: ReturnType<typeof actions.toBurn.request>,
  ): Generator {
    try {
    // @ts-ignore
      yield call(ToBurn, action.payload ? action.payload : null);
    } catch (e) {
      // @ts-ignore
      yield put(actions.toBurn.failure(e));
    }
}
export function* viewFound(
    action: ReturnType<typeof actions.viewFound.request>,
): Generator {
  try {
    const params = yield call(ViewFound, action.payload ? action.payload : null);
    yield put(actions.setFound((params[0].amount)));

  } catch (e) {
    // @ts-ignore
    yield put(actions.viewFound.failure(e));
  }
}



function* mainSaga() {
    yield takeLatest(mainActions.toBurn.request, toBurn);
    yield takeLatest(mainActions.viewFound.request, viewFound);
}

export default mainSaga;
