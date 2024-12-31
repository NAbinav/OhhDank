import { NextApiRequest, NextApiResponse } from 'next';

const products = [
  { id: '1', name: 'Product 1', imgSrc: '/images/product1.jpg', description: 'Description for product 1', price: 100 },
  { id: '2', name: 'Product 2', imgSrc: '/images/product2.jpg', description: 'Description for product 2', price: 200 },
  // Add more products as needed
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const product = products.find((product) => product.id === id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
}
