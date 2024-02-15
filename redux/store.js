import { configureStore } from "@reduxjs/toolkit";
import sepetReducer from "./sepet";

export default configureStore({
    reducer: {
        sepet: sepetReducer,
    }
})