"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface HeroCarouselProps {
  images?: any;
}

const heroImages = [
  "/assets/images/hero-1.svg",

  "/assets/images/hero-2.svg",
  "/assets/images/hero-3.svg",

  "/assets/images/hero-4.svg",

  "/assets/images/hero-5.svg",
];

const HeroCarousel: React.FC<HeroCarouselProps> = ({ images = heroImages }) => {
  const pathname = usePathname();
  console.log("pathanme", pathname);

  return (
    <div className="hero-carousel">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showStatus={false}
      >
        {images.map((image: any,index:number) => (
          <Image
            className="object-contains"
            src={image}
            key ={index}
            alt="image"
            width={484}
            height={484}
          />
        ))}
      </Carousel>
      {pathname === "/" && (
        <Image
          src="/assets/icons/hand-drawn-arrow.svg"
          alt="arrow"
          width={175}
          height={175}
          className="max-xl:hidden absolute -left-[15%] bottom-0 z-0"
        />
      )}
    </div>
  );
};

export default HeroCarousel;
