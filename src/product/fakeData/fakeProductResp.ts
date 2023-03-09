import { ProductDetailDTO } from 'src/DTOes/ProductDetailDTO.class';

export const fakeProductResp = {
  id: 1,
  productName: 'Laptop',
  price: 10000,
  position: 0,
  categoryName: 'Electronic',
};

export const fakeProductDetailResp: ProductDetailDTO = {
  productName: 'Latte',
  price: 16000,
  categoryName: 'Essentials',
  variants: [],
};

export const fakeProductRespWrongPrice = {
  id: 1,
  productName: 'Laptop',
  price: 20000,
  position: 0,
  categoryName: 'Electronic',
};
