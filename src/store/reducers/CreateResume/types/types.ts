export interface EducationCard{
    img?:string,
    degree:string,
    school:string,
    from_date:string,
    to_date:string,
    description:string,
    major:string
}

export interface ExperienceCard{
    img?:string,
    company:string,
    position:string,
    from_date:string,
    to_date:string,
    description:string,
}

export interface SkillCard{
    name:string,
    proficiencyLevel:string
}
