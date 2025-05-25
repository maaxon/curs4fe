import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type FilterFormState = {
    keyword:string,
    location:string,
    experience:number,
    hour_rate:number,
    degree: string,
    contract: string
};

const  initialState:FilterFormState = {
    keyword:'',
    location:'',
    experience:0,
    hour_rate:0,
    degree: "",
    contract: ''
}

export const FilterFormSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setForm(_, { payload }: PayloadAction<FilterFormState>) {
            return  payload;
        },

    }
})

export const { setForm } = FilterFormSlice.actions

export default FilterFormSlice.reducer
