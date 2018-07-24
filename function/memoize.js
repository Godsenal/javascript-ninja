// Memoize 기법을 함수도 객체라는 점을 이용하여 간단하게 구현.
// 소수인지 판별하는 isPrime과 주어진 값보다 작은 모든 소수의 합을 구하는 primeSum 모두
// memoize 기법을 적용.

function isPrime(number) {
  // 캐시를 저장할 수 있는 프로퍼티를 만듬.
  if (!isPrime.cache) {
    isPrime.cache = {};
  }
  // 캐시에 값이 존재 한다면 그 값을 반환.
  if (isPrime.cache[number]) {
    return isPrime.cache[number];
  }
  let prime = number !== 1;
  for (let i = 2; i < number; i++) {
    if (number % i === 0) {
      prime = false;
      break;
    }
  }
  // 캐시에 값을 저장.
  isPrime.cache[number] = prime;
  return prime;
}
function primeSum(number) {
  if (!primeSum.cache) {
    primeSum.cache = {};
  }
  if (primeSum.cache[number]) {
    return primeSum.cache[number];
  }
  let sum = 1;
  for (let i = 2; i < number; i++) {
    if (isPrime(i)) {
      sum = sum + i;
    }
  }
  primeSum.cache[number] = sum;
  return sum;
}
// 이 정도 연산은 빨리 처리되기 때문에 정확한 시간비교가 나오지 않을 수 있음.
function getProcessTime(callback) {
  const start = new Date().getTime();
  callback();
  const end = new Date().getTime();
  return end - start;
}

const nonCached = getProcessTime(() => primeSum(100000));
const cached = getProcessTime(() => primeSum(100000));
console.log(`
  non-cached: ${nonCached}
  cached: ${cached}
`);