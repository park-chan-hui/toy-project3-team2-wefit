import { VideoProps } from '@/types/video';
import MyPageVideoItem from './MyPageVideoItem';
import { Swiper, SwiperSlide } from 'swiper/react';

type UploadVideoListProps = {
  videos: VideoProps[];
};

const UploadVideoList = ({ videos }: UploadVideoListProps) => {
  return (
    <Swiper slidesPerView={2.5} spaceBetween={16} className="z-0">
      {videos.map((video: VideoProps) => (
        <SwiperSlide key={video.video_id}>
          <div className="flex flex-col">
            <MyPageVideoItem {...video} myUploadVideos />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default UploadVideoList;
