import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Toast } from 'react-bootstrap';
import DiscountCodeForm from '../components/admin/DiscountCodeForm';
import DiscountCodeTable from '../components/admin/DiscountCodeTable';
import { DiscountCode } from '../types';
import ApiService from '../utils/ApiService';

const AddDiscountCodePage: React.FC = () => {
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const fetchDiscountCodes = async () => {
      const response = await ApiService.get('/discount-code');
      setDiscountCodes(response.data);
    };

    fetchDiscountCodes();
  }, []);

  return (
    <div>
      <h1>Add discount code</h1>
      <Container>
        <Row>
          <Col className="col-lg-3">
            <DiscountCodeForm
              setDiscountCodes={setDiscountCodes}
              discountCodes={discountCodes}
              showToastSuccess={(message: string) => {
                setToastMessage(message);
                setShowSuccessToast(true);
                setShowErrorToast(false);
              }}
              showToastError={(message: string) => {
                setToastMessage(message);
                setShowErrorToast(true);
                setShowSuccessToast(false);
              }}
            />
          </Col>
          <Col className="col-lg-9">
            <DiscountCodeTable discountCodes={discountCodes} />
          </Col>
        </Row>
      </Container>

      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          padding: '10px',
          width: '300px',
          zIndex: 10,
        }}
      >
        <Toast
          onClose={() => setShowSuccessToast(false)}
          show={showSuccessToast}
          delay={3000}
          autohide
          className="bg-success text-white"
        >
          <Toast.Header>
            <strong className="me-auto">Discount Code Creation</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>

        <Toast
          onClose={() => setShowErrorToast(false)}
          show={showErrorToast}
          delay={3000}
          autohide
          className="bg-danger text-white"
        >
          <Toast.Header>
            <strong className="me-auto">Discount Code Creation</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </div>
    </div>
  );
};

export default AddDiscountCodePage;
