import { useEffect, useState } from 'react';
import escapeRegExp from 'lodash.escaperegexp';
import { Mock } from './page';

function useSearch() {
  const [prevKeyword, setPrevKeyword] = useState('');
  const [curKeyword, setCurKeyword] = useState('');
  const [patterns, setPatterns] = useState({
    prevPattern: new RegExp(''),
    curPattern: new RegExp(''),
  });
  const handleKeyword = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPrevKeyword(
      value === ''
        ? ''
        : (value.charCodeAt(0) - 44032) % 28 > 0
        ? `${curKeyword}${getFinalConstantVowel(value)}`
        : ''
    );
    setCurKeyword(value.replace(' ', ''));
  };

  const getFinalConstantVowel = (keyword:string) => {
    const t = [
      '',
      'ㄱ',
      'ㄲ',
      'ㄳ',
      'ㄴ',
      'ㄵ',
      'ㄶ',
      'ㄷ',
      'ㄹ',
      'ㄺ',
      'ㄻ',
      'ㄼ',
      'ㄽ',
      'ㄾ',
      'ㄿ',
      'ㅀ',
      'ㅁ',
      'ㅂ',
      'ㅄ',
      'ㅅ',
      'ㅆ',
      'ㅇ',
      'ㅈ',
      'ㅊ',
      'ㅋ',
      'ㅌ',
      'ㅍ',
      'ㅎ',
    ];

    const ga = 44032;
    let uni:number = keyword.charCodeAt(0);

    uni = uni - ga;

    let tn = uni % 28;
    return t[tn];
  };

  const ch2pattern = (inputChar:string) => {
    const char = inputChar
    const offset = 44032; /* '가'의 코드 */
    // 한국어 음절
    if (/[가-힣]/.test(char)) {
      const chCode = char.charCodeAt(0) - offset;
      // 종성이 있으면 문자 그대로를 찾는다.
      if (chCode % 28 > 0) {
        return char;
      }
      const begin = Math.floor(chCode / 28) * 28 + offset;
      const end = begin + 27;
      return `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
    }
    type ObjType = {
      [key:string]:number
    }
    // 한글 자음
    if (/[ㄱ-ㅎ]/.test(char)) {
      const con2syl:ObjType = {
        ㄱ: '가'.charCodeAt(0),
        ㄲ: '까'.charCodeAt(0),
        ㄴ: '나'.charCodeAt(0),
        ㄷ: '다'.charCodeAt(0),
        ㄸ: '따'.charCodeAt(0),
        ㄹ: '라'.charCodeAt(0),
        ㅁ: '마'.charCodeAt(0),
        ㅂ: '바'.charCodeAt(0),
        ㅃ: '빠'.charCodeAt(0),
        ㅅ: '사'.charCodeAt(0),
      };
      const begin =
        con2syl[char] ||
        (char.charCodeAt(0) - 12613) /* 'ㅅ'의 코드 */ * 588 + con2syl['ㅅ'];
      const end = begin + 587;
      return `[${char}\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
    }
    return escapeRegExp(char);
  };

  const createFuzzyMatcher = (keyword:string) => {
    const pattern = keyword
      .split('')
      .map(ch2pattern)
      .map((pattern) => '(' + pattern + ')')
      .join('.*?');
    return new RegExp(pattern, 'gi');
  };

  const highlight = (el:Mock, match:string, offset:number, string:string, ...groups:string[]) => {
    if (match !== '') {
      if (groups.length === 1) {
        return `<mark>${match}</mark>`;
      } else if (groups.length === 2) {
        el.distance = match.length - 1;
        return `<mark>${offset}</mark>${match.substring(
          1,
          match.length - 1
        )}<mark>${string}</mark>`;
      } else if (groups.length !== 0) {
        const letters = match.split('');
        const StringIndex = match.indexOf(string);
        letters[0] = `<mark>${letters[0]}</mark>`;
        letters[StringIndex] = `<mark>${letters[StringIndex]}</mark>`;
        el.distance = StringIndex;
        for (let i = groups.length - 3; i >= 0; i--) {
          let index = match.indexOf(groups[i]);
          letters[index] = `<mark>${letters[index]}</mark>`;
        }
        return letters.join('');
      }
    }
    return match;
  };

  const highlightValue = (key:string, pattern:RegExp, value:Mock) => {
    const re = /[<][^>]*[>]/g;
    const el = value;
    return key
      .replace(re, '')
      .replace(pattern, (match, offset, string, ...groups) =>
        highlight(el, match, offset, string, ...groups)
      );
  };

  useEffect(() => {
    setPatterns({
      prevPattern: createFuzzyMatcher(prevKeyword),
      curPattern: createFuzzyMatcher(curKeyword),
    });
  }, [prevKeyword, curKeyword]);

  return { handleKeyword, patterns, curKeyword, highlightValue };
}

export default useSearch;

/**
 * handleKeyword -> setPrevKeyword, setCurKeyword
 * createFuzzyMatcher : 정규표현식 생성
 * data filtering
 * if(!result) curKeyword 분리 -> prevKeyword + curKeyword 받침
 */
