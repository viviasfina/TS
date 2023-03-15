export class ApiResponsesDTO {
  data: [
    {
      id: string;
      createdAt: string;
      updatedAt: string;
      isSelling: boolean;
      storehubId: string;
      name: string;
      description: string;
      descriptionLocale: string;
      shortDescription: string;
      shortDescriptionLocale: string;
      sku: string;
      tags: [];
      fakePrice: any;
      cost: any;
      image: any;
      outOfStock: boolean;
      productOrder: any;
      _lang: {
        name: {
          'en-US': string;
          'id-ID': string;
        };
        description: {
          'en-US': string;
          'id-ID': string;
        };
        shortDescription: {
          'en-US': string;
          'id-ID': string;
        };
      };
      sic: string;
      slug: string;
      isAvailableForDelivery: boolean;
      normalPrice: number;
      bundleDiscount: any;
      isBundle: boolean;
      bundle: [];
      isRecommended: boolean;
      category: {
        id: string;
        createdAt: string;
        updatedAt: string;
        categoryName: string;
        categoryOrder: number;
        isVisible: boolean;
        _lang: {
          categoryName: {
            'en-US': string;
          };
        };
        consumptionType: string;
      };
      variants: [];
      availability: boolean;
      price: number;
      displayPrice: number;
      displayNormalPrice: number;
      availabilityBool: boolean;
    },
  ];
}
