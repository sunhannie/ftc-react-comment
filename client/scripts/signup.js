console.log('it is in signup.js to test including multiple js file3');

// Generator 函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态
function* helloWorldGenerator() {
//   console.log('first'); 
//   console.log('second');//假如前面没有yeild，也需要一次next，运行到有yeild为止（位置） 
  var y = yield;  //此处也算一次暂停，需要一次next
  console.log(y);  //undefined，说明yield表达式本身没有返回值，或者说总是返回undefined。只有执行第二个next才会有输出，因为第一次暂停了，第二次才会继续
  yield 'hello';
  yield 'world';
  
  return 'ending';  //这用一次next，输出done: true ，用for..of遍历是不会输出的
}

var hw = helloWorldGenerator();
hw.next();

// console.log(hw.next()); //{value: "world", done: false}

// hw.next()
// { value: 'ending', done: true }
// console.log(hw.next()); // { value: undefined, done: true }

function* gen() {
  yield  123 + 456;
  console.log('yield');
}
var gen = gen();
// console.log(gen.next()); //{value: 579, done: false}
// console.log(gen.next()); 
//先yield
//再{value: undefined, done: true}

// var arr = [1, [[2, 3], 4], [5, 6]];

// var flat = function* (a) {
//   var length = a.length;
//   for (var i = 0; i < length; i++) {
//     var item = a[i];
//     if (typeof item !== 'number') {
//       yield* flat(item);
//     } else {
//       yield item;
//     }
//   }
// };
// // console.log(flat(arr));  //flat(arr)是得到一遍历器，可以用for of来遍历输出value值
// for (var f of flat(arr)) {
// //   console.log(f); //1,2,3,4,5,6
// }


// function* g() {
//   yield 1;
//   console.log('throwing an exception');
//   throw new Error('generator broke!');
//   yield 2;
//   yield 3;
// }

// function log(generator) {
//   var v;
//   console.log('starting generator');
//   try {
//     v = generator.next();
//     console.log('第一次运行next方法', v);
//   } catch (err) {
//     console.log('捕捉错误', v);
//   }
//   try {
//     v = generator.next();
//     console.log('第二次运行next方法', v);
//   } catch (err) {
//     console.log('捕捉错误', v);
//   }
//   try {
//     v = generator.next();
//     console.log('第三次运行next方法', v);
//   } catch (err) {
//     console.log('捕捉错误', v);
//   }
//   console.log('caller done');
// }

// log(g());

function compose (middleware) {
  // 传入的 middleware 参数必须是数组
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  // middleware 数组的元素必须是函数
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  // 返回一个函数闭包, 保持对 middleware 的引用
  return function (context, next) {
    // 这里的 context 参数是作为一个全局的设置, 所有中间件的第一个参数就是传入的 context, 这样可以
    // 在 context 中对某个值或者某些值做"洋葱处理"

    // 解释一下传入的 next, 这个传入的 next 函数是在所有中间件执行后的"最后"一个函数, 这里的"最后"并不是真正的最后,
    // 而是像上面那个图中的圆心, 执行完圆心之后, 会返回去执行上一个中间件函数(middleware[length - 1])剩下的逻辑

    // index 是用来记录中间件函数运行到了哪一个函数
    let index = -1
    // 执行第一个中间件函数
    return dispatch(0)

    function dispatch (i) {
      // i 是洋葱模型的记录已经运行的函数中间件的下标, 如果一个中间件里面运行两次 next, 那么 i 是会比 index 小的.
      // 如果对这个地方不清楚可以查看下面的图
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) {
        // 这里的 next 就是一开始 compose 传入的 next, 意味着当中间件函数数列执行完后, 执行这个 next 函数, 即圆心
        fn = next
      }
      // 如果没有函数, 直接返回空值的 Promise
      if (!fn) return Promise.resolve()
      try {
        // 为什么这里要包一层 Promise? 
        // 因为 async 需要后面是 Promise, 然后 next 函数返回值就是 dispatch 函数的返回值, 所以运行 async next(); 需要 next 包一层 Promise
        // next 函数是固定的, 可以执行下一个函数
        return Promise.resolve(fn(context, function next () {
          return dispatch(i + 1)
        }))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}


async function first(ctx, next) {
  console.log('1');
  // async 与 co + yield 的模型不同, await 是需要后面是 promise 的函数, 并且自己执行一次, 而 co 是自己拿到 value 然后帮你自动执行.
  // await next();
  await next(); // 两次调用 next
  console.log(ctx);
};

async function second(ctx, next) {
  console.log('2');
  await next();
};

async function third(ctx, next) {
  console.log('3');
  await next();
  console.log('4');
};

const middleware = [first, second, third];

const com = compose(middleware);

com('ctx', function() {
  console.log('hey');
});

// 如果第一个中间件中没有两次调用 next 函数, 那么正确的结果为 1 2 3 ‘hey’ 4 ‘ctx’.