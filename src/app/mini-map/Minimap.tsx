import Image from 'next/image';
import React, { MouseEvent, TouchEvent, useEffect, useRef } from 'react';

type Props = {
  touchMoveMinimap: (event: TouchEvent<HTMLDivElement>) => void;
  positionX: number;
  setMaxOffsetWidth: (width: number) => void;
};

const MiniMap = React.forwardRef<HTMLDivElement, Props>(
  ({ touchMoveMinimap, positionX, setMaxOffsetWidth }, minimapBoxRef) => {
    const maxWidthRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (maxWidthRef.current) {
        setMaxOffsetWidth(maxWidthRef.current?.offsetWidth - 56 - 4);
      }
    }, [maxWidthRef.current]);
    return (
      <div
        ref={maxWidthRef}
        className='border-box relative h-16 w-full overflow-hidden border-2 border-primary shadow-md'
        onTouchMove={touchMoveMinimap}
      >
        <div
          ref={minimapBoxRef}
          className='box-content h-14 w-14 border-2 border-primary outline outline-[500px] outline-black/30'
          style={{
            position: 'absolute',
            left: `${positionX}px`,
          }}
        ></div>
      </div>
    );
  }
);

MiniMap.displayName = 'MiniMap';
export default MiniMap;
