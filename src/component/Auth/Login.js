import React, {useState} from 'react';
import './Login.css';

import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';

export default function Login({setActiveForm}) {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value});
  };

  return (
    <Form>
      <Form.Group className="mb-3 form-group">
        <Form.Label>Username</Form.Label>
        <Form.Control
          required
          type="email"
          name="email"
          placeholder="doe@gmail.com"
          value={inputs.email}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3 form-group">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          type="password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Check label="Remember me" />
      <Button className="form-control mt-3 button" type="submit">
        Login
      </Button>
      <div className="mt-3 d-flex flex-column align-items-end" style={{width: '100%'}}>
        <Button variant="link" onClick={() => setActiveForm('register')}>
          Sign Up?{' '}
        </Button>
        <Button variant="link" href="/forget-password">
          Forget Password?{' '}
        </Button>
      </div>
    </Form>
  );
}
