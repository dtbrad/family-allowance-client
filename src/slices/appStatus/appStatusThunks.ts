import sleep from "helpers/sleep";
import {AppThunk} from "store";
import {didInitializeApp, willInitializeApp} from "./appStatusReducer";

export function initializeApp(): AppThunk {
    return async function (dispatch) {
        dispatch(willInitializeApp());
        await sleep(500);
        dispatch(didInitializeApp());
    };
}
