'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useSearch from './useSearch';

export type Mock = {
  id: string;
  category: string;
  title: string;
  contents: string;
  maxPeople: number;
  memberCount: number;
  isOpenYn: true;
  isRecruiting: true;
  leaderId: string;
  createdDt: string | null;
  updatedDt: string | null;
  distance?: number;
  _links: {
    detail: {
      href: string;
    };
  };
};

const Input = styled.input`
  width: 80%;
`;
const Box = styled.div`
  background-color: lightblue;
  padding: 5px;
  margin: 10px;
  h5 {
    color: rebeccapurple;
    mark {
      background-color: transparent;
      color: red;
    }
  }
`;

export default function SearchBox() {
  const { handleKeyword, patterns, curKeyword, highlightValue } = useSearch();
  const [data, setData] = useState(mock);

  useEffect(() => {
    const { curPattern, prevPattern } = patterns;
    let idArr: String[] = [];
    let curData = mock
      .filter(
        ({ title, contents }) =>
          curPattern?.test(title) || curPattern?.test(contents)
      )
      .map((el) => {
        idArr.push(el.id);
        let { title, contents } = el;
        el.distance = 0;
        el.title = highlightValue(title, curPattern, el);
        el.contents = highlightValue(contents, curPattern, el);
        return el;
      });
    let prevData = mock.filter(
      ({ title, contents }) =>
        prevPattern.test(title) || prevPattern.test(contents)
    );
    prevData =
      prevData.length < mock.length
        ? prevData
            .filter(({ id }) => !idArr.includes(id))
            .map((el) => {
              let { title, contents } = el;
              el.distance = 0;
              el.title = highlightValue(title, prevPattern, el);
              el.contents = highlightValue(contents, prevPattern, el);
              return el;
            })
        : [];

    setTimeout(() => {
      const allData = [...curData, ...prevData];
      const sortData = allData.sort((a, b) => {
        if (!!a.distance && !!b.distance) {return a.distance - b.distance};
        return 0
      });
      setData(sortData);
    });
  }, [patterns]);

  return (
    <>
      <h3>검색</h3>
      <Input onChange={handleKeyword} value={curKeyword} />
      {data?.map((el, i) => (
        <Box key={i}>
          <h5 dangerouslySetInnerHTML={{ __html: el.title }}></h5>
          <p dangerouslySetInnerHTML={{ __html: el.contents }}></p>
        </Box>
      ))}
    </>
  );
}

let mock: Mock[] = [
  {
    id: '631efa808b2f6d153909b243',
    category: 'STUDY',
    title: '프론트엔드 개발자 네트워킹',
    contents: '간단한 개발 관련 커피Chat 해요',
    maxPeople: 5,
    memberCount: 0,
    isOpenYn: true,
    isRecruiting: true,
    leaderId: '62c46903aede795d338318e1',
    createdDt: '2022-09-12T18:23:12.133',
    updatedDt: '2022-09-12T18:25:41.712',
    _links: {
      detail: {
        href: 'http://175.45.195.94:9999/api/meetup/read/getOneMeetUp?meetUpId=631efa808b2f6d153909b243',
      },
    },
  },
  {
    id: '62e634a8423e9a3b58ce995d',
    category: 'NETWORK',
    title: '안드로이드 개발자 커피 미팅',
    contents: '오늘 저녁 서울역에서 오후 7시에 커피마실분',
    maxPeople: 3,
    memberCount: 0,
    isOpenYn: true,
    isRecruiting: true,
    leaderId: '62c46903aede795d338318e1',
    createdDt: null,
    updatedDt: null,
    _links: {
      detail: {
        href: 'http://175.45.195.94:9999/api/meetup/read/getOneMeetUp?meetUpId=62e634a8423e9a3b58ce995d',
      },
    },
  },
  {
    id: '62dd0c04a29b76338e5be8e4',
    category: 'STUDY',
    title: '이펙티브 코틀린 공부 스터디',
    contents: '2주동안 온라인으로 이펙티브 코틀린 완독 스터디 하실분 구합니다.',
    maxPeople: 5,
    memberCount: 1,
    isOpenYn: true,
    isRecruiting: true,
    leaderId: '62d3bedab3dd67132596a5a9',
    createdDt: null,
    updatedDt: null,
    _links: {
      detail: {
        href: 'http://175.45.195.94:9999/api/meetup/read/getOneMeetUp?meetUpId=62dd0c04a29b76338e5be8e4',
      },
    },
  },
  {
    id: '62dac70d0869763b60b62cf5',
    category: 'NETWORK',
    title: '코틀린 개발자 캔미팅',
    contents: '오늘 저녁 정자에서 오후 7시에 커피마실분4',
    maxPeople: 5,
    memberCount: 0,
    isOpenYn: true,
    isRecruiting: true,
    leaderId: '62cef77d3b75745a5ff3723f',
    createdDt: null,
    updatedDt: null,
    _links: {
      detail: {
        href: 'http://175.45.195.94:9999/api/meetup/read/getOneMeetUp?meetUpId=62dac70d0869763b60b62cf5',
      },
    },
  },
];
