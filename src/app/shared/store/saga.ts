import {
  call, take, fork, takeLatest, put, select
} from 'redux-saga/effects';

import { eventChannel, END } from 'redux-saga';
import { actions } from '@app/shared/store/index';
import { actions as mainActions } from '@app/containers/Main/store/index';
import { navigate, setSystemState } from '@app/shared/store/actions';
import store from '../../../index';
import { SharedStateType } from '../interface';

import Utils from '@core/utils.js';
import {WASM} from "@app/shared/config";
import {ViewFound} from "@core/api";


const iFrameDetection = window !== window.parent;
export  async function start() {
  Utils.download(WASM, (err, bytes) => {
    Utils.callApi('ev_subunsub', {
      ev_txs_changed: true,
      ev_system_state: true,
    }, (error, result, full) => {
      if (error) {
        console.log(err);
      }
      if (result) {
        store.dispatch(mainActions.viewFound.request(bytes));
        // store.dispatch(mainActions.loadPoolsList.request(null));
      }
    });
  });
}

export function remoteEventChannel() {
  Utils.initialize(
      {
        appname: 'BURN',
        min_api_version: '6.2',
        headless: !iFrameDetection || !!Utils.isHeadless(),
        apiResultHandler: (error, result, full) => {
          console.log('api result data: ', result, full);
          if (!result) {
            // @ts-ignore
            emitter(full);
          }
        },
      },
      (err) => {
        if (err) {
          console.log(err);
        }
        start();
      },
  );
  return eventChannel((emitter) => {
    const unsubscribe = () => {
      emitter(END);
    };
    return unsubscribe;
  });
}

function* sharedSaga() {
  const remoteChannel = yield call(remoteEventChannel);

  while (true) {
    try {
      const payload: any = yield take(remoteChannel);
      switch (payload.id) {
        case 'ev_system_state':
          console.log('___SHARED_SAGA___');
          store.dispatch(mainActions.viewFound.request(null));
          store.dispatch(setSystemState(payload.result));
          // store.dispatch(mainActions.loadPoolsList.request(null));
          break;

        case 'ev_txs_changed':
          store.dispatch(mainActions.viewFound.request(null));
          // store.dispatch(setTxStatus(payload.result));
          break;
        default:
          break;
      }
    } catch (err) {
      remoteChannel.close();
    }
  }
}

export default sharedSaga;

