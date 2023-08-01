import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  FormControl,
  InputGroup,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ApiService from '../utils/ApiService';
import { Product } from '../types';
import Fuse from 'fuse.js';
import { UserContext } from '../context/UserContext';
import ProductListItem from '../components/ProductListItem';

enum SortOption {
  PriceAsc = 'Price - Low to High',
  PriceDesc = 'Price - High to Low',
  AvailabilityAsc = 'Availability - Low to High',
  AvailabilityDesc = 'Availability - High to Low',
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[] | null>([]);
  const [displayProducts, setDisplayProducts] = useState<Product[] | null>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.PriceAsc);
  const { user, setUser, fetchCartItems } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await ApiService.get('/products');
      if (response.success) {
        setProducts(response.data);
        setDisplayProducts(response.data);
      } else {
        console.error(response.message);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let updatedProducts = [...(products || [])];
    if (searchTerm) {
      const fuse = new Fuse(updatedProducts, {
        keys: ['productName', 'description'],
      });
      updatedProducts = fuse.search(searchTerm).map((item) => item.item);
    }
    if (sortOption) {
      switch (sortOption) {
        case SortOption.PriceAsc:
          updatedProducts.sort((a, b) => a.price - b.price);
          break;
        case SortOption.PriceDesc:
          updatedProducts.sort((a, b) => b.price - a.price);
          break;
        case SortOption.AvailabilityAsc:
          updatedProducts.sort((a, b) => a.quantity - b.quantity);
          break;
        case SortOption.AvailabilityDesc:
          updatedProducts.sort((a, b) => b.quantity - a.quantity);
          break;
      }
    }
    setDisplayProducts(updatedProducts);
  }, [searchTerm, sortOption, products]);

  const addToCart = async (productId: number) => {
    if (!user) {
      navigate('/login');
      return;
    }

    const response = await ApiService.post('/cart/add', {
      userId: user?.id,
      productId,
      quantity: 1,
    });

    if (response.success) {
      fetchCartItems(user.id);
    } else {
      console.error(response.message);
    }
  };

  if (!displayProducts) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Container>
        <h1 className="my-5">All Products</h1>
        <Row className="mb-5">
          <Col xs={12} sm={6} md={8}>
            <InputGroup>
              <FormControl
                placeholder="Search products"
                aria-label="Search products"
                aria-describedby="basic-addon2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <DropdownButton
              variant="primary"
              id="dropdown-basic-button"
              title={`Sort By: ${sortOption}`}
            >
              {Object.values(SortOption).map((option) => (
                <Dropdown.Item
                  key={option}
                  onClick={() => setSortOption(option as SortOption)}
                >
                  {option}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
        </Row>
        <Row>
          {displayProducts.length > 0 ? (
            displayProducts.map((product) => (
              <Col
                sm={6}
                md={4}
                lg={3}
                key={product.productId}
                className="mb-4"
              >
                <ProductListItem product={product} addToCart={addToCart} />
              </Col>
            ))
          ) : (
            <p>No products found</p>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
