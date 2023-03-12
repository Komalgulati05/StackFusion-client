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
    Formdata(data)
      .then(res => {
        alert("Form submitted");
        navigate("/view");
      })
      .catch(err => console.log(err));
  }
  
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <label>
        First name:
        <input type="text" {...register("firstName", {required: true, maxLength: 80, pattern: /^[a-zA-Z]*$/})} />
        {errors.firstName && <span className="error-label">Please enter a valid first name</span>}
      </label>
      
      <label>
        Last name:
        <input type="text" {...register("lastName", {required: true, maxLength: 100, pattern: /^[a-zA-Z]*$/})} />
        {errors.lastName && <span className="error-label">Please enter a valid last name</span>}
      </label>
      
      <label>
        Email:
        <input type="text" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
        {errors.email && <span className="error-label">Please enter a valid email</span>}
      </label>
      
      <label>
        Mobile number:
        <input type="tel" {...register("mobileNumber", {required: true, minLength: 10, maxLength: 12, pattern: /^[0-9]*$/})} />
        {errors.mobileNumber && <span className="error-label">Please enter a valid mobile number</span>}
      </label>
      
      <label>
        Date of Birth:
        <input type="date" {...register("dateOfBirth", {required: true})} />
        {errors.dateOfBirth  && <span className="error-label">Please enter a valid date of birth</span>}
      </label>

      <input className="submit-button" type="submit" value="Submit" />
    </form>
  );
}
