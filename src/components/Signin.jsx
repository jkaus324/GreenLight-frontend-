import React, { useState } from 'react';
import axios from 'axios';
import './Signin.css';
import { Link, useNavigate } from 'react-router-dom';
import { server } from '../App';
import { useCookies } from 'react-cookie';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [, setCookie] = useCookies(['email']);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const response = await axios.post(`${server}/loginUser`, formData);

      // Set cookie
      console.log(response.data.cookie);
      setCookie('email', response.data.cookie) // Set the cookie with the received email
      
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid email or password. Please try again.'); // You can customize the error message
    }
  };

  return (
    <div className="page-content">
      <div className="form-v9-content">
        <form className="form-detail" onSubmit={handleSignIn}>
          <h2>Sign In</h2>
          <div className="form-row">
            <input
              type="text"
              name="your-email"
              id="your-email"
              className="input-text"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <input
              type="password"
              name="password"
              id="password"
              className="input-text"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="form-row-last">
            <input type="submit" name="signin" className="signin" value="Sign In" />
          </div>
          <div className='form-row-last'>
            <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignInForm;
