import Utils from "@core/utils.js";
import {ASSET_ID} from "@app/shared/config";

const CID = "5ab408982b148210e88f180114f10222a2235eafeede0a3a224fda0e523e17b7";
// const CID = "4e0a28b2b2a83b811ad17ba8228b0645dbce2969fd453a68fbc0b60bc8860e02";

interface IDeposit {
  value: string;
}

export function ToBurn<T = any>(amount: string): Promise<T> | any {
  console.log(amount);
  return new Promise((resolve, reject) => {
    Utils.invokeContract(
      `role=manager, action=deposit, aid=${ASSET_ID}, amount=${amount}, cid=${CID}`,
      (error, result, full) => {
        if (error) {
          reject(error);
        }
        onMakeTx(error, result, full).then((res: string) => {
          resolve(res);
        });
      },
      null
    );
  });
}

export function ViewFound<T = any>(payload): Promise<T> {
        return new Promise((resolve, reject) => {
            Utils.invokeContract(`role=manager, action=view_funds, aid=${ASSET_ID}, cid=${CID}`,
                (error, result, full) => {
                    if (!error) {
                        resolve(result.res);
                        console.log('res,', result);
                    } else {
                        reject(error.error);
                        console.log('error', error);
                    }
                }, payload || null);
        });
    }
const onMakeTx = (err, sres, full) => {
  if (err) {
    console.log(err, "Failed to generate transaction request");
  }
  return new Promise((resolve) => {
    Utils.callApi(
      "process_invoke_data",
      { data: full.result.raw_data },
      (error, result) => {
        resolve(result);
      }
    );
  });
};
