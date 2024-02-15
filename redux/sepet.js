import { createSlice } from "@reduxjs/toolkit";

const sepet = createSlice({
    name:"sepet",
    initialState:{
        urunler: [],
        adet: 0,
        total: 0,
    },
    reducers:{
        urunEkle: (state, action) => {
            state.urunler.push(action.payload);
            state.adet += action.payload.adet;
            state.total += action.payload.a;
        },
        reset: (state, action) => {
            state.urunler = [];
            state.adet = 0;
            state.total = 0;
        }
    }
})

export const { urunEkle, reset } = sepet.actions;
export default sepet.reducer;