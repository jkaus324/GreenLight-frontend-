import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { server } from '../App';

const Dashboard = () => {
  const [joinedClasses, setJoinedClasses] = useState([]);
  const [createdClasses, setCreatedClasses] = useState([]);
  const email = localStorage.getItem('email');
  const [classCode, setClassCode] = useState('');
  const [className, setClassName] = useState('');

  useEffect(() => {
    axios.get(`${server}/getDashboardDetails`, {
      params: {
        email: email
      }
    })
    .then(response => {
      setJoinedClasses(response.data.joinedClasses);
      setCreatedClasses(response.data.createdClasses);
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
    });
  }, [email]); 

  async function joinSubmitHandler(e) {
    e.preventDefault();

    try {
      const response = await axios.post('/joinClassroom', { classCode },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
      console.log('Successfully joined classroom with code:', classCode);
      setJoinedClasses(response.data.joinedClasses);  // change the name from demo to response.data.name
    } catch (error) {
      console.error('Error joining classroom: ', error);
    }
  }

  async function createSubmitHandler(e) {
    e.preventDefault();

    try {
      const response = await axios.post('/createClassroom', { className });
      console.log('Successfully created classroom with name:', className);
      setCreatedClasses(response.data.createdClasses);
    } catch (error) {
      console.error('Error creating classroom: ', error);
    }
  }

  function handleCodeInputChange(event) {
    setClassCode(event.target.value);
  }

  function handleNameInputChange(event) {
    setClassName(event.target.value);
  }

  return (
    <div className='Container'>
      <div className='sections'>
        <p className='sectionHeading'>Join Classroom</p>
        <input
          type="text"
          placeholder='Enter code'
          className='input'
          value={classCode}
          onChange={handleCodeInputChange}
        />
        <button className='buttons' onClick={joinSubmitHandler}>Join</button>
        <div>
          <h3>Joined Classes: </h3>
          <ul>
            {joinedClasses?.map(classItem => (
              <li key={classItem.id}>{classItem.id}  {classItem.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className='sections'>
        <p className='sectionHeading'>Create Classroom</p>
        <input
          type="text"
          placeholder='Enter class name'
          className='input'
          value={className}
          onChange={handleNameInputChange}
        />
        <button className='buttons' onClick={createSubmitHandler}>Create</button>
        <div>
          <h3>Created Classes:</h3>
          <ul>
            {createdClasses?.map(classItem => (
              <li key={classItem.id}>{classItem.id}  {classItem.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
