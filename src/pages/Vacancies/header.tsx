import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {useAppDispatch} from "@hooks/redux.ts";
import {setForm} from "../../store/reducers/FilterForm/slice/FilterForm.ts";
import { useState } from 'react';

// Стили для ошибок
const errorStyle = {
    borderColor: "#dc3545",
    boxShadow: "0 0 0 0.25rem rgba(220, 53, 69, 0.25)"
};

const selectStyle = {
    lineHeight: "44px",
    height: 44,
    padding: "0 0 0 16px",
    borderRadius: 0,
    fontSize: 15,
    color: "#818a91"
};

const formSchema = z.object({
    keyword: z.string().max(50,{ message: "Max 50 символов"}),
    location: z.string().max(50,{ message: "Максимум 50 символов"}),
    experience: z.number().min(0, { message: "Не может быть отрицательным" }).nonnegative(),
    contract: z.string(),
    hour_rate: z.number().min(0, { message: "Не может быть отрицательным" }).nonnegative(),
    degree: z.string()
});

const defaultValues = {
    keyword: "",
    location: "",
    experience: 0,
    contract: "",
    hour_rate: 0,
    degree: "",
    tags:[]
}

export const Header = () => {
    const [tags, setTags] = useState<string[]>([]);
    const dispatch = useAppDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        dispatch(setForm({...data,tags}))
        toast.success("Фильтры применены успешно!");
    };

    const onReset = () => {
        reset();
        setTags([])
        dispatch(setForm(defaultValues))
        toast.info("Фильтры сброшены");
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setTags(prevTags =>
          event.target.checked
            ? [...prevTags, value]
            : prevTags.filter(tag => tag !== value)
        );
    };

    return (
        <header className="page-header bg-img" style={{ backgroundImage: "url(bg-banner1.jpg)" }}>
            <div className="container page-name">
                <h1 className="text-center">Browse jobs</h1>
                <p className="lead text-center">Use following search box to find jobs that fits you better</p>
            </div>

            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        {/* Keyword Field */}
                        <div className="form-group col-xs-12 col-sm-4">
                            <h6>Key words</h6>
                            <input
                              {...register("keyword")}
                              className="form-control"
                              style={errors.keyword ? errorStyle : {}}
                              placeholder="Keyword: job title, skills, or company"
                            />
                            {errors.keyword && (
                              <div className="text-danger small mt-1">
                                  {errors.keyword.message}
                              </div>
                            )}
                        </div>

                        {/* Location Field */}
                        <div className="form-group col-xs-12 col-sm-4">
                            <h6>Location</h6>
                            <input
                              {...register("location")}
                              className="form-control"
                              style={errors.location ? errorStyle : {}}
                              placeholder="Location: city, state or zip"
                            />
                            {errors.location && (
                              <div className="text-danger small mt-1">
                                  {errors.location.message}
                              </div>
                            )}
                        </div>

                        {/* Experience Field */}
                        <div className="form-group col-xs-12 col-sm-4">
                            <h6>Minimal experience</h6>
                            <input
                              {...register("experience", { valueAsNumber: true })}
                              className="form-control"
                              style={errors.experience ? errorStyle : {}}
                              placeholder="Working hours"
                              type="number"
                            />
                            {errors.experience && (
                              <div className="text-danger small mt-1">
                                  {errors.experience.message}
                              </div>
                            )}
                        </div>

                        {/* Contract Field */}
                        <div className="form-group col-xs-12 col-sm-4">
                            <h6>Contract</h6>
                            <select
                              {...register("contract")}
                              className="form-select"
                              style={{
                                  ...selectStyle,
                                  ...(errors.contract ? errorStyle : {})
                              }}
                            >
                                <option value="">any</option>
                                <option value="Full time">Full time</option>
                                <option value="Part time">Part time</option>
                                <option value="Internship">Internship</option>
                                <option value="Freelance">Freelance</option>
                                <option value="Remote">Remote</option>
                            </select>
                        </div>

                        {/* Hourly Rate Field */}
                        <div className="form-group col-xs-12 col-sm-4">
                            <h6>Hourly rate</h6>
                            <input
                              type="number"
                              min="0"
                              {...register("hour_rate", { valueAsNumber: true })}
                              className="form-control"
                              style={errors.hour_rate ? errorStyle : {}}
                              placeholder="Hourly rate"
                            />
                            {errors.hour_rate && (
                              <div className="text-danger small mt-1">
                                  {errors.hour_rate.message}
                              </div>
                            )}
                        </div>

                        {/* Degree Field */}
                        <div className="form-group col-xs-12 col-sm-4">
                            <h6>Academic degree</h6>
                            <select
                              {...register("degree")}
                              className="form-select"
                              style={{
                                  ...selectStyle,
                                  ...(errors.degree ? errorStyle : {})
                              }}
                            >
                                <option value="">any</option>
                                <option value="Bachelor">Bachelor</option>
                                <option value="Postdoc">Postdoc</option>
                                <option value="Ph.D.">Ph.D.</option>
                                <option value="Master">Master</option>
                            </select>
                        </div>
                        <div className="form-group col-xs-12">
                            <h6>Available for</h6>
                            <div className="checkall-group">
                                <div className="checkbox col-xs-4">
                                    <input
                                      checked={tags.includes("available for people with disabilities")}
                                      onChange={handleCheckboxChange}
                                           type="checkbox" id="rate3" name="rate"
                                           value="available for people with disabilities"
                                    />
                                    <label htmlFor="rate3">available for people with disabilities</label>
                                </div>

                                <div className="checkbox col-xs-4" style={{ marginTop: 10 }}>
                                    <input
                                      checked={tags.includes("available for retirees")}
                                      onChange={handleCheckboxChange}
                                           type="checkbox"
                                           id="rate4"
                                           name="rate"
                                           value="available for retirees"
                                           />
                                    <label htmlFor="rate4">available for retirees</label>
                                </div>

                                <div className="checkbox col-xs-4" style={{ marginTop: 10 }}>
                                    <input
                                      checked={tags.includes("available for minors")}
                                      onChange={handleCheckboxChange}
                                           type="checkbox"
                                           id="rate5"
                                           name="rate"
                                           value="available for minors"/>
                                    <label htmlFor="rate5">available for minors</label>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="button-group">
                        <div className="action-buttons">
                            <button
                              type="button"
                              onClick={onReset}
                              className="btn btn-secondary ms-2"
                            >
                                Reset
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Apply filter
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </header>
    );
};
