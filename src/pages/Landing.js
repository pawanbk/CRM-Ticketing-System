import React, { useState } from 'react';
import Login from '../component/Auth/Login';
import Register from '../component/Auth/Register';
import './Landing.css';
import CardBody from 'react-bootstrap/CardBody';
import Card from 'react-bootstrap/Card';

export default function Landing() {

  const [activeForm, setActiveForm] = useState('login');

  return (
    <div className="container">
      <Card>
        <CardBody>
          <Card.Title className='align-center mb-4 title'>Welcome to Ticketing System</Card.Title>
          { activeForm === 'login' && 
            <Login setActiveForm = {setActiveForm} /> 
          }
          { activeForm === 'register' &&
            <Register setActiveForm = {setActiveForm} />
          }
        </CardBody>
      </Card>
    </div>
  );
}
