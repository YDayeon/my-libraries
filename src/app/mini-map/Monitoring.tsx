import { FocusEvent, TouchEvent } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { TOnClickDevice, TOptionalClassList } from './page';

type Props = {
  transformPositionX: number;
  onClickDevice?: TOnClickDevice;
  onBlur?: (e: FocusEvent<HTMLButtonElement>) => void;
  optionalClassList: TOptionalClassList;
  touchStartMonitoring: (event: TouchEvent<HTMLDivElement>) => void;
  touchMoveMonitoring: (event: TouchEvent<HTMLDivElement>) => void;
};

const ImageContainer = styled.div`
  width: 100%;
  position: relative;
  ::after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

function Monitoring({
  transformPositionX,
  touchStartMonitoring,
  touchMoveMonitoring,
}: Props) {
  return (
    <div className='relative flex w-full justify-center overflow-hidden border-2 border-primary shadow-md'>
      <ImageContainer>
        <span className='absolute left-2 top-2 z-10 flex items-center justify-center rounded-md border-1 border-primary bg-white px-1.5 text-base text-primary'>
          복도
        </span>
        <span className='absolute bottom-2 left-2 z-10 flex items-center justify-center rounded-md border-1 border-primary bg-white px-1.5 text-base text-primary'>
          창측
        </span>
      </ImageContainer>
    </div>
  );
}

export default Monitoring;
