import avatar from '@assets/img/avatar.jpg';
import React from "react";
import { useAppDispatch, useAppSelector } from "@hooks/redux.ts";
import { setUpdatingField } from "../../store/reducers/UpdateResume/slice/UpdateResumeSlice.ts";
import { getUpdatingResumeData } from "../../store/reducers/UpdateResume/selectors/getResumeData.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Validation schema
const resumeSchema = z.object({
    title: z.string().min(5, { message: "Minimum 5 characters" }).max(100),
    description: z.string().min(5, { message: "Minimum 5 characters" }).max(500),
    location: z.string().min(2, { message: "Minimum 2 characters" }).max(50),
    salary: z.string()
        .regex(/^\d+$/, { message: "Numbers only" })
});

const UpdatingResumeHeading = () => {
    const dispatch = useAppDispatch();
    const { title, description, salary, location } = useAppSelector(getUpdatingResumeData);

    const { register, formState: { errors }, trigger, setValue } = useForm({
        resolver: zodResolver(resumeSchema),
        defaultValues: {
            title,
            description,
            location,
            salary: salary?.toString() || ""
        }
    });

    const changeHandler = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        dispatch(setUpdatingField({ name, value }));
        setValue(name as keyof typeof resumeSchema.shape, value);
        await trigger(name as keyof typeof resumeSchema.shape);
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
                                style={{ width: "200px" }}
                                src={avatar}
                                alt="Profile placeholder"
                            />
                        </div>
                    </div>

                    <div className="col-xs-12 col-sm-8">
                        <div className="form-group">
                            <input
                                {...register("title")}
                                type="text"
                                onChange={changeHandler}
                                value={title}
                                name="title"
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
              <textarea
                  {...register("description")}
                  name="description"
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
                                <div className="input-group input-group-sm">
                                    <span className="input-group-addon"><i className="fa fa-map-marker"></i></span>
                                    <input
                                        {...register("location")}
                                        name="location"
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
                                <div className="input-group input-group-sm">
                                    <span className="input-group-addon"><i className="fa fa-usd"></i></span>
                                    <input
                                        {...register("salary")}
                                        onChange={changeHandler}
                                        value={salary!}
                                        type="text"
                                        name="salary"
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
