import React from "react";
import { AiOutlineProfile, AiOutlineUnorderedList } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import { BsShop } from 'react-icons/bs'

const size = { size: 30 }

export const UserMenuData = [
  {
    title: 'My orders',
    icon: React.createElement(AiOutlineProfile, size)
  },
  {
    title: 'A wish list',
    icon: React.createElement(AiOutlineUnorderedList, size)
  },
  {
    title: 'My reviews',
    icon: React.createElement(BiCommentDetail, size)
  },
  {
    title: 'My shop',
    icon: React.createElement(BsShop, size)
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