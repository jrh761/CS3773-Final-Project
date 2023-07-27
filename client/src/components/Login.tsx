import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ApiService from '../utils/ApiService';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await ApiService.post('/users/login', {
      username,
      password,
    });

    if (response.success) {
      setUser(response.data);
      navigate('/');
    } else {
      setError(response.message);
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
            onChange={(e) => {
              setError('');
              setUsername(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => {
              setError('');
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <div className="float-end py-2">
          <span>
            Don't have an account? <Link to="/register">Register here.</Link>
          </span>
        </div>
        <div>
          <Button className="my-4" variant="primary" type="submit">
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
