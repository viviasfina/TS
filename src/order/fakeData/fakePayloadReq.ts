import { ProductPayloadDTO } from 'src/DTOes/ProductPayloadDTO.class';

export const fakePayloadReq: ProductPayloadDTO = {
  discount: 20000,
  paymentAmount: 16000,
  items: [
    {
      productId: 1,
      productName: 'Laptop',
      price: 16000,
      category: {
        name: 'Essentials',
        description: 'Essentials',
      },
      variants: [
        {
          variantName: 'Available-in',
          options: [
            {
              name: 'Hot',
              priceDifference: 5000,
              isSelected: false,
            },
          ],
        },
      ],
    },
  ],
};

export const fakePayloadReq2: ProductPayloadDTO = {
  discount: 5000,
  paymentAmount: 16000,
  items: [
    {
      productId: 1,
      productName: 'Laptop',
      price: 16000,
      category: {
        name: 'Essentials',
        description: 'Essentials',
      },
      variants: [
        {
          variantName: 'Available-in',
          options: [
            {
              name: 'Hot',
              priceDifference: 5000,
              isSelected: true,
            },
          ],
        },
      ],
    },
  ],
};
