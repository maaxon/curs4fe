import {useAppDispatch, useAppSelector} from "@hooks/redux.ts";
import { getSelectedRates} from "../../../store/reducers/FilterForm/selectors/getFormData.ts";
import React from "react";
import { setRate} from "../../../store/reducers/FilterForm/slice/FilterForm.ts";

const DegreeOptions = () =>{

    const options  = [
        {title:"All rates",value:"all"},
        {title:"$0 - $50",value:"0-50"},
        {title:"$50 - $100",value:"50-10"},
        {title:"$100 - $200",value:"100-200"},
        {title:"$200+",value:"200+"},
    ]

    const selectedRates = useAppSelector(getSelectedRates)
    const dispatch = useAppDispatch();
    const changeHandler = (e:React.FormEvent<HTMLInputElement>) =>{
        console.log(e.currentTarget.value)
        dispatch(setRate(e.currentTarget.value))
    }

    return(


        <div className="form-group col-xs-12 col-sm-4">
            <h6>Hourly rate</h6>
            <div className="checkall-group">
                {options.map((option,idx)=>
                    <div className="checkbox" key={option.value}>
                        <input onChange={changeHandler} value={option.value} type="checkbox" id={`rate${idx+1}`} checked={selectedRates.includes(option.value)}/>
                        <label htmlFor={`rate${idx+1}`}>{option.title}</label>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DegreeOptions