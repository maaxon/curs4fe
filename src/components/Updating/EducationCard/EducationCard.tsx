import React from "react";
import { useAppDispatch } from "@hooks/redux.ts";
import { EducationCard } from "../../../store/reducers/CreateResume/types/types.ts";
import {
    removeUpdatingEducationCard,
    setEducationUpdatingField
} from "../../../store/reducers/UpdateResume/slice/UpdateResumeSlice.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Validation schema
const educationSchema = z.object({
    degree: z.string().min(1, { message: "Degree is required" }),
    major: z.string().min(2, { message: "Major must be at least 2 characters" }).max(100),
    school: z.string().min(2, { message: "School name must be at least 2 characters" }).max(100),
    from_date: z.string().min(1, { message: "Start date is required" }),
    to_date: z.string().min(1, { message: "End date is required" }),
    description: z.string().max(500, { message: "Description cannot exceed 500 characters" }).optional()
});

interface EducationCardProps {
    id?: number | string;
    data: EducationCard;
    idx: number;
}

const selectStyle = {
    lineHeight: "44px",
    height: 44,
    padding: "0 0 0 16px",
    borderRadius: 0,
    fontSize: 15,
    color: "#818a91"
};

const UpdatingEducationCard: React.FC<EducationCardProps> = ({ id, data, idx }) => {
    const dispatch = useAppDispatch();
    const { school, description, degree, from_date, to_date, major } = data;

    const { register, formState: { errors }, trigger, setValue } = useForm({
        resolver: zodResolver(educationSchema),
        defaultValues: {
            degree,
            major,
            school,
            from_date: from_date.slice(0, 10),
            to_date: to_date.slice(0, 10),
            description
        }
    });

    const changeHandler = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        dispatch(setEducationUpdatingField({ idx, name, value }));
        setValue(name as keyof typeof educationSchema.shape, value);
        await trigger(name as keyof typeof educationSchema.shape);
    };

    const removeCard = async () => {
        if (id) {
            try {
                await fetch(`${import.meta.env.VITE_BACK_URL}/education/${id}`, {
                    method: "DELETE",
                });
            } catch (error) {
                console.error("Failed to delete education:", error);
                return;
            }
        }
        dispatch(removeUpdatingEducationCard(idx));
    };

    // Style for invalid fields
    const errorStyle = {
        borderColor: "#dc3545",
        boxShadow: "0 0 0 0.25rem rgba(220, 53, 69, 0.25)"
    };

    return (
        <div className="col-xs-8">
            <div className="item-block">
                <div className="item-form">
                    {/* Preserve original remove button style */}
                    <button
                        onClick={removeCard}
                        className="btn btn-danger btn-float btn-remove"
                        aria-label="Remove education"
                    >
                        <i className="fa fa-close"></i>
                    </button>

                    <div className="row">
                        <div className="col-xs-12">
                            <div className="form-group mb-3">
                                <select
                                    {...register("degree")}
                                    name="degree"
                                    value={degree}
                                    onChange={changeHandler}
                                    className="form-select w-100"
                                    style={errors.degree ? {...errorStyle, ...selectStyle} : selectStyle}
                                >
                                    <option value="">Select degree</option>
                                    <option value="Postdoc">Postdoc</option>
                                    <option value="Ph.D.">Ph.D.</option>
                                    <option value="Master">Master</option>
                                    <option value="Bachelor">Bachelor</option>
                                </select>
                                {errors.degree && (
                                    <div className="text-danger small mt-1">
                                        {errors.degree.message}
                                    </div>
                                )}
                            </div>

                            <div className="form-group mb-3">
                                <input
                                    {...register("major")}
                                    type="text"
                                    name="major"
                                    value={major}
                                    onChange={changeHandler}
                                    className="form-control"
                                    style={errors.major ? errorStyle : {}}
                                    placeholder="Major, e.g. Computer Science"
                                />
                                {errors.major && (
                                    <div className="text-danger small mt-1">
                                        {errors.major.message}
                                    </div>
                                )}
                            </div>

                            <div className="form-group mb-3">
                                <input
                                    {...register("school")}
                                    type="text"
                                    name="school"
                                    value={school}
                                    onChange={changeHandler}
                                    className="form-control"
                                    style={errors.school ? errorStyle : {}}
                                    placeholder="School name, e.g. Massachusetts Institute of Technology"
                                />
                                {errors.school && (
                                    <div className="text-danger small mt-1">
                                        {errors.school.message}
                                    </div>
                                )}
                            </div>

                            <div className="form-group mb-3">
                                <div className="input-group">
                                    <span className="input-group-addon">Date from</span>
                                    <input
                                        {...register("from_date")}
                                        name="from_date"
                                        value={from_date.slice(0, 10)}
                                        onChange={changeHandler}
                                        type="date"
                                        className="form-control"
                                        style={errors.from_date ? errorStyle : {}}
                                        placeholder="e.g. 2012"
                                    />
                                    <span className="input-group-addon">Date to</span>
                                    <input
                                        {...register("to_date")}
                                        name="to_date"
                                        value={to_date.slice(0, 10)}
                                        onChange={changeHandler}
                                        type="date"
                                        className="form-control"
                                        style={errors.to_date ? errorStyle : {}}
                                        placeholder="e.g. 2016"
                                    />
                                </div>
                                {(errors.from_date || errors.to_date) && (
                                    <div className="text-danger small mt-1">
                                        {errors.from_date?.message || errors.to_date?.message}
                                    </div>
                                )}
                            </div>

                            <div className="form-group mb-3">
                <textarea
                    {...register("description")}
                    name="description"
                    value={description}
                    onChange={changeHandler}
                    className="form-control"
                    style={errors.description ? errorStyle : {}}
                    rows={3}
                    placeholder="Short description"
                />
                                {errors.description && (
                                    <div className="text-danger small mt-1">
                                        {errors.description.message}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatingEducationCard;
