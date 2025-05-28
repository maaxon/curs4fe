import avatar from '@assets/img/avatar.jpg';
import React, { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/redux.ts";
import { getResumeData } from "../../../store/reducers/CreateResume/selectors/getResumeData.ts";
import { setField, setImage } from "../../../store/reducers/CreateResume/slice/CreateResumeSlice.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Схема валидации
const resumeSchema = z.object({
    headline: z.string().min(5, { message: "Minimum 5 characters" }).max(100),
    description: z.string().min(20, { message: "Minimum 20 characters" }).max(500),
    location: z.string().min(2, { message: "Minimum 2 characters" }).max(50),
    salary: z.string().regex(/^\d+$/, { message: "Numbers only" }),
    image: z.instanceof(File).optional()
});

type ResumeFormData = z.infer<typeof resumeSchema>;

const ResumeHeading = () => {
    const dispatch = useAppDispatch();
    const { headline, description, salary, location, image } = useAppSelector(getResumeData);

    const { register, formState: { errors }, setValue, trigger } = useForm<ResumeFormData>({
        resolver: zodResolver(resumeSchema),
        defaultValues: {
            headline,
            description,
            location,
            salary: salary?.toString(),
            image
        }
    });

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        dispatch(setField({ name, value }));
        setValue(name as keyof ResumeFormData, value);
        trigger(name as keyof ResumeFormData);
    };

    const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            dispatch(setImage(file));
            setValue("image", file);
            await trigger("image");
        }
    };

    // Стиль для невалидных полей
    const errorStyle = {
        borderColor: "#dc3545",
        boxShadow: "0 0 0 0.25rem rgba(220, 53, 69, 0.25)"
    };

    return (
      <header className="page-header">
          <div className="container page-name">
              <h1 className="text-center">Add your resume</h1>
              <p className="lead text-center">Create your resume and put it online.</p>
          </div>

          <div className="container">
              <div className="row">
                  <div className="col-xs-12 col-sm-4">
                      <div className="mb-4 d-flex justify-content-center">
                          <img
                            style={{ width: "250px", height: "340px", objectFit: "contain" }}
                            src={image ? URL.createObjectURL(image) : avatar}
                            alt="Profile"
                          />
                      </div>
                      <div className="d-flex justify-content-center">
                          <div className="btn btn-primary position-relative">
                              <label className="form-label text-white m-1" htmlFor="customFile1">
                                  Choose profile image
                              </label>
                              <input
                                type="file"
                                onChange={onImageChange}
                                className="form-control position-absolute top-0 start-0 w-100 h-100 opacity-0"
                                id="customFile1"
                                accept="image/*"
                              />
                          </div>
                      </div>
                      {errors.image && (
                        <div className="text-danger small text-center mt-2">
                            {errors.image.message}
                        </div>
                      )}
                  </div>

                  <div className="col-xs-12 col-sm-8">
                      <div className="form-group">
                          <label htmlFor="headline" className="form-label mb-1">
                              Professional Headline
                          </label>
                          <input
                            {...register("headline")}
                            onChange={changeHandler}
                            value={headline}
                            name="headline"
                            id="headline"
                            className="form-control"
                            style={errors.headline ? errorStyle : {}}
                            placeholder="Front-end developer"
                          />
                          {errors.headline && (
                            <div className="text-danger small mt-1">
                                {errors.headline.message}
                            </div>
                          )}
                      </div>

                      <div className="form-group mt-3">
                          <label htmlFor="description" className="form-label mb-1">
                              About You
                          </label>
                          <textarea
                            {...register("description")}
                            onChange={changeHandler}
                            value={description}
                            name="description"
                            id="description"
                            className="form-control"
                            rows={3}
                            style={errors.description ? errorStyle : {}}
                            placeholder="Brief description of your skills and experience"
                          />
                          {errors.description && (
                            <div className="text-danger small mt-1">
                                {errors.description.message}
                            </div>
                          )}
                      </div>

                      <br/>

                      <h6>Basic information</h6>
                      <div className="row">
                          <div className="form-group col-xs-12 col-sm-6 mt-3">
                              <label htmlFor="location" className="form-label mb-1">
                                  Location
                              </label>
                              <div className="input-group input-group-sm">
                                  <span className="input-group-addon"><i className="fa fa-map-marker"></i></span>
                                  <input
                                    {...register("location")}
                                    onChange={changeHandler}
                                    value={location}
                                    name="location"
                                    id="location"
                                    type="text"
                                    className="form-control"
                                    style={errors.location ? errorStyle : {}}
                                    placeholder="Melon Park, CA"
                                  />
                              </div>
                              {errors.location && (
                                <div className="text-danger small mt-1">
                                    {errors.location.message}
                                </div>
                              )}
                          </div>

                          <div className="form-group col-xs-12 col-sm-6 mt-3">
                              <label htmlFor="salary" className="form-label mb-1">
                                  Hourly Rate
                              </label>
                              <div className="input-group input-group-sm">
                                  <span className="input-group-addon"><i className="fa fa-usd"></i></span>
                                  <input
                                    {...register("salary")}
                                    onChange={changeHandler}
                                    value={salary}
                                    name="salary"
                                    id="salary"
                                    type="text"
                                    className="form-control"
                                    style={errors.salary ? errorStyle : {}}
                                    placeholder="85"
                                  />
                                  <span className="input-group-addon">Per hour</span>
                              </div>
                              {errors.salary && (
                                <div className="text-danger small mt-1">
                                    {errors.salary.message}
                                </div>
                              )}
                          </div>
                      </div>
                      <hr className="hr-lg"/>
                  </div>
              </div>
          </div>
      </header>
    );
};

export default ResumeHeading;
