import { useEffect, useState } from 'react';
import { mockUsers } from '@/mocks/mockUsers';
import type { BookmarkProps } from '@/types/bookmark';
import type { MusicPlayListProps } from '@/types/musicPlayList';
import PlayListItem from '@/components/playlist/PlayListItem';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProps,
  DropResult,
} from 'react-beautiful-dnd';

type PlayListProps = {
  bookmark?: BookmarkProps;
  playlist?: MusicPlayListProps;
  // eslint-disable-next-line no-unused-vars
  onThumbnailChange: (thumbnail: string) => void;
  thumbnail: string;
};

const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};

const PlayList = ({
  bookmark,
  playlist,
  onThumbnailChange,
  thumbnail,
}: PlayListProps) => {
  const initialVideoList = bookmark
    ? bookmark.video_list
    : playlist?.video_list || [];
  const [videoList, setVideoList] = useState(initialVideoList);

  const object = bookmark || playlist;

  if (!object) return;

  const onDragEnd = (result: DropResult) => {
    if (!result?.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    const newList = [...videoList];
    const pickedItem = newList[sourceIndex];

    newList.splice(sourceIndex, 1);
    newList.splice(destinationIndex, 0, pickedItem);
    setVideoList(newList);
  };

  // 이벤트 버블링 제한
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StrictModeDroppable droppableId="droppable">
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col gap-4"
          >
            {videoList?.map((video, index) => {
              const userData = mockUsers.find(
                user => user.user_id === video.user_id,
              );
              return (
                <Draggable
                  key={video.video_id}
                  draggableId={video.video_id}
                  index={index}
                >
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={handleClick}
                    >
                      <PlayListItem
                        key={video.video_id}
                        video={video}
                        thumbnail={thumbnail}
                        onThumbnailChange={onThumbnailChange}
                        userData={userData}
                      />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
};

export default PlayList;
