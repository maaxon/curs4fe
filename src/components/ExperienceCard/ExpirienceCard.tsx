import React from "react";
import { removeExperienceCard, setExperienceField } from "../../store/reducers/CreateResume/slice/CreateResumeSlice.ts";
import { useAppDispatch } from "@hooks/redux.ts";
import { ExperienceCard as ExperienceType } from "../../store/reducers/CreateResume/types/types.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const experienceSchema = z.object({
    company: z.string().min(2, { message: "Минимум 2 символа" }).max(100),
    position: z.string().min(2, { message: "Минимум 2 символа" }).max(100),
    from_date: z.string().min(1, { message: "Укажите дату начала" }),
    to_date: z.string().min(1, { message: "Укажите дату окончания" }),
    description: z.string().max(500).optional()
});

interface ExperienceCardProps {
    data: ExperienceType;
    idx: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ data, idx }) => {
    const dispatch = useAppDispatch();
    const { company, position, from_date, to_date, description } = data;

    const { register, formState: { errors }, trigger, setValue } = useForm({
        resolver: zodResolver(experienceSchema),
        defaultValues: data
    });

    const changeHandler = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        dispatch(setExperienceField({ idx, name, value }));
        // @ts-ignore
        setValue(name as keyof ExperienceType, value);
        // @ts-ignore
        await trigger(name as keyof ExperienceType);
    };

    const removeCard = () => {
        dispatch(removeExperienceCard(idx));
    };

    const errorStyle = {
        borderColor: "#dc3545",
        boxShadow: "0 0 0 0.25rem rgba(220, 53, 69, 0.25)"
    };

    return (
      <div className="col-xs-8">
          <div className="item-block">
              <div className="item-form">
                  <button onClick={removeCard} className="btn btn-danger btn-float btn-remove">
                      <i className="fa fa-close"></i>
                  </button>

                  <div className="row">
                      <div className="col-xs-12 col-sm-12">
                          <div className="form-group">
                              <label htmlFor={`company-${idx}`}>Company Name</label>
                              <input
                                {...register("company")}
                                name="company"
                                id={`company-${idx}`}
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
                              <label htmlFor={`position-${idx}`}>Position</label>
                              <input
                                {...register("position")}
                                name="position"
                                id={`position-${idx}`}
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
                                  <label htmlFor={`from_date-${idx}`} className="input-group-addon">From Date</label>
                                  <input
                                    {...register('from_date')}
                                    name="from_date"
                                    id={`from_date-${idx}`}
                                    value={from_date}
                                    onChange={changeHandler}
                                    type="date"
                                    className="form-control"
                                    style={errors.from_date ? errorStyle : {}}
                                  />
                                  <label htmlFor={`to_date-${idx}`} className="input-group-addon">To Date</label>
                                  <input
                                    {...register('to_date')}
                                    name="to_date"
                                    id={`to_date-${idx}`}
                                    value={to_date}
                                    onChange={changeHandler}
                                    type="date"
                                    className="form-control"
                                    style={errors.to_date ? errorStyle : {}}
                                  />
                              </div>
                              {(errors.from_date || errors.to_date) && (
                                <div className="text-danger small mt-1">
                                    {errors.from_date?.message || errors.to_date?.message}
                                </div>
                              )}
                          </div>

                          <div className="form-group">
                              <label htmlFor={`description-${idx}`}>Description</label>
                              <textarea
                                {...register("description")}
                                name="description"
                                id={`description-${idx}`}
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

export default ExperienceCard;
