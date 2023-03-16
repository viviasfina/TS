export const fakeProductDetailResp = {
  productName: 'Laptop',
  price: '10000',
  categoryName: 'Electronic',
  variantName: 'Size',
  name: 'Hot',
  priceDifference: '5000',
};

export const fakeProductDetailResult = [
  {
    productName: 'Laptop',
    price: 10000,
    categoryName: 'Electronic',
    variantName: 'Available-in',
    name: 'Hot',
    priceDifference: 5000,
  },
  {
    productName: 'Laptop',
    price: 10000,
    categoryName: 'Electronic',
    variantName: 'Available-in',
    name: 'Ice',
    priceDifference: 3000,
  },
];

export const fakeProductDetailResp2 = {
  productName: 'Laptop',
  price: 10000,
  categoryName: 'Electronic',
  variants: [
    {
      name: 'Available-in',
      options: [
        {
          name: 'Hot',
          priceDifference: 5000,
        },
        {
          name: 'Ice',
          priceDifference: 3000,
        },
      ],
    },
  ],
};
