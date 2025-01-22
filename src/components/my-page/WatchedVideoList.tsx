import { BsClockHistory } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';

import MyPageVideoItem from './MyPageVideoItem';
import EmptyResult from '../empty/EmptyResult';

import { getTimeAgo } from '@/utils/getTimeAgo';
import { VideoProps } from '@/types/video';

type MyPageVideoProps = {
  videos: VideoProps[];
};

const WatchedVideoList = ({ videos }: MyPageVideoProps) => {
  return (
    <>
      {videos.length === 0 ? (
        <EmptyResult message="좋아요한 영상이 없어요!" />
      ) : (
        <Swiper className="z-0" slidesPerView={2.5} spaceBetween={16}>
          {videos.map((video: VideoProps) => (
            <SwiperSlide key={video.video_id}>
              <div className="flex flex-col">
                <MyPageVideoItem {...video} />
                <time className="flex flex-row-reverse">
                  <span className="text-xs">
                    {getTimeAgo(video.created_at)}
                  </span>
                  <BsClockHistory size={16} className="mr-1" />
                </time>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default WatchedVideoList;
