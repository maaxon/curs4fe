import {useAppDispatch, useAppSelector} from "@hooks/redux.ts";
import {getSelectedDegrees} from "../../../store/reducers/FilterForm/selectors/getFormData.ts";
import React from "react";
import { setDegree} from "../../../store/reducers/FilterForm/slice/FilterForm.ts";

const DegreeOptions = () =>{

    const options  = [
        {title:"All degrees",value:"all"},
        {title:"Associate degree",value:"assoc"},
        {title:"Bachelor's degree",value:"bach"},
        {title:"Master's degree",value:"master"},
        {title:"Doctoral degree",value:"doctor"},
    ]

    const selectedDegrees = useAppSelector(getSelectedDegrees)
    const dispatch = useAppDispatch();
    const changeHandler = (e:React.FormEvent<HTMLInputElement>) =>{
        dispatch(setDegree(e.currentTarget.value))
    }

    return(
        <div className="form-group col-xs-12 col-sm-4">
            <h6>Academic degree</h6>
            <div className="checkall-group">
                {options.map((option,idx)=>
                    <div className="checkbox" key={option.value}>
                        <input onChange={changeHandler} value={option.value} type="checkbox" id={`degree${idx+1}`} checked={selectedDegrees.includes(option.value)}/>
                        <label htmlFor={`degree${idx+1}`}>{option.title}</label>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DegreeOptions