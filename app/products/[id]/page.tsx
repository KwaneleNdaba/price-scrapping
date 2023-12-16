import HeroCarousel from "@/components/HeroCarousel";
import Modal from "@/components/Modal";
import PriceInfoCard from "@/components/PriceInfoCard";
import ProductCard from "@/components/ProductCard";
import { getProductById, getSimilarProducts } from "@/lib/actions";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  params: { id: string };
};

async function Productdetails({ params: { id } }: Props) {
  const product: Product = await getProductById(id);

  if (!product) redirect("/");

  const similarProduct = await getSimilarProducts(id);

  return (
    <div className="product-container">
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="product-image">
          <HeroCarousel images={product.image} />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex justify-between item-start flex-wrap pb-6 gap-5">
            <p className="text-[20px] text-secondary font-semibold ">
              {product.title}
            </p>
            <Link
              className="text-base text-black opacity-50"
              target="_blank"
              href={product.url}
            >
              Visit Product
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="product-hearts">
              <Image
                src="/assets/icons/red-heart.svg"
                alt="heart"
                width={20}
                height={20}
              />
              <p className="text-base font-semibold text-[#D46F77">
                {product.reviewsCount}
              </p>
            </div>
            <div className="p-2 bg-white-200 rounded-10">
              <Image
                src="/assets/icons/bookmark.svg"
                alt="bookmark"
                width={20}
                height={20}
              />
            </div>
            <div className="p-2 bg-white-200 rounded-10">
              <Image
                src="/assets/icons/share.svg"
                alt="share"
                width={20}
                height={20}
              />
            </div>
          </div>
          <div className="product-info">
            <div className="flex flex-col gap-2">
              <p className="text-[34px] text-secondary font-bold">
                {product.currency} {product.currentPrice.toFixed(2)}
              </p>
              <p className="text-[21px] text-secondary font-bold line-through">
                {product.currency} {product.originalPrice.toFixed(2)}
                <p className="text-l text-red-500">
                  <span className="text-primary-red font-semibold">
                    -{product.discountRate}%
                  </span>
                </p>
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="product-stars">
                  <Image
                    src="/assets/icons/star.svg"
                    alt="start"
                    width={16}
                    height={16}
                  />
                  <p className="text-sm text-primary-orange font-semibold">4</p>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 bg-white-200 rounded-[27px]">
                <Image
                  src="/assets/icons/comment.svg"
                  alt="comment"
                  width={16}
                  height={16}
                />
                <p>{product.reviewsCount}</p> Reviews
              </div>
            </div>
            <p className="text-sm -text-black opacity-50">
              <span className="text-primary-green font-semibold">93%</span> of
              buyers have recommended this
            </p>
          </div>
          <div className="my-7 flex flex-col gap-5">
            <div className="flex gap-5 flex-wrap">
              <PriceInfoCard
                title="Current Price"
                iconSrc="/assets/icons/price-tag.svg"
                value={`${product.currency} ${product.currentPrice.toFixed(2)}`}
                borderColor="#b6dbff"
              />
              <PriceInfoCard
                title="Average Price"
                iconSrc="/assets/icons/chart.svg"
                value={`${product.currency} ${product.averagePrice.toFixed(2)}`}
                borderColor="#b6dbff"
              />
              <PriceInfoCard
                title="Hightest Price"
                iconSrc="/assets/icons/arrow-up.svg"
                value={`${product.currency} ${product.highestPrice.toFixed(2)}`}
                borderColor="#b6dbff"
              />
              <PriceInfoCard
                title="Lowest Price"
                iconSrc="/assets/icons/arrow-down.svg"
                value={`${product.currency} ${product.lowestPrice.toFixed(2)}`}
                borderColor="#BEFFC5"
              />
            </div>
          </div>
          <Modal productId={id}/>
        </div>
   
      </div>
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-5 ">
          <h3 className="text-xl text-secondary font-semibold">
            Product Description
          </h3>
          <div className="flex flex col gap-4">
            {product.description?.split("/n")}
          </div>
        </div>
        <button className="py-4 px-4 bg-black hover:bg-opacity-70 rounded-[30px] text-white text-lg font-semibold w-fit mx-auto flex items-center justify-center gap-3 min-w-[200px]">
          <Image
            src="/assets/icons/bag.svg"
            width={22}
            height={22}
            alt="check"
          />
          <Link href="/" className="text-base text-white">
            Buy Now
          </Link>
        </button>
      </div>
      {similarProduct && similarProduct?.length > 0 && (
        <div className="py-14 flex flex-col gap-2 w-full ">
          <p className="section-text">Similar Products</p>
          <div className="flex flex-col gap-10 mt-7 w-full">
            {similarProduct.map((product: Product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Productdetails;
