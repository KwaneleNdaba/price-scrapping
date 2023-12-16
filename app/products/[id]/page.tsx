import HeroCarousel from "@/components/HeroCarousel";
import { getProductById } from "@/lib/actions";
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
          </div>
          <div className="product-info">
            <div className="flex flex-col gap-2">
              <p className="text-[34px] text-secondary font-bold">
                {product.currency} {product.currentPrice}
              </p>
              <p className="text-[21px] text-secondary font-bold line-through">
                {product.currency} {product.originalPrice}
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

              <div className="">
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
            <span className="text-primary-green font-semibold">93%</span> of buyers have recommended this
          </p>
          </div>
         <div className="my-7 flex flex-col gap-5">
          <div className="flex gap-5 flex-wrap">
            
          </div>
         </div>
        </div>
      </div>
    </div>
  );
}

export default Productdetails;
