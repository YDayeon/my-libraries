'use client';

import { FocusEvent, TouchEvent, useRef, useState } from 'react';
import Monitoring from './Monitoring';
import MiniMap from './Minimap';

export type TOptionalClassList = (
  graphicDevice: MonitoringGraphicDeviceData
) => string;
export type TOnClickDevice = (
  graphicDevice: MonitoringGraphicDeviceData
) => void;
type TResult = {
  ok: boolean;
  error?: string | null;
};
export type MonitoringGraphicDeviceData = {
  DVC_ID: number;
  DVC_ALIAS_NM: string | null;
  DVC_EXPL: string | null;
  XAX_CORD: number | null;
  YAX_CORD: number | null;
  DATA_TP_SEQNO: number | null;
  DVC_NO: number | null;
  CTRL_NO: number | null;
  USE_QNT_RT: number;
  FRST_REG_DT: string;
  LST_CHG_DT: string;
  LOC_ID: number | null;
  GROUP: { GRP_ID: number }[];
};
type Props = {
  onClickDevice?: TOnClickDevice;
  onBlur?: (e: FocusEvent<HTMLButtonElement>) => void;
  containerClassList?: string;
  optionalClassList: TOptionalClassList;
  result?: TResult;
  selectedDeviceList?: any;
};

function MonitoringDevice({
  onClickDevice,
  onBlur,
  containerClassList,
  optionalClassList,
  result,
  selectedDeviceList,
}: Props) {
  const [positionX, setPositionX] = useState(0);
  const [touchStartPoint, setTouchStartPoint] = useState({
    clientX: 0,
    transformPositionX: 0,
    positionX: 0,
  });
  const [transformPositionX, setTransformPositionX] = useState(0);
  const [maxOffsetWidth, setMaxOffsetWidth] = useState(0);
  const minimapBoxRef = useRef<HTMLDivElement>(null);

  const touchMoveMinimap = (event: TouchEvent<HTMLDivElement>) => {
    const { clientX } = event.touches[0];

    let currentTouchPositionX = clientX - 40 - 28;
    let transformPositionX = Math.floor(
      (currentTouchPositionX / maxOffsetWidth) * 100
    );

    if (
      currentTouchPositionX >= 0 &&
      currentTouchPositionX <= maxOffsetWidth - 2
    ) {
      setPositionX(currentTouchPositionX);
      setTransformPositionX(transformPositionX >= 0 ? transformPositionX : 0);
    }
  };
  const touchStartMonitoring = (event: TouchEvent<HTMLDivElement>) =>
    setTouchStartPoint({
      clientX: event.changedTouches[0].clientX,
      transformPositionX: transformPositionX,
      positionX: positionX,
    });
  const touchMoveMonitoring = (event: TouchEvent<HTMLDivElement>) => {
    const { clientX } = event.changedTouches[0];
    const offsetLeft = minimapBoxRef.current?.offsetLeft;
    const touchDifference = clientX - touchStartPoint.clientX;
    if (!!offsetLeft || offsetLeft === 0) {
      if ((offsetLeft <= 0 || transformPositionX <= 0) && touchDifference > 0) {
        setPositionX(0);
        setTransformPositionX(0);
      } else if (
        (offsetLeft >= maxOffsetWidth || transformPositionX >= 100) &&
        touchDifference < 0
      ) {
        setPositionX(maxOffsetWidth - 2);
        setTransformPositionX(100);
      } else {
        const marginValue = Math.floor(
          (Math.abs(touchDifference) / (maxOffsetWidth * 3)) * 100
        ); // monitoring 화면에서 움직이는 값
        if (touchDifference <= 0) {
          setTransformPositionX(
            touchStartPoint.transformPositionX + marginValue
          );
          setPositionX(touchStartPoint.positionX - (touchDifference - 4) / 4);
        } else {
          setTransformPositionX(
            touchStartPoint.transformPositionX - marginValue
          );
          setPositionX(
            touchStartPoint.positionX - (Math.abs(touchDifference) - 4) / 4
          );
        }
      }
    }
  };

  const MonitoringProps = {
    transformPositionX,
    touchStartMonitoring,
    touchMoveMonitoring,
    onBlur,
    onClickDevice,
    optionalClassList,
  };
  const MiniMapProps = {
    touchMoveMinimap,
    positionX,
    setMaxOffsetWidth,
  };

  return (
    <section
      className={`relative mx-auto flex h-full ${
        !!containerClassList ? containerClassList : 'w-85%'
      } flex-col pb-2`}
      style={{ gap: '0.3rem', paddingTop: '0.78rem', maxWidth: '22rem' }}
    >
      <Monitoring {...MonitoringProps} />
      <MiniMap {...MiniMapProps} ref={minimapBoxRef} />
    </section>
  );
}

export default MonitoringDevice;
