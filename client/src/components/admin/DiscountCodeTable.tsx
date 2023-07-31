import React from 'react';
import { DiscountCode } from '../../types';
import { Table } from 'react-bootstrap';

type Props = {
  discountCodes: DiscountCode[];
};

const DiscountCodeTable: React.FC<Props> = (props: Props) => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Discount Code</th>
            <th>Dollar Amount</th>
          </tr>
        </thead>
        <tbody>
          {props.discountCodes &&
            props.discountCodes
              .filter((discountCode) => discountCode != null)
              .map((discountCode) => {
                return (
                  <tr key={discountCode.id}>
                    <td>{discountCode.id ?? 'N/A'}</td>
                    <td>{discountCode.code ?? 'N/A'}</td>
                    <td>{`$${discountCode.dollarAmount ?? 'N/A'}`}</td>
                  </tr>
                );
              })}
        </tbody>
      </Table>
    </>
  );
};

export default DiscountCodeTable;
