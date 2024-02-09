import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav>
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#features">Features</a></li>
          <li><Link to="/signin">Get Started</Link></li> {/* Replace "Contact" with Link to sign-in page */}
        </ul>
      </nav>
      
      {/* Main content */}
      <section id="about">
        <h1>Welcome to our Attendance System</h1>
        <p>Transforming attendance tracking with face recognition technology.</p>
      </section>
      
      {/* Features */}
      <section id="features">
        <h2>Key Features</h2>
        <ul>
          <li>Automated attendance tracking using face recognition</li><br></br>
          <li>User-friendly interface for both teachers and students</li><br></br>
          <li>Real-time attendance monitoring and reporting</li>
        </ul>
      </section>
      
      {/* Get Started button */}
      <section id="get-started">
        <Link to="/signin" className="get-started-btn">Get Started</Link>
      </section>
      
      {/* Footer */}
      <footer>
        <p>&copy; 2024 Attendance System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
