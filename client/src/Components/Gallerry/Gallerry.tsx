
// import d1 from "../../assests/d1.jpg"
import d2 from "../../assets/d22.jpg"
import d3 from "../../assests/d33.jpg"
import d4 from "../../assests/d4.jfif"
import d5 from "../../assests/d5.jpg"
import d6 from "../../assests/d6.jfif"
import d1 from "../../assets/d1.jpg"
// Import Swiper styles
import { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';



// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

function Gallerry() {
  return (
    <div className="mb-5 mt-4">
      <h3 id="gallery" className=' mt-[40px] text-center md:text-3xl font-bold font-serif'>Our <span className='text-red-600 '>Gallery</span> </h3>
      <div className="max-w-[300px] m-auto mt-4">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide >
            <img src={d1} />
          </SwiperSlide>
          <SwiperSlide >
            <img src={d2} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={`../d6.jfif`} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={`../d5.jpg`} />
          </SwiperSlide>

          <SwiperSlide>
            <img src={`../d4.jfif`} />
          </SwiperSlide>

        </Swiper></div>

    </div>
  )
}

export default Gallerry
