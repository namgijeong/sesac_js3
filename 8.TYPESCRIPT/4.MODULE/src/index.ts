//common js 스타일 require... 안쓰고 esm 스타일 사용
import {add, sub} from './math';
import { toLower, toUpper } from './string';

console.log(`덧셈: ${add(10,5)}`);
console.log(`뺄셈: ${sub(10,5)}`);

console.log(`대문자화: ${toUpper("SESAC")}`);
console.log(`소문자화: ${toLower("SESAC")}`);
