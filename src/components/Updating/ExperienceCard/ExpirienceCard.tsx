import React from "react";
import { useAppDispatch } from "@hooks/redux.ts";
import { ExperienceCard } from "../../../store/reducers/CreateResume/types/types.ts";
import {
    removeUpdatingExperienceCard,
    setUpdatingExperienceField
} from "../../../store/reducers/UpdateResume/slice/UpdateResumeSlice.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Validation schema
const experienceSchema = z.object({
    company: z.string().min(2, { message: "Company name must be at least 2 characters" }).max(100),
    position: z.string().min(2, { message: "Position must be at least 2 characters" }).max(100),
    from_date: z.string().min(1, { message: "Start date is required" }),
    to_date: z.string().min(1, { message: "End date is required" }),
    description: z.string().max(500, { message: "Description cannot exceed 500 characters" }).optional()
});

interface ExperienceCardProps {
    id?: number | string;
    data: ExperienceCard;
    idx: number;
}

const UpdatingExperienceCard: React.FC<ExperienceCardProps> = ({ id, data, idx }) => {
    const dispatch = useAppDispatch();
    const { company, position, from_date, to_date, description } = data;

    const { register, formState: { errors }, trigger, setValue } = useForm({
        resolver: zodResolver(experienceSchema),
        defaultValues: {
            company,
            position,
            from_date,
            to_date,
            description
        }
    });

    const changeHandler = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        dispatch(setUpdatingExperienceField({ idx, name, value }));
        setValue(name as keyof typeof experienceSchema.shape, value);
        await trigger(name as keyof typeof experienceSchema.shape);
    };

    const removeCard = async () => {
        if (id) {
            try {
                await fetch(`${import.meta.env.VITE_BACK_URL}/experience/${id}`, {
                    method: "DELETE",
                });
            } catch (error) {
                console.error("Failed to delete experience:", error);
                return;
            }
        }
        dispatch(removeUpdatingExperienceCard(idx));
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
                        aria-label="Remove experience"
                    >
                        <i className="fa fa-close"></i>
                    </button>

                    <div className="row">
                        <div className="col-xs-12">
                            <div className="form-group">
                                <input
                                    {...register("company")}
                                    name="company"
                                    value={company}
                                    onChange={changeHandler}
                                    type="text"
                                    className="form-control"
                                    style={errors.company ? errorStyle : {}}
                                    placeholder="Company name"
                                />
                                {errors.company && (
                                    <div className="text-danger small mt-1">
                                        {errors.company.message}
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <input
                                    {...register("position")}
                                    name="position"
                                    value={position}
                                    onChange={changeHandler}
                                    type="text"
                                    className="form-control"
                                    style={errors.position ? errorStyle : {}}
                                    placeholder="Position, e.g. UI/UX Researcher"
                                />
                                {errors.position && (
                                    <div className="text-danger small mt-1">
                                        {errors.position.message}
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon">Date from</span>
                                    <input
                                        {...register("from_date")}
                                        name="from_date"
                                        value={from_date}
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
                                        value={to_date}
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

                            <div className="form-group">
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

export default UpdatingExperienceCard;
