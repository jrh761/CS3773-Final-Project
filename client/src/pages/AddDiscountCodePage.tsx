import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import DiscountCodeCreate from '../components/DiscountCodeCreate';
import GetDiscount from '../components/GetDiscount';
import { DiscountCode } from '../types';
import ApiService from '../utils/ApiService';

const AddDiscountCodePage: React.FC = () => {
  const [discounts, setDiscount] = useState<DiscountCode[]>([]);

  useEffect(() => {
    const fetchDiscounts = async () => {
      const response = await ApiService.get('/discount-code');
      setDiscount(response.data);
    };

    fetchDiscounts();
  }, []);

  return (
    <div>
      <h1>Add discount code</h1>
      <Container>
        <Row>
          <Col className="col-lg-4">
            <DiscountCodeCreate 
              setDiscount={setDiscount}
              discounts={discounts}
            />
          </Col>
          <Col className="col-lg-1">
          </Col>
          <Col className="col-lg-6">
            <GetDiscount discounts={discounts} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddDiscountCodePage;
