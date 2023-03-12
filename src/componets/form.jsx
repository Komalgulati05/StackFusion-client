import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Formdata } from '../utils/services';

import './Form.css';

export default function Form() {
  const [isLoading, setIsLoading] = useState(false);

  const [code, setcode] = useState([])
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const countrycode = () => {
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("apikey", "9CxUWGheancBin3835yzTIIUPilUiNhN");

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };

    fetch("https://api.apilayer.com/number_verification/countries", requestOptions)
      .then(response => response.text())
      .then(result => {
        setcode(JSON.parse(result));
        setIsLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    countrycode()
    // console.log(code[0]);
  }, [])

  const onSubmit = (data) => {
    setIsLoading(true)
    console.log(data);
    Formdata(data)
      .then(res => {
        setIsLoading(false);
        alert("Form submitted");
        navigate("/view");
      })
      .catch(err =>{
        setIsLoading(false);
        
        alert("Invalid phone number");
      });
  }

  return (<>
    {isLoading ? (
      <div className="loader"></div>
    ) : (

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label>
          First name:
          <input type="text" {...register("firstName", { required: true, maxLength: 80, pattern: /^[a-zA-Z]*$/ })} />
          {errors.firstName && <span style={{ color: "red" }} className="error-label">Please enter a valid first name</span>}
        </label>

        <label>
          Last name:
          <input type="text" {...register("lastName", { required: true, maxLength: 100, pattern: /^[a-zA-Z]*$/ })} />
          {errors.lastName && <span style={{ color: "red" }} className="error-label">Please enter a valid last name</span>}
        </label>

        <label>
          Email:
          <input type="text" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
          {errors.email && <span style={{ color: "red" }} className="error-label">Please enter a valid email</span>}
        </label>

        <div className="mobile-number-field">
          <label htmlFor="country-code">Country code:</label>
          <select id="country-code" {...register("countrycode", { required: true })}>
            {Object.keys(code).map((countryCode) => {
              const countryName = code[countryCode]['country_name'];
              const diallingCode = code[countryCode]['dialling_code'];
              return (
                <option key={countryCode} value={diallingCode}>
                  {diallingCode} ({countryName})
                </option>
              );
            })}
          </select>


          <label htmlFor="phone-number">Phone number:</label>
          <input type="tel" id="phone-number" {...register("mobileNumber", { required: true, minLength: 10, maxLength: 12, pattern: /^[0-9]*$/ })} />
          {errors.mobileNumber && <span style={{ color: "red" }} className="error-label">Please enter a valid mobile number</span>}
        </div>

        <label>
          Date of Birth:
          <input type="date" {...register("dateOfBirth", { required: true })} />
          {errors.dateOfBirth && <span style={{ color: "red" }} className="error-label">Please enter a valid date of birth</span>}
        </label>

        <input className="submit-button" type="submit" value="Submit" />
      </form>
    )}
  </>
  );
}
