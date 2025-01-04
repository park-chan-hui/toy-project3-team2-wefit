import videoUpload from '@/assets/video-upload.svg';

type VideoUploadBoxProps = {
  edit?: boolean;
  videoURL?: string;
};
const VideoUploadBox = (videoUploadProps: VideoUploadBoxProps) => {
  return (
    <section className="flex flex-col gap-2">
      <p className="text-base font-bold">영상 업로드</p>
      {(!videoUploadProps.edit && (
        <div className="flex aspect-video flex-col items-center justify-center rounded-medium bg-gray-100 p-medium shadow-inner">
          <img src={videoUpload} alt="영상 업로드 이미지" />
          <p className="text-xsmall font-bold">원하는 동영상을 추가해보아요!</p>
        </div>
      )) || (
        <video
          className="aspect-video"
          src={videoUploadProps.videoURL}
          controls
        ></video>
      )}
    </section>
  );
};

export default VideoUploadBox;
