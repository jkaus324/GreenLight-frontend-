import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { server } from '../App';

const Classroom = () => {
  const currentUrl = window.location.pathname;
  const parts = currentUrl.split('/');
  const classCode = parts[parts.length - 1];
  const [isHost, setIsHost] = useState(false);

  const [studentList, setStudentList] = useState([
    {
      id: 1002,
      name: 'Gunnish',
      present: false
    },
    {
      id: 1001,
      name: 'Jatin',
      present: true
    }
  ]);

  useEffect(() => {
    const response = axios.get(`${server}/classroom/:${classCode}`,{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }) // check if link is valid
      .then(response => {
        setStudentList(response?.data?.studentList);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  },[])

  const handleCheckboxChange = (index) => {
    const updatedStudentList = [...studentList];
    updatedStudentList[index].present = !updatedStudentList[index].present;
    setStudentList(updatedStudentList);
  };

  const saveAttendance = () => {
    axios.post(`${server}/updateAttendance`, studentList,{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
      .then(response => {
        console.log('Attendance updated successfully');
      })
      .catch(error => {
        console.error('Error updating attendance: ', error);
      });
  };

  function checkCookie(cookieName) {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(cookieName + '=')) {
        return cookie.substring(cookieName.length + 1);
      }
    }

    return null;
  }

  const myCookieValue = checkCookie('myCookie');
  if (myCookieValue) {
    console.log('Found cookie value:', myCookieValue);
    // check if the user is the host or not


  } else {
    console.log('Cookie not found');
  }


  return (
    <div>
      <h1>Classroom: {classCode}</h1>

      <h2>Student List: </h2>
      <ul>
        {studentList?.map((student, index) => (
          <li key={student.id}>
            <span>{student.name}</span>
            <input
              type="checkbox"
              disabled={!isHost}
              name="present"
              checked={student.present}
              onChange={() => handleCheckboxChange(index)}
            />
          </li>
        ))}
      </ul>

      <button disabled={!isHost} onClick={saveAttendance}>Save Attendance</button>

      <h2>Attendance: </h2>
      <ul>
        {studentList?.map(student => (
          <li key={student.id}>
            {student.name} {student.present ? "Present" : "Absent"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Classroom;
