import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FullResumeWithIds} from "@type/types.ts";
import {fetchUpdatingResume} from "../thunk/fetchUpdatingResume.ts";

interface UpdatingResumeState extends FullResumeWithIds{
    image?: File | string
}

type CreateResumeState = {
    resume: UpdatingResumeState;
    loading: boolean;
    error?: string;
};

// @ts-ignore
const  initialResume:UpdatingResumeState = {
    id: '',
    title:'',
    description:'',
    location:'',
    salary:0,
    education:[
        {
            id:'1',
            img:'',
            degree:'',
            major:'',
            school:'',
            from_date:'',
            to_date:'',
            description:''
        }
    ],
    experience:[
        {
            id:'1',
            img:'',
            company:'',
            position:'',
            from_date:'',
            to_date:'',
            description:''
        }
    ],
    skills:[
        {id:'1',name:'',proficiencyLevel:''}
    ]
}

const initialState: CreateResumeState = {
    resume:initialResume,
    loading: false,
    error:undefined
}

export const UpdateResumeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        setUpdatingField(state,{payload}:PayloadAction<{name:string,value:string}>){
            // @ts-ignore
            state.resume[payload.name] = payload.value
        },

        setImage(state,{payload}:PayloadAction<File>){
            state.resume.image = payload;
        },

        setEducationUpdatingField(state,{payload}:PayloadAction<{idx:number,name:string,value:string}>){
            // @ts-ignore
            state.resume.education[payload.idx][payload.name] = payload.value;
        },
        addUpdatingEducationCard(state){
          state.resume.education.push({
              id:'',
              img:'',
              degree:'',
              school:'',
              from_date:'',
              to_date:'',
              description:'',
              major:''
          })
        },
        removeUpdatingEducationCard(state,{payload}:PayloadAction<number>){
            state.resume.education.splice(payload,1);
        },

        setUpdatingExperienceField(state,{payload}:PayloadAction<{idx:number,name:string,value:string}>){
            // @ts-ignore
            state.resume.experience[payload.idx][payload.name] = payload.value;
        },
        addUpdatingExperienceCard(state){
            state.resume.experience.push({
                id:'',
                img:'',
                company:'',
                position:'',
                from_date:'',
                to_date:'',
                description:''
            })
        },
        removeUpdatingExperienceCard(state,{payload}:PayloadAction<number>){
            state.resume.experience.splice(payload,1);
        },

        setUpdatingSkillField(state,{payload}:PayloadAction<{idx:number,name:string,value:string}>){
            // @ts-ignore
            state.resume.skills[payload.idx][payload.name] = payload.value;
        },
        addUpdatingSkillCard(state){
            state.resume.skills.push({id:'',name:'',proficiencyLevel:''})
        },
        removeUpdatingSkillCard(state,{payload}:PayloadAction<number>){
            state.resume.skills.splice(payload,1);
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUpdatingResume.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchUpdatingResume.fulfilled, (state, action) => {
                state.loading = false;
                state.resume = action.payload; // Сохраняем пользователей в состоянии
            })
            .addCase(fetchUpdatingResume.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Сохраняем ошибку
            });
    }
})

export const {
    setUpdatingExperienceField,
    setEducationUpdatingField,
    setUpdatingSkillField,
    setUpdatingField,
    removeUpdatingSkillCard,
    removeUpdatingExperienceCard,
    removeUpdatingEducationCard,
    addUpdatingExperienceCard,
    addUpdatingEducationCard,
    addUpdatingSkillCard,
} = UpdateResumeSlice.actions

export default UpdateResumeSlice.reducer
