import {useState} from 'react';
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import Header from '../../components/Header/Header';
import Style from './Register.module.css';
import axios from 'axios';

export default function Register() {

  const {register, handleSubmit, formState: {errors},reset} = useForm();
  const [PasswordError, setPasswordError] = useState(null);
  const [formError, setFormError] = useState(null);

  const onSubmit = (data) => {
    if (data.password === data.confirmPassword) {
      let {username,email,password} = data;
      axios.post(process.env.REACT_APP_API_URL, {username:username,email:email,password:password})
      .then((response) => {
        setFormError(response.data.message)
      })
      .catch((error) => {
        console.log(error);
      })
      reset()
    } else {
      setPasswordError('Passwords do not match');
    }
  }

  return (
    <>
      <Header />
      <main>
        <h1 className={Style.title}>Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={Style.RegisterForm}>
          <label htmlFor="username">Username</label>
          <input id="username"type="text" {...register("username",{required:true,pattern: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/})}></input>
          {errors.username && <p className={Style.message}>Username is required</p>}

          <label htmlFor="email">Email</label>
          <input id="email" type="mail" {...register("email",{required:true,pattern: /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/})}></input>
          {errors.email && <p className={Style.message}>Email is required</p>}
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register("password",{required:true,pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/})}></input>
          {errors.password && <p className={Style.message}>Password is required, must contain 8 characters one capital letter A-Z and at least one number 0-9.</p>}

          <label htmlFor="passwordCheck">Confirm Password</label>
          <input id="passwordCheck" type="password" {...register("confirmPassword",{required:true,pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/})}></input>
          {PasswordError && <p>{PasswordError}</p>}
          {formError && <p className={Style.message}>{formError}</p>}
          <button type="submit">Register</button>
          <p>Already registered ?</p>
          <Link to="/login">Click here to login</Link>
        </form>
      </main>   
    </>
  )
}
