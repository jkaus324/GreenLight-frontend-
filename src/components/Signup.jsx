import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios'
import {Link,useNavigate} from 'react-router-dom';
import { server } from '../App';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error,setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => { 
    e.preventDefault();
    setError('');
    console.log({ username, email, password, confirmPassword, photo });
    try {
      const isMatching = (password === confirmPassword)
      if(!isMatching){
        throw new Error("Enter matching passwords");  // check if error is to be used this way
      }

      const response = await axios.get(`${server}/registerUser`, {
        username,email,password,photo
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });

      console.log(response.data);
      navigate('/dashboard');
      
    } catch (err) {
      setError(err);
      console.log(error);
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
          <h2>Registration Form</h2>
          <div className="form-row-total">
            <div className="form-row">
              <input
                type="text"
                name="username"
                id="username"
                className="input-text"
                placeholder="Your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-row">
              <input
                type="email"
                name="your-email"
                id="your-email"
                className="input-text"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
              />
            </div>
          </div>
          <div className="form-row-total">
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
            <div className="form-row">
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                className="input-text"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <label htmlFor="photo">Upload Photo:</label>
            <input
              type="file"
              accept="image/*"
              name="photo"
              id="photo"
              onChange={handlePhotoChange}
              required
            />
          </div>
          <div className="form-row-last">
            <input type="submit" name="register" className="register" value="Register" />
          </div>
          <div>
            <p>Already have an account? <Link to='/signin'>Sign In</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
