import {
  IconShirt,
  IconCrown,
  IconSunglasses,
  IconShoe,
  IconHome,
  IconDeviceGamepad,
  IconPuzzle,
  IconTent,
  IconPhoto,
  IconBrush
} from '@tabler/icons-react';

export const preferenceSections = [
  {
    title: "Clothing",
    key: "clothing",
    icon: IconShirt,
    options: [
      { key: "mens", title: "Men's" },
      { key: "womens", title: "Women's" },
      { key: "childrens", title: "Children's"}
    ]
  },
  {
    title: "Types of Clothing",
    key: "typesOfClothing",
    icon: IconCrown,
    options: [
      { key: "casual", title: "Casual" },
      { key: "formal", title: "Formal" },
      { key: "sportswear", title: "Sportswear" },
      { key: "vintage", title: "Vintage" }
    ]
  },
  {
    title: "Accessories",
    key: "accessories",
    icon: IconSunglasses,
    options: [
      { key: "jewelry", title: "Jewelry" },
      { key: "watches", title: "Watches" },
      { key: "bags", title: "Bags" },
      { key: "scarves", title: "Scarves" }
    ]
  },
  {
    title: "Footwear",
    key: "footwear",
    icon: IconShoe,
    options: [
      { key: "sneakers", title: "Sneakers" },
      { key: "dressShoes", title: "Dress Shoes" },
      { key: "boots", title: "Boots" },
      { key: "sandals", title: "Sandals" }
    ]
  },
  {
    title: "Home Goods",
    key: "homeGoods",
    icon: IconHome,
    options: [
      { key: "furniture", title: "Furniture" },
      { key: "decor", title: "Decor" },
      { key: "kitchenware", title: "Kitchenware" },
      { key: "linens", title: "Linens" }
    ]
  },
  {
    title: "Entertainment",
    key: "entertainment",
    icon: IconDeviceGamepad,
    options: [
      { key: "books", title: "Books" },
      { key: "games", title: "Games" },
      { key: "dvds", title: "DVDs" },
      { key: "vinylRecords", title: "Vinyl Records" },
      { key: "electronics", title: "Electronics" }
    ]
  },
  {
    title: "Toys & Hobbies",
    key: "toysAndHobbies",
    icon: IconPuzzle,
    options: [
      { key: "actionFigures", title: "Action Figures" },
      { key: "puzzles", title: "Puzzles" },
      { key: "craftSupplies", title: "Craft Supplies" },
      { key: "musicalInstruments", title: "Musical Instruments" }
    ]
  },
  {
    title: "Outdoor & Sporting Goods",
    key: "outdoorAndSportingGoods",
    icon: IconTent,
    options: [
      { key: "campingEquipment", title: "Camping Equipment" },
      { key: "fitnessEquipment", title: "Fitness Equipment" },
      { key: "bicycles", title: "Bicycles" },
      { key: "waterSports", title: "Water Sports" }
    ]
  },
  {
    title: "Art & Collectibles",
    key: "artAndCollectibles",
    icon: IconPhoto,
    options: [
      { key: "paintings", title: "Paintings" },
      { key: "sculptures", title: "Sculptures" },
      { key: "vintageCollectibles", title: "Vintage Collectibles" },
      { key: "antiques", title: "Antiques" }
    ]
  },
  {
    title: "Beauty & Personal Care",
    key: "beautyAndPersonalCare",
    icon: IconBrush,
    options: [
      { key: "skincareProducts", title: "Skincare Products" },
      { key: "makeup", title: "Makeup" },
      { key: "haircareProducts", title: "Haircare Products" },
      { key: "perfumes", title: "Perfumes" }
    ]
  },
];
