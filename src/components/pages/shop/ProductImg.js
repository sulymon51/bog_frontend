/* eslint-disable no-unused-vars */
import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

// images
import cement from "../../assets/images/cements.png";
import steel from "../../assets/images/steels.png";
import stones from "../../assets/images/granites.png";
const baseURL = process.env.REACT_APP_IMAGE_URL;

const Images = [
    {
        img: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1667899753/BOG/sands_cy9q3x.png"
    },
    {
        img: cement
    },
    {
        img: steel
    },
    {
        img: stones
    },
]

export  const ProductImage = ({item}) => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="lg:w-full">
        <Swiper 
            style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
              }}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className=""
        >
            {item.product_image.map((i,) => {
                return <SwiperSlide><img src={`${baseURL}/${i.image}`} alt="product" className="w-full h-60"/></SwiperSlide>;
            })}
        </Swiper>   
        <Swiper 
           onSwiper={setThumbsSwiper}
           spaceBetween={5}
           slidesPerView={4}
           freeMode={true}
           watchSlidesProgress={true}
           modules={[FreeMode, Navigation, Thumbs]}
           className="mt-1"
        >
            {item.product_image.map((i, ) => {
                return <SwiperSlide><img src={`${baseURL}/${i.image}`} alt="product" className="h-12"/></SwiperSlide>;
            })}
        </Swiper>
    </div>
  );
};
