import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import ApiService from '../utils/ApiService';
import { DiscountCode } from '../types';

type Props = {
  setDiscount: (discounts: any) => any;
  discounts: DiscountCode[];
};

const DiscountCodeCreate: React.FC<Props> = (props: Props) => {
  const [dollarAmount, setDollarAmount] = useState<number | ''>('');
  const [discountCode, setDiscountCode] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const postData = {
        dollarAmount: dollarAmount,
        code: discountCode,
      };

      const res = await ApiService.post('/discount-code', postData, false);
      props.setDiscount([...props.discounts, res.data]);
      setDollarAmount('');
      setDiscountCode('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Discount Code</Form.Label>
        <Form.Control
          type="text"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          isInvalid={discountCode === ''}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Dollar Amount</Form.Label>
        <Form.Control
          type="number"
          value={dollarAmount === '' ? '' : dollarAmount}
          onChange={(e) =>
            setDollarAmount(e.target.value === '' ? '' : Number(e.target.value))
          }
          isInvalid={dollarAmount === ''}
        />
      </Form.Group>

      <Button className="my-3" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default DiscountCodeCreate;
