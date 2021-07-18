import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "store";

export const selectUserDetailState = (state: RootState) => state.userDetail;

export const selectUserInitializationStatus = createSelector(
    selectUserDetailState,
    (selectUserDetailState) => selectUserDetailState?.userDetailInitializationStatus
);

export const selectUserDetailUpdateStatus = createSelector(
    selectUserDetailState,
    (selectUserDetailState) => selectUserDetailState?.userDetailUpdateStatus
);

export const selectUserDetail = createSelector(selectUserDetailState, ({userDetail}) => userDetail);

export const selectUserDetailTransactions = createSelector(
    selectUserDetail,
    (userDetail) => userDetail?.transactions ?? []
);

export const selectUserDetailId = createSelector(
    selectUserDetail,
    (userDetail) => userDetail?.userId
);

export const selectUserDetailBalance = createSelector(
    selectUserDetail,
    (userDetail) => userDetail?.balance
);
