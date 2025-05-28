import React from "react";
import { useAppDispatch } from "@hooks/redux.ts";
import { SkillCard } from "../../../store/reducers/CreateResume/types/types.ts";
import {
    removeUpdatingSkillCard,
    setUpdatingSkillField
} from "../../../store/reducers/UpdateResume/slice/UpdateResumeSlice.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Validation schema
const skillSchema = z.object({
    name: z.string()
        .min(2, { message: "Skill name must be at least 2 characters" })
        .max(50, { message: "Skill name cannot exceed 50 characters" }),
    proficiencyLevel: z.string()
        .regex(/^\d+$/, { message: "Must be a number" })
        .transform(Number)
        .refine(val => val >= 0 && val <= 100, { message: "Must be between 0-100%" })
});

interface SkillCardProps {
    id: number | string;
    data: SkillCard;
    idx: number;
}

const UpdatingSkillCard: React.FC<SkillCardProps> = ({ id, data, idx }) => {
    const dispatch = useAppDispatch();
    const { name, proficiencyLevel } = data;

    const { register, formState: { errors }, trigger, setValue } = useForm({
        resolver: zodResolver(skillSchema),
        defaultValues: {
            name,
            proficiencyLevel: proficiencyLevel?.toString() || ""
        }
    });

    const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(setUpdatingSkillField({ idx, name, value }));
        setValue(name as keyof typeof skillSchema.shape, value);
        await trigger(name as keyof typeof skillSchema.shape);
    };

    const removeCard = async () => {
        if (id) {
            try {
                await fetch(`${import.meta.env.VITE_BACK_URL}/skill/${id}`, {
                    method: "DELETE",
                });
            } catch (error) {
                console.error("Failed to delete skill:", error);
                return;
            }
        }
        dispatch(removeUpdatingSkillCard(idx));
    };

    // Style for invalid fields
    const errorStyle = {
        borderColor: "#dc3545",
        boxShadow: "0 0 0 0.25rem rgba(220, 53, 69, 0.25)"
    };

    return (
        <div className="col-xs-12">
            <div className="item-block">
                <div className="item-form">
                    {/* Preserve original remove button style */}
                    <button
                        onClick={removeCard}
                        className="btn btn-danger btn-float btn-remove"
                        aria-label="Remove skill"
                        type="button"
                    >
                        <i className="fa fa-close"></i>
                    </button>

                    <div className="row">
                        <div className="col-xs-12 col-sm-6">
                            <div className="form-group">
                                <input
                                    {...register("name")}
                                    onChange={changeHandler}
                                    name="name"
                                    value={name}
                                    type="text"
                                    className="form-control"
                                    style={errors.name ? errorStyle : {}}
                                    placeholder="Skill name, e.g. HTML"
                                />
                                {errors.name && (
                                    <div className="text-danger small mt-1">
                                        {errors.name.message}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-6">
                            <div className="form-group">
                                <div className="input-group">
                                    <input
                                        {...register("proficiencyLevel")}
                                        type="text"
                                        className="form-control"
                                        onChange={changeHandler}
                                        name="proficiencyLevel"
                                        value={proficiencyLevel}
                                        style={errors.proficiencyLevel ? errorStyle : {}}
                                        placeholder="Skill proficiency, e.g. 90"
                                    />
                                    <span className="input-group-addon">%</span>
                                </div>
                                {errors.proficiencyLevel && (
                                    <div className="text-danger small mt-1">
                                        {errors.proficiencyLevel.message}
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

export default UpdatingSkillCard;
