import MyCart from "@/components/user/mycart/my-cart-section";
import MyOrder from "@/components/user/myorders/my-oroder-section";
import MyReviews from "@/components/user/myreviews/my-reviews";
import MyShop from "@/components/user/myshop/my-shop-section";
import WishList from "@/components/user/wishlist/wish-list";
import React from "react";
import { AiOutlineProfile, AiOutlineUnorderedList, AiOutlineShoppingCart } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import { BsShop } from 'react-icons/bs'

const size = { size: 30 }

export const UserMenuData = [
  {
    title: 'My cart',
    icon: React.createElement(AiOutlineShoppingCart, size),
    section: React.createElement(MyCart)
  },
  {
    title: 'My orders',
    icon: React.createElement(AiOutlineProfile, size),
    section: React.createElement(MyOrder)
  },
  {
    title: 'A wish list',
    icon: React.createElement(AiOutlineUnorderedList, size),
    section: React.createElement(WishList)
  },
  {
    title: 'My reviews',
    icon: React.createElement(BiCommentDetail, size),
    section: React.createElement(MyReviews)
  },
  {
    title: 'My shop',
    icon: React.createElement(BsShop, size),
    section: React.createElement(MyShop)
  },
] as const


export const categorys = [
  {
    title: 'Pc and Laptops',
    icon: '',
    subCategory: [
      {
        title: 'Laptops'
      },
      {
        title: 'Computers, nettops, monoblocs'
      },
      {
        title: 'Monitors'
      },
      {
        title: 'CPU'
      },
      {
        title: 'GPU'
      },
      {
        title: 'Power Block'
      },
      {
        title: 'SSD'
      },
      {
        title: 'HDD'
      },
      {
        title: 'Office equipment'
      },
      {
        title: 'Software'
      },
      {
        title: 'Keyboards and mouse'
      }
    ]
  },
  {
    title: 'Smartphones, TV and Electronics',
    icon: '',
    subCategory: [
      {
        title: 'Mobile Phones'
      },
      {
        title: 'TV'
      },
      {
        title: 'Tablets'
      },
      {
        title: 'Power banks and charging stations'
      },
      {
        title: 'Headphones and accessories'
      },
      {
        title: 'Photo and Video'
      }
    ]
  },
]