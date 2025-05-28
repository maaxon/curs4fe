import style from '@pages/createVacancy/style.module.css';
import { useAppDispatch, useAppSelector } from "@hooks/redux.ts";
import { setUpdatingField, setUpdatingTag } from '../../store/reducers/UpdateVacancy/slice/slice.ts';
import React, { useEffect } from "react";
import { getUpdatingVacancy } from "../../store/reducers/UpdateVacancy/selector/getUpdatingVacancy.ts";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ErrorMessage } from "@components/ErrorMessage";

// Validation schema
const vacancySchema = z.object({
    title: z.string()
      .min(5, { message: "Title must be at least 5 characters" })
      .max(100, { message: "Title cannot exceed 100 characters" }),
    company_name: z.string()
      .min(2, { message: "Company name must be at least 2 characters" })
      .max(50, { message: "Company name cannot exceed 50 characters" }),
    short_description: z.string()
      .min(20, { message: "Description must be at least 20 characters" })
      .max(500, { message: "Description cannot exceed 500 characters" }),
    location: z.string()
      .min(2, { message: "Location must be at least 2 characters" })
      .max(50, { message: "Location cannot exceed 50 characters" }),
    job_type: z.string(),
    salary: z.number().min(1).nonnegative(),
    working_hours: z.number().min(1).nonnegative(),
    experience: z.number().min(1).nonnegative(),
    degree: z.string()
});

export const Header = () => {
    const dispatch = useAppDispatch();
    const { vacancy, error } = useAppSelector(getUpdatingVacancy);
    const navigate = useNavigate();

    const { register, formState: { errors }, trigger, setValue } = useForm({
        resolver: zodResolver(vacancySchema),
        defaultValues: vacancy || {}
    });

    useEffect(() => {
        if (error) {
            navigate("/");
        }
    }, [error, navigate]);

    const onChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        dispatch(setUpdatingField({ name, value }));
        setValue(name as keyof typeof vacancySchema.shape, value);
        await trigger(name as keyof typeof vacancySchema.shape);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const checked = event.target.checked;
        dispatch(setUpdatingTag({checked, value}));
    };

    // Style for invalid fields
    const errorStyle = {
        borderColor: "#dc3545",
        boxShadow: "0 0 0 0.25rem rgba(220, 53, 69, 0.25)"
    };

    if (!vacancy) return <ErrorMessage error="Vacancy data not found" />;

    return (
      <header className="page-header">
          <div className="container page-name">
              <h1 className="text-center">Update job vacancy</h1>
              <p className="lead text-center">Edit your company's vacancy details.</p>
          </div>

          <div className="container">
              <div className="row">
                  <div className="form-group col-xs-12 col-sm-6">
                      <label htmlFor="title">Job Title</label>
                      <input
                        {...register("title")}
                        name="title"
                        id="title"
                        value={vacancy.title}
                        onChange={onChange}
                        type="text"
                        className="form-control input-lg"
                        style={errors.title ? errorStyle : {}}
                        placeholder="Job title, e.g. Front-end developer"
                      />
                      {errors.title && (
                        <div className="text-danger small mt-1">
                            {errors.title.message}
                        </div>
                      )}
                  </div>

                  <div className="form-group col-xs-12 col-sm-6">
                      <label htmlFor="company_name">Company Name</label>
                      <input
                        {...register("company_name")}
                        name="company_name"
                        id="company_name"
                        value={vacancy.company_name}
                        onChange={onChange}
                        type="text"
                        className="form-control input-lg"
                        style={errors.company_name ? errorStyle : {}}
                        placeholder="Company name, e.g. Google"
                      />
                      {errors.company_name && (
                        <div className="text-danger small mt-1">
                            {errors.company_name.message}
                        </div>
                      )}
                  </div>

                  <div className="form-group col-xs-12">
                      <label htmlFor="short_description">Short Description</label>
                      <textarea
                        {...register("short_description")}
                        name="short_description"
                        id="short_description"
                        value={vacancy.short_description}
                        onChange={onChange}
                        className="form-control"
                        style={errors.short_description ? errorStyle : {}}
                        rows={3}
                        placeholder="Short description"
                      />
                      {errors.short_description && (
                        <div className="text-danger small mt-1">
                            {errors.short_description.message}
                        </div>
                      )}
                  </div>

                  <div className="form-group col-xs-12 col-sm-6 col-md-4">
                      <label htmlFor="location">Location</label>
                      <div className="input-group input-group-sm">
                          <span className="input-group-addon"><i className="fa fa-map-marker"></i></span>
                          <input
                            {...register("location")}
                            name="location"
                            id="location"
                            value={vacancy.location}
                            onChange={onChange}
                            type="text"
                            className="form-control"
                            style={errors.location ? errorStyle : {}}
                            placeholder="Location, e.g. Melon Park, CA"
                          />
                      </div>
                      {errors.location && (
                        <div className="text-danger small mt-1">
                            {errors.location.message}
                        </div>
                      )}
                  </div>

                  <div className="form-group col-xs-12 col-sm-6 col-md-4">
                      <label htmlFor="job_type">Job Type</label>
                      <div className="input-group input-group-sm">
                          <span className="input-group-addon"><i className="fa fa-briefcase"></i></span>
                          <select
                            {...register("job_type")}
                            name="job_type"
                            id="job_type"
                            value={vacancy.job_type}
                            onChange={onChange}
                            className={`form-select w-100 ${style.vacancySelect}`}
                          >
                              <option>Full time</option>
                              <option>Part time</option>
                              <option>Internship</option>
                              <option>Freelance</option>
                              <option>Remote</option>
                          </select>
                      </div>
                  </div>

                  <div className="form-group col-xs-12 col-sm-6 col-md-4">
                      <label htmlFor="salary">Salary</label>
                      <div className="input-group input-group-sm">
                          <span className="input-group-addon"><i className="fa fa-money"></i></span>
                          <input
                            {...register("salary")}
                            name="salary"
                            id="salary"
                            value={vacancy.salary}
                            onChange={onChange}
                            type="text"
                            className="form-control"
                            style={errors.salary ? errorStyle : {}}
                            placeholder="Salary"
                          />
                      </div>
                      {errors.salary && (
                        <div className="text-danger small mt-1">
                            {errors.salary.message}
                        </div>
                      )}
                  </div>

                  <div className="form-group col-xs-12 col-sm-6 col-md-4">
                      <label htmlFor="working_hours">Working Hours</label>
                      <div className="input-group input-group-sm">
                          <span className="input-group-addon"><i className="fa fa-clock-o"></i></span>
                          <input
                            {...register("working_hours")}
                            name="working_hours"
                            id="working_hours"
                            value={vacancy.working_hours}
                            onChange={onChange}
                            type="number"
                            className="form-control"
                            style={errors.working_hours ? errorStyle : {}}
                            placeholder="Working hours, e.g. 40"
                          />
                          <span className="input-group-addon">hours / week</span>
                      </div>
                      {errors.working_hours && (
                        <div className="text-danger small mt-1">
                            {errors.working_hours.message}
                        </div>
                      )}
                  </div>

                  <div className="form-group col-xs-12 col-sm-6 col-md-4">
                      <label htmlFor="experience">Experience</label>
                      <div className="input-group input-group-sm">
                          <span className="input-group-addon"><i className="fa fa-flask"></i></span>
                          <input
                            {...register("experience")}
                            name="experience"
                            id="experience"
                            value={vacancy.experience}
                            onChange={onChange}
                            type="number"
                            className="form-control"
                            style={errors.experience ? errorStyle : {}}
                            placeholder="Experience, e.g. 5"
                          />
                          <span className="input-group-addon">Years</span>
                      </div>
                      {errors.experience && (
                        <div className="text-danger small mt-1">
                            {errors.experience.message}
                        </div>
                      )}
                  </div>

                  <div className="form-group col-xs-12 col-sm-6 col-md-4">
                      <label htmlFor="degree">Degree</label>
                      <div className="input-group input-group-sm">
                          <span className="input-group-addon"><i className="fa fa-certificate"></i></span>
                          <select
                            {...register("degree")}
                            name="degree"
                            id="degree"
                            value={vacancy.degree}
                            onChange={onChange}
                            className={`form-select w-100 ${style.vacancySelect}`}
                          >
                              <option>Postdoc</option>
                              <option>Ph.D.</option>
                              <option>Master</option>
                              <option selected>Bachelor</option>
                          </select>
                      </div>
                  </div>

                  <div className="form-group col-xs-12">
                      <h6>Available for</h6>
                      <div className="checkall-group">
                          <div className="checkbox col-xs-4">
                              <input checked={vacancy.tags.includes("available for people with disabilities")}
                                     type="checkbox" id="rate3" name="rate"
                                     value="available for people with disabilities"
                                     onChange={handleCheckboxChange} />
                              <label htmlFor="rate3">available for people with disabilities</label>
                          </div>

                          <div className="checkbox col-xs-4" style={{ marginTop: 10 }}>
                              <input checked={vacancy.tags.includes("available for retirees")}
                                     type="checkbox"
                                     id="rate4"
                                     name="rate"
                                     value="available for retirees"
                                     onChange={handleCheckboxChange} />
                              <label htmlFor="rate4">available for retirees</label>
                          </div>

                          <div className="checkbox col-xs-4" style={{ marginTop: 10 }}>
                              <input checked={vacancy.tags.includes("available for minors")}
                                     type="checkbox"
                                     id="rate5"
                                     name="rate"
                                     value="available for minors"
                                     onChange={handleCheckboxChange} />
                              <label htmlFor="rate5">available for minors</label>
                          </div>
                      </div>

                  </div>
              </div>
          </div>
      </header>
    );
};
