import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { server } from '../App';
import { useCookies } from 'react-cookie'; // Import the useCookies hook

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [, setCookie] = useCookies(['email']); // Initialize the useCookies hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log({ username, email, password, confirmPassword, photo });
    try {
      const isMatching = password === confirmPassword;
      if (!isMatching) {
        throw new Error('Passwords do not match');
      }

      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('photo', photo);

      const response = await axios.post(`${server}/registerUser`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data.cookie);
      setCookie('email', response.data.cookie); // Set the cookie after successful registration
      navigate('/dashboard');

    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  return (
    <div className="page-content">
      <div className="form-v9-content">
        <form className="form-detail" onSubmit={handleSubmit}>
          {/* Form fields */}
        </form>
      </div>
    </div>
  );
}

export default Signup;
