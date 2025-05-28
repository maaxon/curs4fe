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
    tags: []
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
        },
        setTags(state,{payload}:PayloadAction<{value:string, checked: boolean}>){
            state.tags = payload.checked ? [...state.tags, payload.value]
              : state.tags.filter(tag => tag !== payload.value)
        }
    }
})

export const {
    setField,
    clearFields,
  setTags
} = CreateVacancySlice.actions

export default CreateVacancySlice.reducer
