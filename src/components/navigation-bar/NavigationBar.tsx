import { NavLink, useLocation } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { BsCollectionPlay } from 'react-icons/bs';
import { HiOutlineBookmark } from 'react-icons/hi';
import { CgProfile } from 'react-icons/cg';
import { FaPlus } from 'react-icons/fa';

import { ROUTER_PATH, NAVIGATION_BAR } from '@/constants/constants';
import { cn } from '@/utils/cn';

const NavigationBar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const isHomeActive = [
    ROUTER_PATH.HOME,
    ROUTER_PATH.VIDEO_DETAIL.replace(':videoId', ''),
    ROUTER_PATH.AUTHOR_DETAIL.replace(':userId', ''),
  ].some(path => pathname.startsWith(path));

  return (
    <nav className="fixed bottom-0 w-full max-w-container rounded-t-xl bg-primary text-light">
      <ul className="flex items-center justify-between px-2 py-2">
        <li className="flex-1 text-center">
          <NavLink
            to={ROUTER_PATH.HOME}
            className={cn(
              'flex flex-col items-center gap-1',
              isHomeActive ? 'text-black' : 'text-light',
            )}
          >
            <AiOutlineHome size={34} />
            <span className="text-xxsmall">{NAVIGATION_BAR.HOME}</span>
          </NavLink>
        </li>
        <li className="flex-1 text-center">
          <NavLink
            to={ROUTER_PATH.PLAYLIST}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-1',
                isActive ? 'text-black' : 'text-light',
              )
            }
          >
            <BsCollectionPlay size={34} />
            <span className="text-xxsmall">{NAVIGATION_BAR.PLAYLIST}</span>
          </NavLink>
        </li>
        <li className="relative -top-5 flex-1 text-center">
          <NavLink
            to={ROUTER_PATH.VIDEO_ADD}
            className="flex flex-col items-center gap-1"
          >
            <div className="rounded-full bg-secondary p-5">
              <FaPlus
                size={34}
                color={cn(
                  location.pathname === ROUTER_PATH.VIDEO_ADD
                    ? 'black'
                    : 'white',
                )}
              />
            </div>
          </NavLink>
        </li>
        <li className="flex-1 text-center">
          <NavLink
            to={ROUTER_PATH.BOOKMARK}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-1',
                isActive ? 'text-black' : 'text-light',
              )
            }
          >
            <HiOutlineBookmark size={34} />
            <span className="text-xxsmall">{NAVIGATION_BAR.BOOKMARK}</span>
          </NavLink>
        </li>
        <li className="flex-1 text-center">
          <NavLink
            to={ROUTER_PATH.MY_PAGE}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-1',
                isActive ? 'text-black' : 'text-light',
              )
            }
          >
            <CgProfile size={34} />
            <span className="text-xxsmall">{NAVIGATION_BAR.MY_PAGE}</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
