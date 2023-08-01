import React, {useState} from "react"
import { Product, User } from '../types';
import { Link, useNavigate } from "react-router-dom";
import { Container,Button,Stack,Col,Image } from 'react-bootstrap'
import ApiService from '../utils/ApiService';
import { Buffer } from 'buffer'

type Props = {
    product : Product;
    addToCart: (productId: number) => void;
}

const ProductDisplay: React.FC<Props> = ({product, addToCart}) => {
    const navigate = useNavigate();

    const image =
    product.photo &&
    product.photo.data &&
    `data:${product.photo.type};base64,${Buffer.from(
      product.photo.data,
    ).toString('base64')}`;

    const imageUrl = image || '/placeholder.png';

    return(
        <Container className="border-bottom border-top">
            <Col
                key={product.productId}
                className="py-2 mb-8"
                >
                <Link to={`/product/${product.productId}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="row product">
                        <div className="col-md-2" key={product.productId}>
                                <Image src={imageUrl} className="img-thumbnail" rounded/>
                        </div>
                        <div className="col-md-8">
                                <h4 className="text-truncate">{product.productName}</h4>
                                {product.description.length > 200 ? (
                                    <text> {product.description.substring(0,197)}... </text>
                                ):(
                                    <text> {product.description} </text>
                                )}
                        </div>
                        <div className="col-md-2">
                            <Stack gap={5} >
                                <h4 className="mx-auto">${product.price}</h4>
                                <Button className="mx-auto"
                                    variant="primary"
                                    size="sm"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        addToCart(product.productId);
                                    }}
                                >
                                    Add to Cart
                                </Button>
                            </Stack>
                        </div>
                    </div>
                </Link>
            </Col>
        </Container>
    );
}

export default ProductDisplay;