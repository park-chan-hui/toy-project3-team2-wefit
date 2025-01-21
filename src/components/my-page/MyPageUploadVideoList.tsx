import { Swiper, SwiperSlide } from 'swiper/react';

import MyPageVideoItem from './MyPageVideoItem';
import EmptyResult from '../empty/EmptyResult';

import { VideoProps } from '@/types/video';

type UploadVideoListProps = {
  videos: VideoProps[];
};

const MyPageUploadVideoList = ({ videos }: UploadVideoListProps) => {
  return (
    <>
      {videos.length === 0 ? (
        <EmptyResult message="업로드한 영상이 없어요!" />
      ) : (
        <Swiper slidesPerView={2.5} spaceBetween={16} className="z-0">
          {videos.map((video: VideoProps) => (
            <SwiperSlide key={video.video_id}>
              <div className="flex flex-col">
                <MyPageVideoItem {...video} myUploadVideos />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default MyPageUploadVideoList;
