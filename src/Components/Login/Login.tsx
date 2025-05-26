import axios from 'axios';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { CiUser } from "react-icons/ci";
import { TbLockPassword } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthContext/AuthContext';


export default function Login() {

  interface AuthContextInterface{
    saveUserData:()=>void
}

  let {saveUserData} = useContext(AuthContext) as AuthContextInterface;

  interface loginForm
  {
    username:string;
    password:string;
  }

  let{register, handleSubmit, formState:{errors}}=useForm<loginForm>();
  let navigate = useNavigate();

  let onSubmit = async(data:loginForm)=>
  {
    try {
      let response = await axios.post("https://dummyjson.com/auth/login",data);
      localStorage.setItem("accessToken",response?.data?.accessToken);
      saveUserData()
      toast.success("Welcome to UMS")
      navigate("/dashboard");      
    } catch (error) {
      toast.error("Wrong username or password. Please try again!")
      console.log(error);
      
    }
  }

  return (
    <div className="login-container">
      <div className="d-flex justify-content-center align-items-center vh-100 vw-100">
        <div className="col-8 col-lg-4">
          <form onSubmit={handleSubmit(onSubmit)} className='rounded rounded-2 p-4 bg-light'>
            <div className="title text-center mb-5">
              <h2 className='mb-5 position-relative'>User Management System</h2>
              <h4 className='text-uppercase'>Sign In</h4>
              <p className='text-secondary'>Enter your credentials to access your account</p>
            </div>
            <CiUser className='fs-5'/><label className='text-secondary mb-2'>Username</label>
            <input type="text" className='form-control px-3 py-2 text-secondary' placeholder={`Enter your username`} {...register('username', {required:'Username is required!!!'})}/>
            {errors.username && <p className='text-danger'>{errors.username.message}</p>}
            <small>Try this username: emilys</small>
            <TbLockPassword className='fs-5'/><label className='text-secondary mb-2 mt-4'>Password</label>
            <input type="password" className='form-control px-3 py-2 text-secondary' placeholder='Enter your password' {...register('password', {required:'Password is required!!!'})}/>
             {errors.password && <p className='text-danger'>{errors.password.message}</p>}
             <small>Try this password: emilyspass</small>
            <button className='btn login-btn w-100 my-4 py-2 text-light'>Sign In</button>
          </form>
        </div>
      </div>
    </div>
  )
}
