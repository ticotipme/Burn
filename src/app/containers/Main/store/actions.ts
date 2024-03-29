import { createAsyncAction, createAction } from 'typesafe-actions';
import {MainActionsTypes} from "@app/containers/Main/store/constants";

export const setFound = createAction(MainActionsTypes.SET_FOUND)<number>();

export const toBurn = createAsyncAction(
    MainActionsTypes.TO_BURN,
    MainActionsTypes.TO_BURN_SUCCESS,
    MainActionsTypes.TO_BURN_FAILURE,
)<string>();
export const viewFound = createAsyncAction(
    MainActionsTypes.VIEW_FOUND,
    MainActionsTypes.VIEW_FOUND_SUCCESS,
    MainActionsTypes.VIEW_FOUND_FAILURE,
)<ArrayBuffer, any>();

export const loadFromContract = createAsyncAction(
    '@@MAIN/LOAD_PARAMS',
    '@@MAIN/LOAD_PARAMS_SUCCESS',
    '@@MAIN/LOAD_PARAMS_FAILURE',
)<ArrayBuffer, any, any>();



