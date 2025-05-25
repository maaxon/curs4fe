import React from "react";
import { SkillCard as SkillType } from '../../store/reducers/CreateResume/types/types.ts';
import { removeSkillCard, setSkillField } from "../../store/reducers/CreateResume/slice/CreateResumeSlice.ts";
import { useAppDispatch } from "@hooks/redux.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Схема валидации
const skillSchema = z.object({
    name: z.string().min(2, { message: "Минимум 2 символа" }).max(50),
    proficiencyLevel: z.string()
        .regex(/^\d+$/, { message: "Только цифры" })
        .transform(Number)
        .refine((val) => val >= 0 && val <= 100, { message: "Должно быть от 0 до 100" })
});

interface SkillCardProps {
    data: SkillType;
    idx: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ data, idx }) => {
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
        dispatch(setSkillField({ idx, name, value }));
        setValue(name as keyof SkillType, value);
        await trigger(name as keyof SkillType);
    };

    const removeCard = () => {
        dispatch(removeSkillCard(idx));
    };

    // Стиль для невалидных полей
    const errorStyle = {
        borderColor: "#dc3545",
        boxShadow: "0 0 0 0.25rem rgba(220, 53, 69, 0.25)"
    };

    return (
        <div className="col-xs-12">
            <div className="item-block">
                <div className="item-form">
                    {/* Сохраняем оригинальный стиль кнопки удаления */}
                    <button onClick={removeCard} className="btn btn-danger btn-float btn-remove">
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

export default SkillCard;
