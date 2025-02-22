import React from 'react'
import { TECarousel, TECarouselItem } from "tw-elements-react";
import Products from './Products';
function Home() {
  return (
    <>
      <TECarousel showControls showIndicators ride="carousel" className='m-2'>
        <div className="relative w-full h-[246.46px] overflow-hidden after:clear-both after:block after:content-['']">
          <TECarouselItem
            itemID={1}
            className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
          >
            <img
              src="https://res.cloudinary.com/dieioqzty/image/upload/v1739460703/ecommerce/zwfoatmkaljoyyoaushp.jpg"
              className="block w-full h-[246.46px] object-cover"
              alt="..."
            />
            <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
              {/* <h5 className="text-xl">First slide label</h5>
              <p>
                Some representative placeholder content for the first slide.
              </p> */}
            </div>
          </TECarouselItem>
          <TECarouselItem
            itemID={2}
            className="relative float-left hidden -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
          >
            <img
              src="https://res.cloudinary.com/dieioqzty/image/upload/v1739460806/ecommerce/unmoqccbf0sahmhqpk7b.webp"
              className="block w-full h-[246.46px] object-cover"
              alt="..."
            />
            <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
              {/* <h5 className="text-xl">Second slide label</h5>
              <p>
                Some representative placeholder content for the second slide.
              </p> */}
            </div>
          </TECarouselItem>
          <TECarouselItem
            itemID={3}
            className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
          >
            <img
              src="https://res.cloudinary.com/dieioqzty/image/upload/v1739460860/ecommerce/zeb8moswayzvky4cbmrb.webp"
              className="block w-full h-[246.46px] object-cover"
              alt="..."
            />
            <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
              {/* <h5 className="text-xl">Third slide label</h5>
              <p>
                Some representative placeholder content for the third slide.
              </p> */}
            </div>
          </TECarouselItem>
        </div>
      </TECarousel>

      <Products/>
    </>
  )
}

export default Home