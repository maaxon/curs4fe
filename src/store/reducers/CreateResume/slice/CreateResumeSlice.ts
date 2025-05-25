import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EducationCard, ExperienceCard, SkillCard} from "../types/types.ts";

type CreateResumeState = {
    name:string,
    headline:string,
    description:string,
    location:string,
    salary: string,
    age:string
    email:string,
    tags:string[],
    image?:File,
    education:EducationCard[],
    experience:ExperienceCard[],
    skills:SkillCard[]
};

const  initialState:CreateResumeState = {
    name:'',
    headline:'',
    description:'',
    location:'',
    salary:'',
    age:'',
    email:'',
    tags:[],
    education:[
        {
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
            img:'',
            company:'',
            position:'',
            from_date:'',
            to_date:'',
            description:''
        }
    ],
    skills:[
        {name:'',proficiencyLevel:''}
    ]
}

export const CreateResumeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        setField(state,{payload}:PayloadAction<{name:string,value:string}>){
            // @ts-ignore
            state[payload.name] = payload.value
        },
        setImage(state,{payload}:PayloadAction<File>){
            state.image = payload;
        },
        setEducationField(state,{payload}:PayloadAction<{idx:number,name:string,value:string}>){
            // @ts-ignore
            state.education[payload.idx][payload.name] = payload.value;
        },
        addEducationCard(state){
          state.education.push({
              img:'',
              degree:'',
              school:'',
              from_date:'',
              to_date:'',
              description:'',
              major:''
          })
        },
        removeEducationCard(state,{payload}:PayloadAction<number>){
            state.education.splice(payload,1);
        },

        setExperienceField(state,{payload}:PayloadAction<{idx:number,name:string,value:string}>){
            // @ts-ignore
            state.experience[payload.idx][payload.name] = payload.value;
        },
        addExperienceCard(state){
            state.experience.push({
                img:'',
                company:'',
                position:'',
                from_date:'',
                to_date:'',
                description:''
            })
        },
        removeExperienceCard(state,{payload}:PayloadAction<number>){
            state.experience.splice(payload,1);
        },

        setSkillField(state,{payload}:PayloadAction<{idx:number,name:string,value:string}>){
            // @ts-ignore
            state.skills[payload.idx][payload.name] = payload.value;
        },
        addSkillCard(state){
            state.skills.push({name:'',proficiencyLevel:''})
        },
        removeSkillCard(state,{payload}:PayloadAction<number>){
            state.skills.splice(payload,1);
        },
        clearFields(){
            return initialState;
        }
    }
})

export const {
    setField,
    setImage,
    setEducationField,
    removeEducationCard,
    addEducationCard,
    setExperienceField,
    removeExperienceCard,
    addExperienceCard,
    addSkillCard,
    removeSkillCard,
    setSkillField,
    clearFields
} = CreateResumeSlice.actions

export default CreateResumeSlice.reducer
