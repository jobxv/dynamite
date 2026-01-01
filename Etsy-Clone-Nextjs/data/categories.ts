import { ProductDetails } from "./products";

interface Category {
  id: string;
  name: string;
  image: string;
  link: string;
}
export interface categoryDataProps {
  title: string;
  subtitle: string;
  categories: Category[];
  featuredProducts: ProductDetails[];
}

export const categoryData: categoryDataProps[] = [
  {
    title: "Accessories",
    subtitle: "Scarves, hats, and hair accessories that tie it all together",
    categories: [
      {
        id: "hair-accessories",
        name: "Hair Accessories",
        image: "/earings.jpg",
        link: "/category/hair-accessories",
      },
      {
        id: "scarves-wraps",
        name: "Scarves & Wraps",
        image: "/earings.jpg",
        link: "/category/scarves-wraps",
      },
      {
        id: "hats-caps",
        name: "Hats & Caps",
        image: "/earings.jpg",
        link: "/category/hats-caps",
      },
      {
        id: "keychains-lanyards",
        name: "Keychains & Lanyards",
        image: "/earings.jpg",
        link: "/category/keychains-lanyards",
      },
      {
        id: "sunglasses-eyewear",
        name: "Sunglasses & Eyewear",
        image: "/earings.jpg",
        link: "/category/sunglasses-eyewear",
      },
      {
        id: "patches-pins",
        name: "Patches & Pins",
        image: "/earings.jpg",
        link: "/category/patches-pins",
      },
      {
        id: "belts-suspenders",
        name: "Belts & Suspenders",
        image: "/earings.jpg",
        link: "/category/belts-suspenders",
      },
      {
        id: "gloves-mittens",
        name: "Gloves & Mittens",
        image: "/earings.jpg",
        link: "/category/gloves-mittens",
      },
      {
        id: "wallets-money-clips",
        name: "Wallets & Money Clips",
        image: "/earings.jpg",
        link: "/category/wallets-money-clips",
      },
      {
        id: "umbrellas-rain-accessories",
        name: "Umbrellas & Rain Accessories",
        image: "/earings.jpg",
        link: "/category/umbrellas-rain-accessories",
      },
      {
        id: "tech-accessories",
        name: "Tech Accessories",
        image: "/earings.jpg",
        link: "/category/tech-accessories",
      },
      {
        id: "ties-bow-ties",
        name: "Ties & Bow Ties",
        image: "/earings.jpg",
        link: "/category/ties-bow-ties",
      },
      {
        id: "keyrings-lanyards",
        name: "Keyrings & Lanyards",
        image: "/earings.jpg",
        link: "/category/keyrings-lanyards",
      },
      {
        id: "face-masks-coverings",
        name: "Face Masks & Coverings",
        image: "/earings.jpg",
        link: "/category/face-masks-coverings",
      },
      {
        id: "other-accessories",
        name: "Other Accessories",
        image: "/earings.jpg",
        link: "/category/other-accessories",
      },
    ],
    featuredProducts: [
      {
        id: 1,
        title:
          "Personalized Initial Heart Keychain Set, Initials Couple Keychain",
        description:
          "A lovely heart-shaped keychain set personalized with initials, perfect for couples.",
        price: 9.08,
        originalPrice: 18.17,
        images: ["/hat.jpg"],
        quantityAvailable: 100,
        shippingInfo: {
          freeShipping: true,
          countryFrom: "USA",
          cost: 0,
          estimatedDelivery: "5-7 business days",
        },
        ratings: {
          average: 4.5,
          count: 4226,
        },
        sellerInfo: {
          name: "CROSSBODYCASE",
          shopLink: "/product/1",
          rating: 4.9,
        },
        bestseller: true,
      },
      {
        id: 2,
        title:
          "Custom Name Keychain, Personalized Keychain, Gift for Her, Gift for Him",
        description:
          "A custom name keychain, an ideal personalized gift for any occasion.",
        price: 12.99,
        originalPrice: 19.99,
        images: ["/hat.jpg"],
        quantityAvailable: 150,
        shippingInfo: {
          freeShipping: true,
          countryFrom: "UK",
          cost: 0,
          estimatedDelivery: "3-5 business days",
        },
        ratings: {
          average: 4.8,
          count: 2187,
        },
        sellerInfo: {
          name: "CustomGiftShop",
          shopLink: "/product/2",
          rating: 4.95,
        },
        bestseller: true,
      },
      {
        id: 3,
        title:
          "Leather Keychain with Initial, Monogram Keyring, Personalized Gift",
        description:
          "Elegant leather keychain featuring monogrammed initials, a thoughtful gift option.",
        price: 15.5,
        images: ["/earings.jpg"],
        quantityAvailable: 75,
        shippingInfo: {
          countryFrom: "Germany",
          cost: 5,
          estimatedDelivery: "7-10 business days",
        },
        ratings: {
          average: 4.7,
          count: 1856,
        },
        sellerInfo: {
          name: "LeatherCraftCo",
          shopLink: "/product/3",
          rating: 4.85,
        },
        bestseller: true,
      },
      {
        id: 4,
        title: "Mini Macrame Keychain, Boho Bag Charm, Car Accessory",
        description:
          "A mini macrame keychain with boho charm, perfect for bags and cars.",
        price: 8.25,
        originalPrice: 11.0,
        images: ["/earings.jpg"],
        quantityAvailable: 200,
        shippingInfo: {
          countryFrom: "India",
          cost: 3,
          estimatedDelivery: "10-14 business days",
        },
        ratings: {
          average: 4.3,
          count: 942,
        },
        sellerInfo: {
          name: "BohoMacrameCrafts",
          shopLink: "/product/4",
          rating: 4.75,
        },
      },
      {
        id: 5,
        title: "Resin Keychain with Dried Flowers, Nature Inspired Gift",
        description:
          "Beautiful resin keychain with dried flowers, inspired by nature.",
        price: 14.95,
        images: ["/hat.jpg"],
        quantityAvailable: 120,
        shippingInfo: {
          countryFrom: "Canada",
          cost: 0,
          estimatedDelivery: "4-6 business days",
        },
        ratings: {
          average: 4.9,
          count: 3105,
        },
        sellerInfo: {
          name: "NatureResinArt",
          shopLink: "/product/5",
          rating: 4.98,
        },
        bestseller: true,
      },
      {
        id: 6,
        title: "Wooden Name Keychain, Custom Engraved Keyring",
        description:
          "Engraved wooden name keychain, a timeless and customizable gift.",
        price: 10.5,
        originalPrice: 15.0,
        images: ["/hat.jpg"],
        quantityAvailable: 90,
        shippingInfo: {
          countryFrom: "Australia",
          cost: 2,
          estimatedDelivery: "8-12 business days",
        },
        ratings: {
          average: 4.6,
          count: 1278,
        },
        sellerInfo: {
          name: "WoodenCraftHouse",
          shopLink: "/product/6",
          rating: 4.88,
        },
      },
    ],
  },
  {
    title: "Jewelry",
    subtitle: "Unique handcrafted jewelry for every style and occasion",
    categories: [
      {
        id: "necklaces",
        name: "Necklaces",
        image: "/placeholder.svg?height=200&width=200",
        link: "/category/necklaces",
      },
      {
        id: "earrings",
        name: "Earrings",
        image: "/placeholder.svg?height=200&width=200",
        link: "/category/earrings",
      },
      {
        id: "bracelets",
        name: "Bracelets",
        image: "/placeholder.svg?height=200&width=200",
        link: "/category/bracelets",
      },
      {
        id: "rings",
        name: "Rings",
        image: "/placeholder.svg?height=200&width=200",
        link: "/category/rings",
      },
      {
        id: "body-jewelry",
        name: "Body Jewelry",
        image: "/placeholder.svg?height=200&width=200",
        link: "/category/body-jewelry",
      },
      {
        id: "jewelry-sets",
        name: "Jewelry Sets",
        image: "/placeholder.svg?height=200&width=200",
        link: "/category/jewelry-sets",
      },
    ],
    featuredProducts: [
      {
        id: 7,
        title: "Minimalist Gold Necklace, Dainty Chain Necklace",
        description:
          "A dainty gold necklace with a minimalist design, perfect for everyday wear or special occasions.",
        price: 24.99,
        originalPrice: 39.99,
        images: ["/placeholder.svg?height=200&width=200"],
        quantityAvailable: 120,
        shippingInfo: {
          countryFrom: "USA",
          cost: 0,
          estimatedDelivery: "5-7 business days",
        },
        ratings: {
          average: 4.8,
          count: 3562,
        },
        sellerInfo: {
          name: "MinimalistJewelryCo",
          shopLink: "/product/7",
          rating: 4.92,
        },
        bestseller: true,
      },
      {
        id: 8,
        title: "Birthstone Bracelet, Personalized Gift for Her",
        description:
          "A personalized bracelet with birthstones, an ideal and thoughtful gift for her.",
        price: 18.75,
        originalPrice: 25.0,
        images: ["/placeholder.svg?height=200&width=200"],
        quantityAvailable: 150,
        shippingInfo: {
          countryFrom: "Canada",
          cost: 2,
          estimatedDelivery: "7-10 business days",
        },
        ratings: {
          average: 4.7,
          count: 2841,
        },
        sellerInfo: {
          name: "GemstoneJewelry",
          shopLink: "/product/8",
          rating: 4.89,
        },
        bestseller: true,
      },
    ],
  },
];
