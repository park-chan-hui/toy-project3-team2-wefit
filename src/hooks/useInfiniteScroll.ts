import { useEffect, useRef } from 'react';

import { useInView } from 'react-intersection-observer';

interface InfiniteScrollOptions {
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
}

const useInfiniteScroll = ({
  fetchNextPage,
  hasNextPage = false,
  isFetchingNextPage,
}: InfiniteScrollOptions) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const timeoutId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }

      timeoutId.current = setTimeout(() => {
        fetchNextPage();
      }, 300);
    }

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return { ref };
};
export { useInfiniteScroll };
