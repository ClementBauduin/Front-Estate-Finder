import { useState } from 'react'
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form' 
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import {login} from '../../api/login.js'
import Style from './Login.module.css'
import { useContext } from 'react'
import { UserContext } from '../../App'


export default function Login(props) {

  const {refetch} = useContext(UserContext)
  const {register, handleSubmit, formState: {errors}} = useForm();
  
  const [backMessage, setBackMessage] = useState(null);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    let {usernameEmail,password} = data;
    login(usernameEmail,password)
    .then(res=>{
      setBackMessage(res.message);
      refetch();
      navigate('/');
    })
    .catch(err=>{
      setBackMessage(err.response.data.message);
    })
    
  }

  return (
    <>
      <Header/>
      <main>
        <h1 className={Style.title}>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={Style.LoginForm}>

          <label htmlFor="usernameMail">Username or Email</label>
          <input id="usernameMail"type="text" {...register("usernameEmail",{required:true})}></input>
          {errors.usernameEmail && <p className={Style.message}>Username or Email is required</p>}

          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register("password",{required:true})}></input>
          {errors.password && <p className={Style.message}>Password is required</p>}
          {backMessage && <p className={Style.message}>{backMessage}</p>}
          <button type="submit">Login</button>
          <p>Not registered ?</p>
          <Link to="/register">Click here to sign up</Link>
        </form>
      </main>
      
    </>
  )
}
