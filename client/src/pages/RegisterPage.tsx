import React from 'react';
import Register from '../components/Register';
import { Card } from 'react-bootstrap';

const RegisterPage: React.FC = () => {
  return (
    <Card className="col-lg-6 col-md-10 col-sm-12 mx-auto">
      <div className="px-5 py-5">
        <h1>Create an account</h1>
      </div>
      <Register />
    </Card>
  );
};

export default RegisterPage;
