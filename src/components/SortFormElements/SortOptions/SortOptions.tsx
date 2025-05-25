import {useSelector} from "react-redux";
import {getSelectedOption} from "../../../store/reducers/FilterForm/selectors/getFormData.ts";
import React from "react";
import {useAppDispatch} from "@hooks/redux.ts";
import {setSort} from "../../../store/reducers/FilterForm/slice/FilterForm.ts";

const SortOptions = () =>{

    const options = [
        {title:"Relevance",value:"r"},
        {title:"Highest rate first",value:"h_r"},
        {title:"Lowest rate first",value:"l_r"},
        {title:"Highest degree first",value:"h_d"},
        {title:"Lowest degree first",value:"l_d"},
    ]

    const selected = useSelector(getSelectedOption)
    const dispatch = useAppDispatch();
    const changeHandler = (e:React.FormEvent<HTMLInputElement>) => {
        dispatch(setSort(e.currentTarget.value))
    }

    return(
        <div className="form-group col-xs-12 col-sm-4">
            <h6>Sort by</h6>

            {options.map((option,idx) =>
                <div className="radio" key={option.value}>
                    <input onChange={changeHandler} type="radio" name="sortby" id={`sortby${idx+1}`} value={option.value} checked={selected === option.value}/>
                    <label htmlFor={`sortby${idx+1}`}>{option.title}</label>
                </div>
            )}

        </div>    )
}

export default SortOptions