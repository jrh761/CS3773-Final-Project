import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import ApiService from '../../utils/ApiService';
import { DiscountCode } from '../../types';

type Props = {
  setDiscountCodes: (discountCodes: any) => any;
  discountCodes: DiscountCode[];
  showToastSuccess: (message: string) => void;
  showToastError: (message: string) => void;
};

const DiscountCodeForm: React.FC<Props> = (props: Props) => {
  const [dollarAmount, setDollarAmount] = useState<number | ''>('');
  const [discountCode, setDiscountCode] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    if (dollarAmount === '' || discountCode === '') {
      return;
    }

    try {
      const postData = {
        dollarAmount: dollarAmount,
        code: discountCode,
      };

      const response = await ApiService.post('/discount-code', postData, false);

      if (response.status === 409) {
        props.showToastError('Discount code already exists');
      } else {
        props.showToastSuccess(
          `Discount code ${discountCode} successfully created`,
        );
        props.setDiscountCodes([...props.discountCodes, response.data]);
      }

      setSubmitted(false);
      clearForm();
    } catch (err: any) {
      console.error(err);
      props.showToastError('An error occurred.');
    }
  };

  const clearForm = () => {
    setDiscountCode('');
    setDollarAmount('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="my-2" controlId="discountCode">
        <Form.Label>Discount Code *</Form.Label>
        <Form.Control
          type="text"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          isInvalid={submitted && discountCode === ''}
        />
      </Form.Group>
      <Form.Group className="my-2" controlId="dollarAmount">
        <Form.Label>Dollar Amount *</Form.Label>
        <Form.Control
          type="number"
          value={dollarAmount === '' ? '' : dollarAmount}
          onChange={(e) =>
            setDollarAmount(e.target.value === '' ? '' : Number(e.target.value))
          }
          isInvalid={submitted && dollarAmount === ''}
        />
        <Form.Control.Feedback type="invalid">
          Dollar Amount is required.
        </Form.Control.Feedback>
      </Form.Group>

      <Button className="my-2" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default DiscountCodeForm;
