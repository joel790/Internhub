import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import loginimg from '../../assets/Login.png';
import { registerUser } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { name, email, password, confirmPassword } = formData;
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return toast.error("Please fill all fields");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters long");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const userData = { name, email, password };
    setIsLoading(true);
    try {
      await dispatch(registerUser(userData)).unwrap();
      toast.success("Please check your email to verify your account.");

    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      <div className="md:w-1/2 flex items-center justify-center bg-cover bg-no-repeat bg-center bg-sky-500">
        <img  src={loginimg} alt="Login" />
      </div>
      <div className="md:w-1/2 py-10 md:py-20 md:px-36 border-2 rounded-r-2xl border-white">
        <h2 className="text-center text-xl text-blue-600">Sign Up To The System</h2>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              name="name"
              placeholder="Name"
              type="text"
              className="input"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              name="email"
              placeholder="example@gmail.com"
              type="email"
              className="input"
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
                className="input"
                value={password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <HiEyeOff className="h-6 w-6 text-gray-500" />
                ) : (
                  <HiEye className="h-6 w-6 text-gray-500" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label>Confirm Password</label>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="input"
                value={confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <HiEyeOff className="h-6 w-6 text-gray-500" />
                ) : (
                  <HiEye className="h-6 w-6 text-gray-500" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
          <div className="text-sm">
            <Link to="/" className="text-blue-500 hover:underline">Home</Link>
            <span className="px-2 text-slate-900">Have an account?</span>
            <Link to="/auth/login" className="text-blue-500 hover:underline">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
