import React from 'react';
import Login from '../components/Login';
import { Card } from 'react-bootstrap';

const RegisterPage: React.FC = () => {
  return (
    <Card className="col-lg-6 col-md-10 col-sm-12 mx-auto">
      <div className="px-5 py-5">
        <h1>Login</h1>
      </div>
      <Login />
    </Card>
  );
};

export default RegisterPage;
