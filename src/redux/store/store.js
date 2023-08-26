import { configureStore } from "@reduxjs/toolkit";
import naviReducer from "../reducers/naviSlice";
import dataReducer from "../reducers/dataSlice";
import confReducer from "../reducers/confSlice";
import globalFilterReducer from "../reducers/globalFilterSlice";
import profReducer from "../reducers/profSlice"

export const store = configureStore({
    reducer: {
        navi: naviReducer,
        data: dataReducer,
        conf: confReducer,
        globalFilter: globalFilterReducer,
        prof: profReducer
    }   
})