import avatar from '@assets/img/avatar.jpg';
import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from "@hooks/redux.ts";
import { setUpdatingField } from "../../store/reducers/UpdateResume/slice/UpdateResumeSlice.ts";
import { getUpdatingResumeData } from "../../store/reducers/UpdateResume/selectors/getResumeData.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { setImage } from '../../store/reducers/CreateResume/slice/CreateResumeSlice.ts';
import { getImage } from '@pages/UpdateResume/helper.ts';

// Validation schema
const resumeSchema = z.object({
    title: z.string().min(5, { message: "Minimum 5 characters" }).max(100),
    description: z.string().min(5, { message: "Minimum 5 characters" }).max(500),
    location: z.string().min(2, { message: "Minimum 2 characters" }).max(50),
    salary: z.number().nonnegative(),
    image: z.instanceof(File).optional()
});

const UpdatingResumeHeading = () => {
    const dispatch = useAppDispatch();
    const { title, description, salary, location, image } = useAppSelector(getUpdatingResumeData);

    const { register, formState: { errors }, trigger, setValue } = useForm({
        resolver: zodResolver(resumeSchema),
        defaultValues: {
            title,
            description,
            location,
            salary: salary
        }
    });

    const changeHandler = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        dispatch(setUpdatingField({ name, value }));
        setValue(name as keyof typeof resumeSchema.shape, value);
        await trigger(name as keyof typeof resumeSchema.shape);
    };

    const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            dispatch(setImage(file));
            setValue("image", file);
            await trigger("image");
        }
    };

    // Style for invalid fields
    const errorStyle = {
        borderColor: "#dc3545",
        boxShadow: "0 0 0 0.25rem rgba(220, 53, 69, 0.25)"
    };

    return (
      <header className="page-header">
          <div className="container page-name">
              <h1 className="text-center">Update your resume</h1>
              <p className="lead text-center">Update your resume and put it online.</p>
          </div>

          <div className="container">
              <div className="row">
                  <div className="col-xs-12 col-sm-4">
                      <div className="mb-4 d-flex justify-content-center">
                          <img
                            style={{ width: '250px', height: '350px', objectFit: 'contain' }}
                            src={image ? getImage(image) : avatar}
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
                          <label htmlFor="title">Headline</label>
                          <input
                            {...register('title')}
                            type="text"
                            onChange={changeHandler}
                            value={title}
                            name="title"
                            id="title"
                            className="form-control"
                            style={errors.title ? errorStyle : {}}
                            placeholder="Headline (e.g. Front-end developer)"
                          />
                          {errors.title && (
                            <div className="text-danger small mt-1">
                                {errors.title.message}
                            </div>
                          )}
                      </div>

                      <div className="form-group">
                          <label htmlFor="description">Description</label>
                          <textarea
                            {...register('description')}
                            name="description"
                            id="description"
                            onChange={changeHandler}
                            value={description}
                            className="form-control"
                            style={errors.description ? errorStyle : {}}
                            rows={3}
                            placeholder="Short description about you"
                          />
                          {errors.description && (
                            <div className="text-danger small mt-1">
                                {errors.description.message}
                            </div>
                          )}
                      </div>

                      <hr className="hr-lg"/>

                      <h6>Basic information</h6>
                      <div className="row">
                          <div className="form-group col-xs-12 col-sm-6">
                              <label htmlFor="location">Location</label>
                              <div className="input-group input-group-sm">
                                  <span className="input-group-addon"><i className="fa fa-map-marker"></i></span>
                                  <input
                                    {...register("location")}
                                    name="location"
                                    id="location"
                                    onChange={changeHandler}
                                    value={location!}
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

                          <div className="form-group col-xs-12 col-sm-6">
                              <label htmlFor="salary">Salary</label>
                              <div className="input-group input-group-sm">
                                  <span className="input-group-addon"><i className="fa fa-usd"></i></span>
                                  <input
                                    {...register("salary")}
                                    onChange={changeHandler}
                                    value={salary!}
                                    type="text"
                                    name="salary"
                                    id="salary"
                                    className="form-control"
                                    style={errors.salary ? errorStyle : {}}
                                    placeholder="Salary, e.g. 85"
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
                  </div>
              </div>
          </div>
      </header>
    );
};

export default UpdatingResumeHeading;
