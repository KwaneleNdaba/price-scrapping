import { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function ProductCard({product}:{product:Product}) {
  return (
    <Link href={`/products/${product._id}`} className='product-card'>
        <div className='product-card_img-container'>
            <Image
            src={product.image[0]}
            alt={product.title}
            width={200}
            height={200}
            className='product-card_img'
            />
        </div>
        <div className="flex flex-col gap-3">
            <h4 className="product-title">
                {product.title}
            </h4>
            <div className="flex justify-between">
                <p className='text-black opacity-50 text-sm capitalize'>
                    {product.category}
                </p>
                <p className='text-black text-sm font-semibold'>
                    <span>
                        {product?.currency}
                    </span>

                    <span>
                        {(product?.currentPrice).toFixed(2)}
                    </span>
                </p>
            </div>
        </div>
    </Link>
  )
}

export default ProductCard
