import Me from "@/components/user/me/me";
import MyCart from "@/components/user/mycart/my-cart-section";
import MyOrder from "@/components/user/myorders/my-oroder-section";
import MyReviews from "@/components/user/myreviews/my-reviews";
import MyShop from "@/components/user/myshop/my-shop-section";
import WishList from "@/components/user/wishlist/wish-list";
import React from "react";
import { AiOutlineProfile, AiOutlineUnorderedList, AiOutlineShoppingCart, AiOutlineAppstore } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import { BsShop } from 'react-icons/bs'

const menuSize = { size: 25 }
const userMenuSize = { size: 30 }

export const iS = {
  homePriceState: { min: 0, max: 999999 },
  homeSortState: { sortBy: '', orderBy: '' },
}

export const MenuData = [
  {
    title: 'Cart',
    icon: React.createElement(AiOutlineShoppingCart, menuSize),
  },
  {
    title: 'Catalog',
    icon: React.createElement(AiOutlineAppstore, menuSize),
  }
] as const

export const UserMenuData = [
  {
    title: 'Me',
    icon: React.createElement(AiOutlineAppstore, userMenuSize),
    section: React.createElement(Me)
  },
  {
    title: 'My cart',
    icon: React.createElement(AiOutlineShoppingCart, userMenuSize),
    section: React.createElement(MyCart)
  },
  {
    title: 'My orders',
    icon: React.createElement(AiOutlineProfile, userMenuSize),
    section: React.createElement(MyOrder)
  },
  {
    title: 'A wish list',
    icon: React.createElement(AiOutlineUnorderedList, userMenuSize),
    section: React.createElement(WishList)
  },
  {
    title: 'My reviews',
    icon: React.createElement(BiCommentDetail, userMenuSize),
    section: React.createElement(MyReviews)
  },
  {
    title: 'My shop',
    icon: React.createElement(BsShop, userMenuSize),
    section: React.createElement(MyShop)
  },
] as const

export const sortMenuData = [
  {
    title: 'Descending price',
    field: 'actual_price',
    type: 'desc',
  },
  {
    title: 'Price ascending',
    field: 'actual_price',
    type: 'asc'
  },
  {
    title: 'By discount',
    field: 'discount',
    type: 'desc'
  },
] as const

export const mainCategorys = [
  {
    title: 'Laptops and computers',
    groups: [
      {
        title: 'Popular',
        subCategory: [
          {
            title: 'Laptops',
          },
          {
            title: 'Computers, nettops, monoblocs',
          },
          {
            title: 'Monitors',
          },
          {
            title: 'Cables and adapters',
          },
        ]
      },
      {
        title: 'Computer components',
        subCategory: [
          {
            title: 'SSD'
          },
          {
            title: 'Cooling systems'
          },
          {
            title: 'Video cards'
          },
          {
            title: 'RAM'
          },
          {
            title: 'Processors'
          },
          {
            title: 'Motherboards'
          },
          {
            title: 'Hard drives'
          },
          {
            title: 'Power supply units'
          },
        ]
      },
      {
        title: 'Network equipment',
        subCategory: [
          {
            title: 'Routers'
          },
          {
            title: 'Switches'
          },
          {
            title: 'Network adapters'
          },
          {
            title: 'Passive network equipment'
          },
          {
            title: 'Wi-Fi hotspotst'
          },
          {
            title: 'Wi-Fi signal repeaters'
          },
          {
            title: 'Patch cords'
          },
        ]
      },
      {
        title: 'Headphones and accessories',
        subCategory: [
          {
            title: 'Headphone'
          },
          {
            title: 'TWS'
          },
          {
            title: 'Gaming headsets'
          },
          {
            title: 'Vacuum headphones'
          },
          {
            title: 'Earbuds'
          },
          {
            title: 'On-ear headphones'
          },
          {
            title: 'Full-size headphoness'
          },
          {
            title: 'Amplifiers for headphones'
          },
          {
            title: 'Accessories for headphones'
          },
        ]
      },
      {
        title: 'Keyboards and mice',
        subCategory: [
          {
            title: 'Computer mice'
          },
          {
            title: 'Mouse mats'
          },
          {
            title: 'Keyboards'
          },
          {
            title: 'Keyboard and mouse sets'
          },
          {
            title: 'Accessories for keyboards and mice'
          },
        ]
      },
      {
        title: 'Accessories for electronics',
        subCategory: [
          {
            title: 'USB flash drives'
          },
          {
            title: 'Hubs and card readers'
          },
          {
            title: 'Accessories for PCs and laptops'
          },
          {
            title: 'Accessories for laptops'
          },
          {
            title: 'Network filters'
          },
          {
            title: 'Cases and keyboards for tablets'
          },
          {
            title: 'Bags, backpacks and laptop cases'
          },
          {
            title: 'Cleaning products'
          },
        ]
      },
      {
        title: 'Office equipment',
        subCategory: [
          {
            title: ' Printers and BFP'
          },
          {
            title: 'Scanners'
          },
          {
            title: 'Consumables for printers'
          },
          {
            title: 'Blackboards, flipcharts'
          },
        ]
      },
      {
        title: 'Other',
        subCategory: [
          {
            title: 'Acoustic systems',
          },
          {
            title: 'Software',
          },
          {
            title: 'Graphics tablets',
          },
          {
            title: 'Microphones',
          },
          {
            title: 'Server equipment',
          },
          {
            title: 'Interactive equipment',
          },
        ]
      }
    ]
  },
  {
    title: 'Smartphones, TV and electronics',
    groups: [
      {
        title: 'Popular',
        subCategory: [
          {
            title: 'Mobile Phones',
          },
          {
            title: 'Televisions',
          },
          {
            title: 'Tablets',
          },
          {
            title: 'Power banks and charging stations',
          },
        ]
      },
      {
        title: 'Headphones and accessories',
        subCategory: [
          {
            title: 'Headphone'
          },
          {
            title: 'Amplifiers for headphones'
          },
          {
            title: 'Accessories for headphones'
          },
        ]
      },
      {
        title: 'Wearable gadgets',
        subCategory: [
          {
            title: 'Smart watches'
          },
          {
            title: 'Fitness bracelets'
          },
          {
            title: 'Virtual reality glasses'
          },
          {
            title: 'Accessories for smart watches and trackers'
          },
        ]
      },
      {
        title: 'Audio equipment',
        subCategory: [
          {
            title: 'Portable speakers'
          },
          {
            title: 'Music centers'
          },
          {
            title: 'Computer speakers'
          },
          {
            title: 'Home cinemas'
          },
        ]
      },
      {
        title: 'Photo and Video',
        subCategory: [
          {
            title: 'Photo/video accessories'
          },
          {
            title: 'Cameras'
          },
          {
            title: 'Memory cards'
          },
          {
            title: 'Digital video cameras'
          },
          {
            title: 'Lenses for cameras'
          },
          {
            title: 'Studio light'
          },
          {
            title: 'Backgrounds for the studio'
          }
        ]
      },
      {
        title: 'Accessories for mobile phones',
        subCategory: [
          {
            title: 'Cables and adapters'
          },
          {
            title: 'Phone cases'
          },
          {
            title: 'Protective films and glass'
          },
          {
            title: 'Spare parts for phones'
          },
          {
            title: 'Phone chargers'
          },
          {
            title: 'Batteries for phones'
          },
          {
            title: 'Mobile communication and Internet'
          },
          {
            title: 'Phone holders'
          },
          {
            title: 'Sharing stations'
          },
        ]
      },
      {
        title: 'Accessories for TVs',
        subCategory: [
          {
            title: 'Antennas'
          },
          {
            title: 'Receivers'
          },
          {
            title: 'Mounts for TVs'
          },
          {
            title: 'Media players'
          },
          {
            title: 'Remote controls'
          },
          {
            title: 'TV tuners'
          }
        ]
      },
      {
        title: 'Portable electronics',
        subCategory: [
          {
            title: 'E-books'
          },
          {
            title: 'MP3 players'
          },
          {
            title: 'Recorders'
          },
          {
            title: 'Docking stations'
          },
          {
            title: 'Accessories for electronic books'
          },
        ]
      },
      {
        title: 'Projection equipment',
        subCategory: [
          {
            title: 'Projectors'
          },
          {
            title: 'Laser pointers'
          },
          {
            title: 'Screens for projectors'
          },
          {
            title: 'Interactive boards'
          },
        ]
      },
    ]
  },
]


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