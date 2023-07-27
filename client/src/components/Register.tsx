import React, { useContext, useState } from 'react';
import { Form, Button, Alert, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ApiService from '../utils/ApiService';
import { UserContext } from '../context/UserContext';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    const response = await ApiService.post('/users/register', {
      username,
      password,
    });

    if (response.status === 409) {
      setError('Username is already taken');
    } else {
      setUser(response.data);
      navigate('/');
    }
  };

  return (
    <div className="px-5">
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group className="pb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="py-2 float-end">
          <span>
            Already have an account? <Link to="/login">Login here.</Link>
          </span>
        </div>
        <div>
          <Button className="my-4" variant="primary" type="submit">
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Register;
