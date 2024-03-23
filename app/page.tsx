import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import Searchbar from "@/components/Searchbar";
import { getAllProducts } from "@/lib/actions";
import Image from "next/image";


async function Home() {

  const allProducts = await getAllProducts()!;

  console.log("All Products", allProducts)

  return (
    <div className="mb-10">
      <section className="px-6 md:px-20 py-24 ">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Smart Shopping Starts Here:
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>
            <h1 className="head-text">
              Unleash the power of
              <span className="text-primary"> Price Tracker</span>
            </h1>
            <p className="mt-6">
              Powerful, self-serve product and growth analytics to help you
              convert, engage, and retain more. <a style={{color : "blue"}} href="https://bash.com/jewellery/metal-stones/gold-jewellery"> Get Product URL here.</a>
            </p>
            <Searchbar />
          </div>
          <HeroCarousel/>
        </div>
      </section>
      <section className="treding-section px-6 md:px-20">
        <h2 className="section-text">Trending</h2>
        <div className="flex flex-wrap gap-8 gap-y-16">
          {allProducts?.map((product: any) => (
           <ProductCard product={product} key={product._id}/>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
