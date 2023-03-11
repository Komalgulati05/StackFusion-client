import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Formdata } from '../utils/services';
import './Form.css';

export default function Form() {
    const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    Formdata(data).then(res=>{alert("Form submited "); navigate("/view")})
    .catch(err=>console.log(err))
}
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <label>
        First name:
        <input type="text" {...register("firstName", {required: true, maxLength: 80})} />
        {errors.firstName && <span className="error-label">Please enter a valid tithe amount</span>}{errors.tithe && <span className="error-label">Please enter a valid tithe amount</span>}
      </label>
      <label>
        Last name:
        <input type="text" {...register("lastName", {required: true, maxLength: 100})} />
        {errors.lastName && <span className="error-label">Please enter a valid tithe amount</span>}{errors.tithe && <span className="error-label">Please enter a valid tithe amount</span>}
      </label>
      <label>
        Email:
        <input type="text" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
        {errors.email && <span className="error-label">Please enter a valid tithe amount</span>}{errors.tithe && <span className="error-label">Please enter a valid tithe amount</span>}
      </label>
      <label>
        Mobile number:
        <input type="tel" {...register("mobileNumber", {required: true, minLength: 10, maxLength: 12})} />
        {errors.mobileNumber && <span className="error-label">Please enter a valid tithe amount</span>}{errors.tithe && <span className="error-label">Please enter a valid tithe amount</span>}
      </label>
      <label>
        Date of Birth:
        <input type="date" {...register("dateOfBirth", {required: true})} />
        {errors.dateOfBirth  && <span className="error-label">Please enter a valid tithe amount</span>}{errors.tithe && <span className="error-label">Please enter a valid tithe amount</span>}
      </label>

      <input className="submit-button" type="submit" value="Submit" />
    </form>
  );
}
