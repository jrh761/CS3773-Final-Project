import React, { useState } from 'react';
import { Table, Modal } from 'react-bootstrap';
import { DiscountCode } from '../types';

type Props = {
    discounts: DiscountCode[];
};

const GetDiscount: React.FC<Props> = (props: Props) => {
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {props.discounts &&
                      props.discounts.map((discount) =>{
                    
                      return(
                            <tr key={discount.code}>
                                <td>{discount.code}</td>
                                <td>${discount.dollarAmount}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
}

export default GetDiscount