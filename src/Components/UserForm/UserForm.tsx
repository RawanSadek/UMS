import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function UserForm(props: { imgFlag: boolean; disableFlag: boolean; btnFlag: boolean; userData: any }) {

  let { imgFlag, disableFlag, btnFlag, userData } = props

  interface formData {
    image: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthDate: string;
    age: number
  }

  let { register, handleSubmit, setValue, formState: { errors } } = useForm<formData>();

  let navigate = useNavigate();

  let onSubmit = async (data: formData) => {
    try {
      if (!userData) {
        await axios.post("https://dummyjson.com/users/add", data);
        toast.success("User added succeccfully")
      }
      else {
        let response = await axios.put(`https://dummyjson.com/users/${userData.id}`, data);
        
        let stringUsers = localStorage.getItem("users");
        if (stringUsers) {
          let users = JSON.parse(stringUsers);
          let updatedUsers = users.map((user: any) => Number(user.id) == Number(response.data.id) ? response.data : user);
          localStorage.setItem("users", JSON.stringify(updatedUsers));
        }
        toast.success("User data updated succeccfully")
      }

      navigate("/dashboard/users");

    } catch (error) {
      toast.error("Something wrong happened. Please try again!")
      console.log(error);

    }

  }

  useEffect(() => {
    if (userData) {
      let fields = ['firstName', 'lastName', 'email', 'age', 'phone', 'birthDate'] as const;

      for (const field of fields) {
        // console.log(userData[field])
        setValue(field, userData[field]);
      }
      // setValue('firstName', userData.firstName);
      // setValue('lastName', userData.lastName);
      // setValue('email', userData.email);
      // setValue('age', userData.age);
      // setValue('phone', userData.phone);
      // setValue('birthDate', userData.birthDate);
    }
  }, [userData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="userForm p-5 shadow-lg col-9 position-relative rounded-4">
      <div className="form-img-container" hidden={imgFlag}><img src={userData ? userData.image : ''} alt="user image" /></div>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-6 mb-3">
          <label className='mb-1 text-secondary'>First Name</label>
          <input disabled={disableFlag} type="text" className='form-control px-3 py-2' placeholder={`Enter your first name`} {...register('firstName', { required: 'First Name is required!!!' })} />
          {errors.firstName && <p className='text-danger'>{errors.firstName.message}</p>}
        </div>

        <div className="col-12 col-lg-6 mb-3">
          <label className='mb-1 text-secondary'>Last Name</label>
          <input disabled={disableFlag} type="text" className='form-control px-3 py-2' placeholder='Enter your last name' {...register('lastName', { required: 'Last Name is required!!!' })} />
          {errors.lastName && <p className='text-danger'>{errors.lastName.message}</p>}
        </div>

        <div className="col-12 col-lg-6 mb-3">
          <label className='mb-1 text-secondary'>Email</label>
          <input disabled={disableFlag} type="email" className='form-control px-3 py-2' placeholder='Enter your email' {...register('email', { required: 'Email is required!!!', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,4}$/, message: "Invalid email!!" } })} />
          {errors.email && <p className='text-danger'>{errors.email.message}</p>}
        </div>

        <div className="col-12 col-lg-6 mb-3">
          <label className='mb-1 text-secondary'>Age</label>
          <input disabled={disableFlag} type="number" className='form-control px-3 py-2' placeholder='Enter your age' {...register('age', { required: 'Age is required!!!', max: { value: 55, message: "This age is above the max!!" }, min: { value: 16, message: "This age is below the min!!" } })} />
          {errors.age && <p className='text-danger'>{errors.age.message}</p>}
        </div>

        <div className="col-12 col-lg-6 mb-3">
          <label className='mb-1 text-secondary'>Phone</label>
          <input disabled={disableFlag} type="text" className='form-control px-3 py-2' placeholder={`Enter your phone`} {...register('phone', { required: 'phone is required!!!', pattern: { value: /^\+?[0-9\s\-]{9,15}$/, message: "Invalid phone number!!" } })} />
          {errors.phone && <p className='text-danger'>{errors.phone.message}</p>}
        </div>

        <div className="col-12 col-lg-6 mb-3">
          <label className='mb-1 text-secondary'>Birth Date</label>
          {userData ? <input disabled={disableFlag} type="text" className='form-control px-3 py-2' placeholder='Enter your birth date' {...register('birthDate', { required: 'Birth Date is required!!!' })} />
            : <input disabled={disableFlag} type="date" className='form-control px-3 py-2' placeholder='Enter your birth date' {...register('birthDate', { required: 'Birth Date is required!!!' })} />}
          {errors.birthDate && <p className='text-danger'>{errors.birthDate.message}</p>}
        </div>

      </div>

      <div className="text-center" hidden={btnFlag}>
        <button className='btn login-btn w-75 my-4 py-2 text-light'>Save</button>
      </div>

    </form>
  )
}
