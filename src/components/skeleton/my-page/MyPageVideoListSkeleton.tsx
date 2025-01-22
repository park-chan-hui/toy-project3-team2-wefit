import { Swiper, SwiperSlide } from 'swiper/react';

import MyPageVideoItemSkeleton from './MyPageVideoItemSkeleton';

const MyPageVideoListSkeleton = () => {
  const emptyArray = Array.from({ length: 3 }, (_, index) => index + 1);

  return (
    <Swiper className="z-0" slidesPerView={2.5} spaceBetween={16}>
      {emptyArray.map(item => (
        <SwiperSlide key={item}>
          <MyPageVideoItemSkeleton />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MyPageVideoListSkeleton;
