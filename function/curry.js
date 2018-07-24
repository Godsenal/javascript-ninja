// 함수의 첫 몇몇 인자를 미리 채워 그 함수를 반환 하는 currying 기법
// 그것을 응용하여 첫 몇몇 인자가 아닌 다른 위치의 인자도 반환할 수 있도록 하는 partial 이라는 함수이다.

Function.prototype.partial = function(...args) {
  const fn = this;
  return function(...inArgs) {
    let arg = 0;
    // 첫 번째가 아닌 다른 위치에 currying을 하고 싶은 경우,
    // 해당 인자에 undefined를 넣어 가능하게 해주는 로직.
    for (let i = 0; i < args.length && arg < inArgs.length; i++) {
      if (args[i] === undefined) {
        args[i] = inArgs[arg++];
      }
    }
    return fn.apply(this, args);
  };
};


const delay2Seconds = setTimeout.partial(undefined, 2000);
console.log('Start delay...');
delay2Seconds(() => {
  console.log('After 2 seconds...');
});
