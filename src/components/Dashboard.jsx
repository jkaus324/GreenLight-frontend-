import React from 'react'
import './Dashboard.css'

const Dashboard = () => {
  return (
    <div className='Container'>
      <div className='sections'>
        <p className='sectionHeading'>Join Classroom</p>
        <input type="text" placeholder='Enter code' className='input'/>
        <button className='buttons'>Join</button>
      </div>
      <div className='sections'>
        <span className='sectionHeading'>Create Classroom</span>
        <button className='buttons'>Create</button>
      </div>
    </div>
  )
}

export default Dashboard