import Btn from '@/components/buttons/btn'
import ImageComponent from '@/components/images/image-component'
import { Product } from '@prisma/client'
import { TfiEmail } from 'react-icons/tfi'
import ProductPrice from '@/components/product/product-price'
import ProductCartHadnler from '@/components/product/product-cart-handler'
import ShopService from '@/services/services'
import UserReview from '@/components/product/user-review'
import Reviews from '@/components/product/reviews'

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
            <div className='flex flex-col w-full border border-maincolor-950/30 dark:border-maincolor-50/30 rounded'>
              <div className='flex flex-row items-center justify-between p-2 border-b border-maincolor-950/30 dark:border-maincolor-50/30'>
                <span>
                  Customer: {product.ownerId}
                </span>
                <Btn>
                  <TfiEmail size={30} />
                </Btn>
              </div>
              <div className='flex flex-col gap-2 p-2'>
                <ProductPrice price={product.price} discount={product.discount} actual_price={product.actual_price} />
                <ProductCartHadnler id={product.id} />
              </div>
            </div>
          </div>
        </div>
        <span className='w-full'>
          {product.description}
        </span>
        <span>{product?.reviews && `${product.reviews.length} reviews`}</span>
        <UserReview id={params.id} reviews={product.reviews} />
        <Reviews reviews={product.reviews} />
      </div>
    </div>
  )
}