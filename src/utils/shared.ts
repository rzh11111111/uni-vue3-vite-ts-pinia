// 防止快速点击
let lastClickTime = 0

export function isFastClick(num = 1000) {
  const time = new Date().getTime()
  if (time - lastClickTime > num) {
    return false
  }
  lastClickTime = time
  return true
}

// 解析 path
export function parseUrl(fullPath: string) {
  const [path, queryStr] = fullPath.split('?')
  const name = path.slice(path.lastIndexOf('/') + 1)
  const query = {}
  queryStr
    ?.split('&')
    .map((i) => i.split('='))
    .forEach((i) => (query[i[0]] = i[1]))
  return {
    name,
    path,
    query,
  }
}

// 还原url
export function restoreUrl(path: string, query: Object) {
  let count = 0
  for (const key in query) {
    path += `${count === 0 ? '?' : '&'}${key}=${query[key]}`
    count += 1
  }
  return path
}
export  function throttle (fn:any, limit=1500) {
  let inThrottle:Boolean; // 开关
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      fn.apply(context, args)
      inThrottle = true
      setTimeout(() => {
        // 定时器用来进行保证在一定时间内开关的状态
        inThrottle = false
      }, limit)
    }
  };
};


// 防抖
export function _debounce(fn, delay) {
 
    var delay = delay || 200;
    var timer;
    return function () {
        var th = this;
        var args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            timer = null;
            fn.apply(th, args);
        }, delay);
    };
}