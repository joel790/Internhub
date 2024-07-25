import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [fetchUser, setFetchUser] = useState({});
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/profile');
        if (response.status === 200) {
          const userData = response.data;
          setFetchUser(userData);
          setForm({
            name: userData.name,
            email: userData.email,
            password: '', // leave empty for security reasons
          });
          setPhoto(userData.photo);
        } else {
          console.log('Unable to fetch user data');
        }
      } catch (error) {
        setMessage('Failed to fetch user data');
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const uploadFileHandler = (event) => {
    setPhoto(event.target.files[0]);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('password', form.password);
    if (photo) {
      formData.append('photo', photo);
    }

    setLoading(true);
    setMessage('');
    setSuccess(false);

    try {
      const response = await axios.post('http://localhost:5000/api/users/updateprofile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        setSuccess(true);
        setMessage('Profile updated successfully');
      } else {
        setMessage('Failed to update profile');
      }
    } catch (error) {
      console.error('There was an error updating the profile', error);
      setMessage('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
      {message && (
        <div className={`p-4 mb-4 text-sm ${success ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}>
          {message}
        </div>
      )}
      <form onSubmit={submitHandler} className="space-y-4">
        <div className="flex flex-col gap-4 w-full sm:w-full md:w-full">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div className="flex flex-col gap-4 w-full sm:w-full md:w-full">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div className="flex flex-col gap-4 w-full sm:w-full md:w-full">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter a new password"
            value={form.password}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div className="flex flex-col gap-4 w-full sm:w-full md:w-full">
          <label className="block text-sm font-medium text-gray-700">Photo</label>
          <input
            type="file"
            onChange={uploadFileHandler}
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Profile;