export const products = {
  fruits: [
    {
      id: '1',
      name: 'Fresh Mangoes',
      price: 299,
      rating: 4.5,
      image: '/images/mango.jpg',
      description: 'Alphonso mangoes from Maharashtra',
      category: 'fruits'
    },
    // Add 20-30 items
  ],
  electronics: [
    {
      id: '101',
      name: 'Wireless Headphones',
      price: 1999,
      rating: 4.8,
      image: '/images/headphones.jpg',
      description: 'Noise cancelling Bluetooth headphones',
      category: 'electronics'
    },
    // Add more items
  ]
} as const;