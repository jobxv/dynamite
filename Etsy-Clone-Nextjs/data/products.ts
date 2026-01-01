export interface ProductDetails {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  video?: string;
  variations?: {
    type: string;
    options: string[];
  }[];
  quantityAvailable: number;
  shippingInfo: {
    freeShipping?: boolean;
    countryFrom: string;
    cost: number;
    estimatedDelivery: string;
  };
  ratings: {
    average: number;
    count: number;
  };
  reviews?: {
    reviewerName: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  sellerInfo: {
    name: string;
    shopLink: string;
    location?: string;
    rating: number;
  };
  itemDetails?: {
    purpose: string;
    width: string;
    height: string;
    additionalDetail: string;
  };
  bestseller?: boolean;
}

export const productData: ProductDetails[] = [
  {
    id: 1,
    images: [
      "/mug.jpg",
      "/women-sitting.jpg",
      "/womens.jpg",
      "/dog-c.jpg",
      "/gorgeous-friend.jpg",
    ],
    video: "https://v.etsystatic.com/video/upload/ac_none,du_15,q_auto:good/file_fnbhbn.mp4",
    price: 121.24,
    originalPrice: 166.51,
    title: "Minimalist Jewelry Keychain Gold Plated Handmade",
    description: "This Keychain makes a thoughtful Minimalist Jewelry.",
    quantityAvailable: 1,
    ratings: {
      average: 3.8,
      count: 335,
    },
    reviews: [
      {
        reviewerName: "Charlie",
        rating: 5,
        comment: "I love the quality and the price of these stickers, I keep purchasing them each season.",
        date: "2023-08-23",
      },
      {
        reviewerName: "Frank",
        rating: 3,
        comment: "Love it!",
        date: "2023-05-05",
      },
      {
        reviewerName: "David",
        rating: 4,
        comment: "Fast shipping.",
        date: "2023-01-18",
      },
    ],
    sellerInfo: {
      name: "The Creative Shop",
      shopLink: "https://example.com/shop/the-creative-shop",
      location: "Sydney, Australia",
      rating: 4,
    },
    itemDetails: {
      purpose: "Daily Use",
      width: "13.3 cm",
      height: "25.5 cm",
      additionalDetail: `
      ✨SIZE & MATERIALS ✨
    
      - 1x Happy Easter Sticker Sheet (14 Stickers)
      - Size of Sheet: 9,1 x 13 cm or 10.5 x 14.8 cm
      - Printed on matte white sticker paper (not waterproof)
      - Colors may vary slightly from what you see on your screen.
      - My products are 100% handmade, which includes illustrating, printing, cutting and shipping
      - Every order includes freebies and an A6 Thank You art print🫶🏼

      💌 SHIPPING INFORMATION:

      - Plastic free packaging 🌱
      - Free basic tracking for all German orders
      - Registered mail (tracking) will be used for US, Canada and Australia
      - If you would like detailed tracking + faster shipping, you can add it at check-out 📨
      - Please check the FAQ for estimated delivery times
      - INTERNATIONAL ORDERS CAN TAKE UP TO A MONTH TO ARRIVE
    `,
    },
    bestseller: true,
    shippingInfo: {
      countryFrom: "German",
      cost: 12.34,
      estimatedDelivery: "12-24 business days",
    }
  },
  {
    id: 2,
    images: ["/dog-c.jpg", "/hero-1.jpg"],
    video:
      "https://v.etsystatic.com/video/upload/ac_none,du_15,q_auto:good/file_fnbhbn.mp4",
    price: 141.42,
    originalPrice: 215.26,
    title: "Boho Style Gemstone Custom Wall Art",
    description: "Boho and  Gemstone Wall Art.",
    variations: [
      {
        type: "Color",
        options: ["Pink", "Green", "Blue", "Red", "White"],
      },
      {
        type: "Size",
        options: ["X-Large", "Large", "Medium", "Small"],
      },
    ],
    quantityAvailable: 27,
    shippingInfo: {
      countryFrom: "United States",
      cost: 23.34,
      estimatedDelivery: "2-3 weeks",
    },
    ratings: {
      average: 3.9,
      count: 292,
    },
    reviews: [
      {
        reviewerName: "Frank",
        rating: 5,
        comment: "Love it!",
        date: "2023-03-13",
      },
      {
        reviewerName: "Frank",
        rating: 4,
        comment: "Beautiful item.",
        date: "2023-02-04",
      },
    ],
    sellerInfo: {
      name: "Artisan Goods",
      shopLink: "https://example.com/shop/artisan-goods",
      location: "Berlin, Germany",
      rating: 4
    },
    itemDetails: {
      purpose: "Collectable",
      width: "7.4 cm",
      height: "28.0 cm",
      additionalDetail: "Hypoallergenic",
    },
  },
  {
    id: 3,
    images: ["/picks.jpg"],
    video:
      "https://v.etsystatic.com/video/upload/ac_none,du_15,q_auto:good/file_fnbhbn.mp4",
    price: 60.43,
    originalPrice: 80.47,
    title: "Minimalist Jewelry Custom Mug Gold Plated",
    description: "Minimalist and  Gold Plated Mug.",
    quantityAvailable: 45,
    shippingInfo: {
      countryFrom: "United Kingdom",
      cost: 9.75,
      estimatedDelivery: "3-5 business days",
    },
    ratings: {
      average: 3.9,
      count: 440,
    },
    sellerInfo: {
      name: "Crafty Corner",
      shopLink: "https://example.com/shop/crafty-corner",
      location: "New York, USA",
      rating: 3
    },
    itemDetails: {
      purpose: "Decoration",
      width: "15.4 cm",
      height: "22.9 cm",
      additionalDetail: "Hypoallergenic",
    },
  },
  {
    id: 4,
    images: ["/gorgeous-friend.jpg", "/women-sitting.jpg"],
    price: 184.97,
    title: "Bracelet Elegant Gold Plated Boho Style",
    description: "This Bracelet makes a thoughtful Boho Style.",
    quantityAvailable: 73,
    ratings: {
      average: 4.8,
      count: 373,
    },
    reviews: [
      {
        reviewerName: "Eve",
        rating: 4,
        comment: "Seller was great.",
        date: "2023-11-25",
      },
      {
        reviewerName: "Eve",
        rating: 4,
        comment: "Highly recommend.",
        date: "2023-06-25",
      },
    ],
    sellerInfo: {
      name: "Artisan Goods",
      shopLink: "https://example.com/shop/artisan-goods",
      location: "Sydney, Australia",
      rating: 0
    },
    shippingInfo: {
      countryFrom: "Ethiopia",
      cost: 21.34,
      estimatedDelivery: "4-6 business days",
    }
  },
  {
    id: 5,
    images: ["/mug.jpg"],
    price: 240.36,
    originalPrice: 323.04,
    title: "Minimalist Scarf",
    description:
      "A beautiful Scarf crafted with care. Perfect for any occasion.",
    quantityAvailable: 46,
    shippingInfo: {
      countryFrom: "Australia",
      cost: 5.29,
      estimatedDelivery: "Varies",
    },
    ratings: {
      average: 3.6,
      count: 493,
    },
    sellerInfo: {
      name: "The Creative Shop",
      shopLink: "https://example.com/shop/the-creative-shop",
      location: "London, UK",
      rating: 0
    },
    itemDetails: {
      purpose: "Gift",
      width: "1.4 cm",
      height: "9.0 cm",
      additionalDetail: "Water resistant",
    },
  },
  {
    id: 6,
    images: ["/women-sitting.jpg", "/womens.jpg"],
    price: 15.48,
    title: "Artisan Earrings Boho Style",
    description:
      "A beautiful Earrings crafted with care. Perfect for any occasion.",
    quantityAvailable: 3,
    shippingInfo: {
      countryFrom: "United Kingdom",
      cost: 20.49,
      estimatedDelivery: "3-5 business days",
    },
    ratings: {
      average: 4.7,
      count: 176,
    },
    reviews: [
      {
        reviewerName: "Frank",
        rating: 5,
        comment: "Great quality.",
        date: "2023-07-10",
      },
      {
        reviewerName: "Frank",
        rating: 5,
        comment: "Beautiful item.",
        date: "2023-01-12",
      },
      {
        reviewerName: "Frank",
        rating: 5,
        comment: "Exactly as pictured.",
        date: "2023-02-05",
      },
      {
        reviewerName: "David",
        rating: 4,
        comment: "Would buy again.",
        date: "2023-05-27",
      },
      {
        reviewerName: "Alice",
        rating: 3,
        comment: "Beautiful item.",
        date: "2023-07-26",
      },
    ],
    sellerInfo: {
      name: "The Creative Shop",
      shopLink: "https://example.com/shop/the-creative-shop",
      location: "New York, USA",
      rating: 0
    },
  },
  {
    id: 7,
    images: ["/gorgeous-friend.jpg", "/women-sitting.jpg"],
    video:
      "https://v.etsystatic.com/video/upload/ac_none,du_15,q_auto:good/file_fnbhbn.mp4",
    price: 47.84,
    originalPrice: 57.77,
    title: "Chunky Print Everyday Wear Wooden",
    description: "This Print makes a thoughtful Everyday Wear.",
    quantityAvailable: 83,
    shippingInfo: {
      countryFrom: "Canada",
      cost: 9.66,
      estimatedDelivery: "3-5 business days",
    },
    ratings: {
      average: 4.2,
      count: 198,
    },
    reviews: [
      {
        reviewerName: "Grace",
        rating: 4,
        comment: "Great quality.",
        date: "2023-12-07",
      },
      {
        reviewerName: "David",
        rating: 5,
        comment: "Seller was great.",
        date: "2023-02-22",
      },
      {
        reviewerName: "Grace",
        rating: 3,
        comment: "Beautiful item.",
        date: "2023-06-01",
      },
      {
        reviewerName: "Eve",
        rating: 4,
        comment: "Highly recommend.",
        date: "2023-05-27",
      },
    ],
    sellerInfo: {
      name: "Handmade Treasures",
      shopLink: "https://example.com/shop/handmade-treasures",
      location: "Toronto, Canada",
      rating: 0
    },
  },
  {
    id: 8,
    images: ["/detail-1.jpg", "/detail-2.jpg", "/discover.jpg"],
    price: 138.1,
    originalPrice: 188.64,
    title: "Home Decor Wall Art Chunky",
    description: "This Wall Art makes a thoughtful Home Decor.",
    quantityAvailable: 66,
    ratings: {
      average: 4.2,
      count: 361,
    },
    sellerInfo: {
      name: "Artisan Goods",
      shopLink: "https://example.com/shop/artisan-goods",
      location: "New York, USA",
      rating: 0
    },
    itemDetails: {
      purpose: "Decoration",
      width: "12.0 cm",
      height: "20.0 cm",
      additionalDetail: "Made to order",
    },
    shippingInfo: {
      countryFrom: "USA",
      cost: 2.34,
      estimatedDelivery: "1-2 business days",
    }
  },
  {
    id: 9,
    images: ["/picks.jpg"],
    price: 121.11,
    originalPrice: 157.5,
    title: "Glass Print Boho Style Elegant",
    description: "This Print makes a thoughtful Boho Style.",
    quantityAvailable: 80,
    shippingInfo: {
      countryFrom: "Canada",
      cost: 23.8,
      estimatedDelivery: "1-2 weeks",
    },
    ratings: {
      average: 4.5,
      count: 102,
    },
    reviews: [
      {
        reviewerName: "Alice",
        rating: 4,
        comment: "Fast shipping.",
        date: "2023-09-15",
      },
      {
        reviewerName: "Grace",
        rating: 5,
        comment: "Love it!",
        date: "2023-09-14",
      },
      {
        reviewerName: "Charlie",
        rating: 4,
        comment: "Exactly as pictured.",
        date: "2023-06-28",
      },
    ],
    sellerInfo: {
      name: "Unique Finds",
      shopLink: "https://example.com/shop/unique-finds",
      location: "Sydney, Australia",
      rating: 0
    },
    itemDetails: {
      purpose: "Decoration",
      width: "9.5 cm",
      height: "8.1 cm",
      additionalDetail: "Water resistant",
    },
  },
  {
    id: 10,
    images: ["/g-neckless.jpg", "/jewlary-on-hand.jpg"],
    price: 53.44,
    originalPrice: 69.89,
    title: "Necklace Resin Custom",
    description: "Add a touch of Custom style to your home with this Necklace.",
    quantityAvailable: 54,
    shippingInfo: {
      countryFrom: "United Kingdom",
      cost: 18.63,
      estimatedDelivery: "1-2 weeks",
    },
    ratings: {
      average: 4.3,
      count: 249,
    },
    sellerInfo: {
      name: "Artisan Goods",
      shopLink: "https://example.com/shop/artisan-goods",
      rating: 0
    },
    itemDetails: {
      purpose: "Decoration",
      width: "14.6 cm",
      height: "18.1 cm",
      additionalDetail: "Made to order",
    },
  },
  {
    id: 11,
    images: ["/dog-c.jpg", "/hero-1.jpg"],
    price: 210.72,
    originalPrice: 232.76,
    title: "Personalized Metal Journal",
    description:
      "Add a touch of Personalized style to your home with this Journal.",
    variations: [
      {
        type: "Color",
        options: ["Pink", "Green", "White", "Red", "Black"],
      },
    ],
    quantityAvailable: 55,
    shippingInfo: {
      countryFrom: "Canada",
      cost: 22.43,
      estimatedDelivery: "3-5 business days",
    },
    ratings: {
      average: 3.7,
      count: 295,
    },
    reviews: [
      {
        reviewerName: "Grace",
        rating: 2,
        comment: "Love it!",
        date: "2023-05-12",
      },
      {
        reviewerName: "Grace",
        rating: 4,
        comment: "Beautiful item.",
        date: "2023-04-02",
      },
      {
        reviewerName: "Frank",
        rating: 2,
        comment: "Great quality.",
        date: "2023-05-07",
      },
    ],
    sellerInfo: {
      name: "Crafty Corner",
      shopLink: "https://example.com/shop/crafty-corner",
      location: "London, UK",
      rating: 0
    },
    itemDetails: {
      purpose: "Collectable",
      width: "2.6 cm",
      height: "17.0 cm",
      additionalDetail: "Made to order",
    },
  },
  {
    id: 12,
    images: ["/detail-1.jpg", "/detail-2.jpg", "/discover.jpg"],
    video:
      "https://v.etsystatic.com/video/upload/ac_none,du_15,q_auto:good/file_fnbhbn.mp4",
    price: 91.88,
    originalPrice: 132.63,
    title: "Ethical Everyday Wear Print",
    description: "Unique quality Print with a Ethical design.",
    quantityAvailable: 95,
    shippingInfo: {
      countryFrom: "Canada",
      cost: 6.16,
      estimatedDelivery: "2-3 weeks",
    },
    ratings: {
      average: 4.2,
      count: 368,
    },
    sellerInfo: {
      name: "Handmade Treasures",
      shopLink: "https://example.com/shop/handmade-treasures",
      location: "Toronto, Canada",
      rating: 0
    },
  },
  {
    id: 13,
    images: ["/hero-1.jpg", "/hero-11.jpg", "/hero-2.jpg"],
    price: 70.88,
    originalPrice: 95.84,
    title: "Earrings Handmade",
    description:
      "A beautiful Earrings crafted with care. Perfect for any occasion.",
    variations: [
      {
        type: "Color",
        options: ["Pink", "Blue"],
      },
      {
        type: "Size",
        options: ["Small", "X-Large"],
      },
    ],
    quantityAvailable: 22,
    shippingInfo: {
      countryFrom: "Germany",
      cost: 20.03,
      estimatedDelivery: "1-2 weeks",
    },
    ratings: {
      average: 3.6,
      count: 274,
    },
    sellerInfo: {
      name: "Artisan Goods",
      shopLink: "https://example.com/shop/artisan-goods",
      location: "London, UK",
      rating: 0
    },
  },
  {
    id: 14,
    images: ["/gorgeous-friend.jpg", "/women-sitting.jpg"],
    price: 145.59,
    title: "Earrings Glass Wedding Gift Artisan",
    description: "A beautiful Earrings crafted with care. Perfect for any occasion.",
    quantityAvailable: 63,
    ratings: {
      average: 3.7,
      count: 209,
    },
    sellerInfo: {
      name: "Crafty Corner",
      shopLink: "https://example.com/shop/crafty-corner",
      location: "Sydney, Australia",
      rating: 0
    },
    shippingInfo: {
      countryFrom: "russia",
      cost: 12.34,
      estimatedDelivery: "after 1-2 business days",
    }
  },
  {
    id: 15,
    images: ["/gorgeous-friend.jpg", "/women-sitting.jpg"],
    price: 26.58,
    title: "Candle Boho Glass",
    description: "This Candle makes a thoughtful special gift.",
    quantityAvailable: 55,
    shippingInfo: {
      countryFrom: "Canada",
      cost: 24.49,
      estimatedDelivery: "2-3 weeks",
    },
    ratings: {
      average: 4.3,
      count: 401,
    },
    sellerInfo: {
      name: "Artisan Goods",
      shopLink: "https://example.com/shop/artisan-goods",
      location: "New York, USA",
      rating: 0
    },
  },
  {
    id: 16,
    images: ["/dog-c.jpg", "/hero-1.jpg"],
    video:
      "https://v.etsystatic.com/video/upload/ac_none,du_15,q_auto:good/file_fnbhbn.mp4",
    price: 38.16,
    originalPrice: 47.29,
    title: "Sustainable Everyday Wear Clay Keychain",
    description:
      "Add a touch of Sustainable style to your home with this Keychain.",
    quantityAvailable: 5,
    shippingInfo: {
      countryFrom: "Canada",
      cost: 9.07,
      estimatedDelivery: "2-3 weeks",
    },
    ratings: {
      average: 4.5,
      count: 147,
    },
    reviews: [
      {
        reviewerName: "David",
        rating: 3,
        comment: "Exactly as pictured.",
        date: "2023-06-02",
      },
      {
        reviewerName: "David",
        rating: 4,
        comment: "Beautiful item.",
        date: "2023-03-17",
      },
      {
        reviewerName: "Bob",
        rating: 3,
        comment: "Would buy again.",
        date: "2023-06-22",
      },
    ],
    sellerInfo: {
      name: "Crafty Corner",
      shopLink: "https://example.com/shop/crafty-corner",
      location: "Toronto, Canada",
      rating: 0
    },
    itemDetails: {
      purpose: "Daily Use",
      width: "4.5 cm",
      height: "2.4 cm",
      additionalDetail: "Dishwasher safe",
    },
  },
  {
    id: 17,
    images: ["/picks.jpg"],
    video: "https://v.etsystatic.com/video/upload/ac_none,du_15,q_auto:good/file_fnbhbn.mp4",
    price: 138.09,
    originalPrice: 217.09,
    title: "Glass Keychain Vintage",
    description: "Add a touch of Vintage style to your home with this Keychain.",
    quantityAvailable: 9,
    ratings: {
      average: 4.9,
      count: 444,
    },
    reviews: [
      {
        reviewerName: "Charlie",
        rating: 5,
        comment: "Fast shipping.",
        date: "2023-02-11",
      },
    ],
    sellerInfo: {
      name: "Crafty Corner",
      shopLink: "https://example.com/shop/crafty-corner",
      location: "Berlin, Germany",
      rating: 0
    },
    shippingInfo: {
      countryFrom: "australia",
      cost: 0,
      estimatedDelivery: "12-24 business days",
    }
  },
  {
    id: 18,
    images: ["/mug.jpg"],
    price: 169.23,
    originalPrice: 248.0,
    title: "Mug Minimalist Jewelry Artisan Resin",
    description: "This Mug makes a thoughtful Minimalist Jewelry.",
    quantityAvailable: 66,
    shippingInfo: {
      countryFrom: "Germany",
      cost: 14.25,
      estimatedDelivery: "Varies",
    },
    ratings: {
      average: 3.7,
      count: 489,
    },
    reviews: [
      {
        reviewerName: "David",
        rating: 4,
        comment: "Highly recommend.",
        date: "2023-01-22",
      },
    ],
    sellerInfo: {
      name: "Handmade Treasures",
      shopLink: "https://example.com/shop/handmade-treasures",
      location: "Sydney, Australia",
      rating: 0
    },
    itemDetails: {
      purpose: "Daily Use",
      width: "11.8 cm",
      height: "1.7 cm",
      additionalDetail: "Water resistant",
    },
  },
  {
    id: 19,
    images: ["/dog-c.jpg", "/hero-1.jpg"],
    price: 194.93,
    originalPrice: 311.61,
    title: "Wall Art Minimalist",
    description: "This Wall Art makes a thoughtful special gift.",
    quantityAvailable: 24,
    shippingInfo: {
      countryFrom: "United Kingdom",
      cost: 12.6,
      estimatedDelivery: "1-2 weeks",
    },
    ratings: {
      average: 4.8,
      count: 44,
    },
    sellerInfo: {
      name: "Handmade Treasures",
      shopLink: "https://example.com/shop/handmade-treasures",
      location: "London, UK",
      rating: 0
    },
  },
  {
    id: 20,
    images: ["/picks.jpg"],
    price: 183.29,
    title: "Print Boho",
    description: "Unique quality Print with a Boho design.",
    variations: [
      {
        type: "Style",
        options: ["D", "B", "C"],
      },
    ],
    quantityAvailable: 55,
    shippingInfo: {
      countryFrom: "United States",
      cost: 20.54,
      estimatedDelivery: "2-3 weeks",
    },
    ratings: {
      average: 3.8,
      count: 499,
    },
    sellerInfo: {
      name: "Unique Finds",
      shopLink: "https://example.com/shop/unique-finds",
      location: "Toronto, Canada",
      rating: 0
    },
    itemDetails: {
      purpose: "Collectable",
      width: "18.3 cm",
      height: "7.6 cm",
      additionalDetail: "Made to order",
    },
  },
];
