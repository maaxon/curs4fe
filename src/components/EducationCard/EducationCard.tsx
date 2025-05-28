import React from "react";
import { removeEducationCard, setEducationField } from "../../store/reducers/CreateResume/slice/CreateResumeSlice.ts";
import { useAppDispatch } from "@hooks/redux.ts";
import { EducationCard as EducationType } from "../../store/reducers/CreateResume/types/types.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const selectStyle = {
    lineHeight: "44px",
    height: 44,
    padding: "0 0 0 16px",
    borderRadius: 0,
    fontSize: 15,
    color: "#818a91"
};

// Validation schema
const educationSchema = z.object({
    degree: z.string().min(1, { message: "Degree is required" }),
    major: z.string().min(2, { message: "Major must be at least 2 characters" }).max(50),
    school: z.string().min(2, { message: "School name must be at least 2 characters" }).max(100),
    from_date: z.string().min(1, { message: "Start date is required" }),
    to_date: z.string().min(1, { message: "End date is required" }),
    description: z.string().max(500).optional()
});

interface EducationCardProps {
    data: EducationType;
    idx: number;
}

const EducationCard: React.FC<EducationCardProps> = ({ data, idx }) => {
    const dispatch = useAppDispatch();
    const { degree, major, school, from_date, to_date, description } = data;

    const { register, formState: { errors }, trigger, setValue } = useForm({
        resolver: zodResolver(educationSchema),
        defaultValues: data
    });

    const changeHandler = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        dispatch(setEducationField({ idx, name, value }));
        // @ts-ignore
        setValue(name, value);
        // @ts-ignore
        await trigger(name);
    };

    const removeCard = () => {
        dispatch(removeEducationCard(idx));
    };

    // Style for error fields
    const errorStyle = {
        borderColor: "#dc3545",
        boxShadow: "0 0 0 0.25rem rgba(220, 53, 69, 0.25)"
    };

    return (
      <div className="col-xs-8 mb-4">
          <div className="item-block">
              <div className="item-form">
                  <button
                    onClick={removeCard}
                    className="btn btn-danger btn-float btn-remove"
                    aria-label="Remove education"
                  >
                      <i className="fa fa-times"></i>
                  </button>
                  <div className="row">
                      <div className="col-12">
                          <div className="form-group mb-3">
                              <label htmlFor={`degree-${idx}`}>Degree</label>
                              <select
                                {...register("degree")}
                                id={`degree-${idx}`}
                                name="degree"
                                value={degree}
                                onChange={changeHandler}
                                className={`form-select ${errors.degree ? "is-invalid" : ""}`}
                                style={errors.degree ? { ...errorStyle, ...selectStyle } : selectStyle}
                              >
                                  <option value="">Select degree</option>
                                  <option value="Postdoc">Postdoc</option>
                                  <option value="Ph.D.">Ph.D.</option>
                                  <option value="Master">Master</option>
                                  <option value="Bachelor">Bachelor</option>
                              </select>
                              {errors.degree && (
                                <div className="invalid-feedback">
                                    {errors.degree.message}
                                </div>
                              )}
                          </div>

                          <div className="form-group mb-3">
                              <label htmlFor={`major-${idx}`}>Major</label>
                              <input
                                {...register("major")}
                                id={`major-${idx}`}
                                type="text"
                                name="major"
                                value={major}
                                onChange={changeHandler}
                                className={`form-control ${errors.major ? "is-invalid" : ""}`}
                                style={errors.major ? errorStyle : {}}
                                placeholder="e.g. Computer Science"
                              />
                              {errors.major && (
                                <div className="invalid-feedback">
                                    {errors.major.message}
                                </div>
                              )}
                          </div>

                          <div className="form-group mb-3">
                              <label htmlFor={`school-${idx}`}>School</label>
                              <input
                                {...register("school")}
                                id={`school-${idx}`}
                                type="text"
                                name="school"
                                value={school}
                                onChange={changeHandler}
                                className={`form-control ${errors.school ? "is-invalid" : ""}`}
                                style={errors.school ? errorStyle : {}}
                                placeholder="e.g. Massachusetts Institute of Technology"
                              />
                              {errors.school && (
                                <div className="invalid-feedback">
                                    {errors.school.message}
                                </div>
                              )}
                          </div>

                          <div className="form-group mb-3">

                              <div className="row g-2">
                                  <div className="col-md-6">
                                      <label htmlFor={`from_date-${idx}`}>From Date</label>
                                      <input
                                        {...register('from_date')}
                                        id={`from_date-${idx}`}
                                        name="from_date"
                                        value={from_date}
                                        onChange={changeHandler}
                                        type="date"
                                        className={`form-control ${errors.from_date ? 'is-invalid' : ''}`}
                                        style={errors.from_date ? errorStyle : {}}
                                      />
                                      {errors.from_date && (
                                        <div className="invalid-feedback">
                                            {errors.from_date.message}
                                        </div>
                                      )}
                                  </div>

                                  <div className="col-md-6">
                                      <label htmlFor={`to_date-${idx}`}>To Date</label>
                                      <input
                                        {...register('to_date')}
                                        id={`to_date-${idx}`}
                                        name="to_date"
                                        value={to_date}
                                        onChange={changeHandler}
                                        type="date"
                                        className={`form-control ${errors.to_date ? 'is-invalid' : ''}`}
                                        style={errors.to_date ? errorStyle : {}}
                                      />
                                      {errors.to_date && (
                                        <div className="invalid-feedback">
                                            {errors.to_date.message}
                                        </div>
                                      )}
                                  </div>
                              </div>
                          </div>

                          <div className="form-group mb-3">
                              <label htmlFor={`description-${idx}`}>Description</label>
                              <textarea
                                {...register("description")}
                                id={`description-${idx}`}
                                name="description"
                                value={description}
                                onChange={changeHandler}
                                className="form-control"
                                rows={3}
                                placeholder="Short description (optional)"
                              />
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
};

export default EducationCard;
