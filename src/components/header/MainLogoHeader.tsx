import logoSvg from '@/assets/we-fit-logo.svg';
import treadmillSvg from '@/assets/treadmill.svg';

type MainLogoHeaderProps = {
  isSplashPage?: boolean;
};

const MainLogoHeader = ({ isSplashPage }: MainLogoHeaderProps) => {
  return (
    <header className="mb-12 flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col justify-start gap-2">
        <h1 className="text-2xl font-bold">당신의 운동 파트너🏃‍♂️</h1>
        <img src={logoSvg} alt="WeFitlogo" className="h-auto w-64" />
      </div>
      {!isSplashPage && (
        <img src={treadmillSvg} alt="treadmillIcon" className="h-64 w-64" />
      )}
    </header>
  );
};

export default MainLogoHeader;
