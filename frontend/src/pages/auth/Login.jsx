import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { loginUser } from '../../redux/features/auth/authSlice';
import loginImg from '../../assets/Login.png';
import { toast } from 'react-toastify';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;
  const { isLoading } = useSelector((state) => state.auth);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please fill all fields");
    }

    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
          console.log(result.user.role)

      toast.success('Login successful');
      if(result.user.role==="company"){
        navigate('/managerhome');

      }
      else if(result.user.role==="student"){
        navigate("/Student")

      }
       // Adjust this to the appropriate dashboard or home route
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      <div className="md:w-1/2 flex items-center justify-center bg-no-repeat bg-center bg-sky-500">
        <img src={loginImg} alt="Login"  />
      </div>
      <div className="md:w-1/2 py-10 md:py-20 md:px-36 flex flex-col items-center justify-center">
        <h2 className="text-center text-xl text-blue-600 mb-6">Sign In To The System</h2>
        <form className="space-y-3 w-full max-w-md" onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="example@gmail.com"
              className="input w-full"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input w-full"
                value={password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? <HiEyeOff className="h-6 w-6 text-gray-500" />
                  : <HiEye className="h-6 w-6 text-gray-500" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Login'}
          </button>
          <div className="text-sm mt-2">
            <Link to="/auth/forgotpassword" className="text-blue-500 hover:underline">Forgot Password?</Link>
            <span className="px-2 text-gray-900">Don't have an account?</span>
            <Link to="/auth/register" className="text-blue-500 hover:underline">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
