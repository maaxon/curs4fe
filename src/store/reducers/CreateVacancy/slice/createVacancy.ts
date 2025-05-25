import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Vacancy} from "@type/types.ts";

const  initialState:Vacancy = {
    title: '',
    company_name: '',
    short_description: '',
    description: '',
    salary: 0,
    location: '',
    job_type: 'Full time',
    degree: 'Bachelor',
    experience: 0,
    working_hours: 0,
}

export const CreateVacancySlice = createSlice({
    name: "create-vacancy",
    initialState,
    reducers: {
        setField(state,{payload}:PayloadAction<{name:string,value:string}>){
            // @ts-ignore
            state[payload.name] = payload.value
        },
        clearFields(){
            return initialState;
        }
    }
})

export const {
    setField,
    clearFields
} = CreateVacancySlice.actions

export default CreateVacancySlice.reducer
