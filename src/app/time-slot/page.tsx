'use client';

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

function makeTimeArray(limit: number): number[] {
  let array = new Array(limit);
  array = array.fill(0).map((el, i) => el + i);
  return array;
}

const Hours = makeTimeArray(24);
const Minutes = makeTimeArray(60);
const Seconds = makeTimeArray(60);

const initSelectedTime = {
  hour: '0',
  minute: '0',
  second: '0',
};
const initActiveIdObject = {
  hour: '0',
  minute: '0',
  second: '0',
};

export default function TimeSlot() {
  const [isTouching, setIsTouching] = useState(false);
  const [selectedTime, setSelectedTime] = useState(initSelectedTime);
  const [preventTouchingEvent, setPreventTouchingEvent] = useState(false);
  const hourElement = useRef<null[] | HTMLLIElement[]>([]);
  const minuteElement = useRef<null[] | HTMLLIElement[]>([]);
  const secondElement = useRef<null[] | HTMLLIElement[]>([]);
  const root = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const [activeEntry, setActiveEntry] = useState<IntersectionObserverEntry>();
  const [activeId, setActiveId] = useState(initActiveIdObject);

  useEffect(() => {
    if (!!root.current) {
      observer.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveEntry(entry);
            }
          });
        },
        {
          root: root.current,
          rootMargin: '-96px 0px -96px 0px',
          threshold: 0.4,
        }
      );
    }
  }, [root]);

  function settingActiveEntry(id: string, i?: number) {
    const [key, value] = id.split('_');
    setSelectedTime((prev) => ({ ...prev, [key]: value }));
    setActiveId({ ...activeId, [key]: value });
    if (!!i || i === 0) {
      setPreventTouchingEvent(true);
      if (key === 'hour') {
        hourElement.current[i]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });
        return;
      }
      if (key === 'minute') {
        minuteElement.current[i]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });
        return;
      }
      if (key === 'second') {
        secondElement.current[i]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });
        return;
      }
    }
  }

  useEffect(() => {
    if (!isTouching && !preventTouchingEvent) {
      const id = activeEntry?.target.id;
      if (!!id) {
        settingActiveEntry(id);
      }
      activeEntry?.target.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [activeEntry, isTouching]);

  useEffect(() => {
    if (!!observer.current) {
      hourElement.current?.forEach((el) => {
        if (el) {
          observer.current?.observe(el);
        }
      });
      minuteElement.current?.forEach((el) => {
        if (el) {
          observer.current?.observe(el);
        }
      });
      secondElement.current?.forEach((el) => {
        if (el) {
          observer.current?.observe(el);
        }
      });
    }
  }, [observer.current]);

  // useEffect(() => {
  //   console.log('active', activeId);
  // }, [activeId]);

  return (
    <div
      className='relative flex h-56 w-full px-5 overflow-hidden rounded-md border-1 border-primary bg-yellow-500 px-2'
      ref={root}
      onTouchMove={() => {
        setPreventTouchingEvent(false);
        setIsTouching(true);
      }}
      onTouchEnd={() => {
        setTimeout(() => setIsTouching(false), 100);
      }}
    >
      <ul className='cursor-default z-10 w-full py-26 basis-1/3 overflow-scroll scrollbar-hide'>
        {Hours.map((el, i) => (
          <li
            ref={(el) => (hourElement.current[i] = el)}
            key={el}
            onClick={() => {
              settingActiveEntry(`hour_${el}`, i);
            }}
            id={`hour_${el}`}
            className={`h-6 cursor-default ${
              activeId['hour'] === el.toString() ? 'font-bold' : 'font-normal'
            }`}
          >
            {el}
          </li>
        ))}
      </ul>
      <ul className='cursor-default z-10 w-full basis-1/3 overflow-scroll pr-6 text-center scrollbar-hide py-26'>
        {Minutes.map((el, i) => (
          <li
            ref={(el) => (minuteElement.current[i] = el)}
            key={el}
            onClick={() => {
              settingActiveEntry(`minute_${el}`, i);
            }}
            id={`minute_${el}`}
            className={`h-6 cursor-default ${
              activeId['minute'] === el.toString() ? 'font-bold' : 'font-normal'
            }`}
          >
            {el}
          </li>
        ))}
      </ul>
      <ul className='cursor-default z-10 w-full basis-1/3 overflow-scroll text-end py-26 scrollbar-hide'>
        {Seconds.map((el, i) => (
          <li
            ref={(el) => (secondElement.current[i] = el)}
            key={el}
            onClick={() => {
              settingActiveEntry(`second_${el}`, i);
            }}
            id={`second_${el}`}
            className={`h-6 cursor-default text-center ${
              activeId['second'] === el.toString() ? 'font-bold' : 'font-normal'
            }`}
          >
            {el}
          </li>
        ))}
      </ul>
      <div className='absolute cursor-default left-0 top-0 z-0 flex h-full w-full items-center px-2'>
        <div className='flex bg-black/75 h-7 w-full items-center rounded-md bg-antiquewhite'>
          <span className='basis-1/3 pl-8'>시</span>
          <span className='basis-1/3 text-center pl-6'>분</span>
          <span className='basis-1/3 text-end pr-4'>초</span>
        </div>
      </div>
    </div>
  );
}
