import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import DiscountCodeCreate from '../components/DiscountCodeCreate';
// import ApiService from '../utils/ApiService';

const AddDiscountCodePage: React.FC = () => {
  return (
    <div>
      <h1>Add discount code</h1>
      <Container>
        <Row>
          <Col>
            <DiscountCodeCreate />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddDiscountCodePage;
