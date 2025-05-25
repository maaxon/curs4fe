import {RootState} from "../../../store.ts";

export const getResumeData = (state:RootState) => state.createResume
export const getEducationCardData = (state:RootState) => state.createResume.education
export const getExperienceCardData = (state:RootState) => state.createResume.experience
export const getSkillCardData = (state:RootState) => state.createResume.skills