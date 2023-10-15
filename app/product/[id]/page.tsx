import Btn from '@/components/buttons/btn'
import ImageComponent from '@/components/images/image-component'
import { Product } from '@prisma/client'
import { TfiEmail } from 'react-icons/tfi'
import ProductPrice from '@/components/product/product-price'
import ProductCartHadnler from '@/components/product/product-cart-handler'
import ShopService from '@/services/services'

export default async function Product({ params }: { params: { id: string } }) {

  const { data: product } = await ShopService.getProductById(params.id)


  return (
    <div className='w-full h-full flex jusitfy-center items-center'>
      <div className='w-full h-full break-words p-4 flex flex-col gap-2 overflow-y-auto'>
        <div className='flex flex-col lg:flex-row gap-2 items-center lg:items-start'>
          <ImageComponent images={product.images} />
          <div className='flex flex-col gap-2 flex-1 justify-start w-full'>
            <span className='font-semibold lg:text-xl xl:text-2xl'>
              {product.name}
            </span>
            <div className='flex flex-col sm:flex-row w-full justify-between'>
              <span>
                Rating: 5/5
              </span>
              <span>
                Code: {product.id}
              </span>
            </div>
            <div className='flex flex-col w-full border border-maincolor-100 rounded-lg'>
              <div className='flex flex-row items-center justify-between px-2 py-4 border-b border-b-maincolor-100'>
                <span>
                  Customer: {product.ownerId}
                </span>
                <Btn className='bg-maincolor-100'>
                  <TfiEmail size={30} />
                </Btn>
              </div>
              <div className='flex flex-col gap-2 px-2 py-4'>
                <ProductPrice price={product.price} discount={product.discount} actual_price={product.actual_price} />
                <ProductCartHadnler id={product.id} />
              </div>
            </div>
          </div>
        </div>
        <span className='w-full'>
          {product.description}
        </span>
      </div>
    </div>
  )
}
