// RegisterFormV9.js

import React from 'react';
import './Signin.css';

function RegisterFormV9() {
  return (
    <div className="page-content">
      <div className="form-v9-content">
        <form className="form-detail" action="#" method="post">
          <h2>Registration Form</h2>
          <div className="form-row-total">
            <div className="form-row">
              <input type="text" name="full-name" id="full-name" className="input-text" placeholder="Your Name" required />
            </div>
            <div className="form-row">
              <input type="text" name="your-email" id="your-email" className="input-text" placeholder="Your Email" required pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}" />
            </div>
          </div>
          <div className="form-row-total">
            <div className="form-row">
              <input type="password" name="password" id="password" className="input-text" placeholder="Your Password" required />
            </div>
            <div className="form-row">
              <input type="password" name="comfirm-password" id="comfirm-password" className="input-text" placeholder="Confirm Password" required />
            </div>
          </div>
          <div className="form-row-last">
            <input type="submit" name="register" className="register" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterFormV9;
