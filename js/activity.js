!function () {

  var startTouchY = 0 // 记录拖动开始的 Y 值
  var currentActivityIndex = 0 // 当前活动页索引
  var activitys = document.getElementById('activitys')
  var max = activitys.children.length - 1 // 最多索引
  var transform = { translateY: "translateY(0px)" } // 高度变化属性
  var body = document.body

  Object.defineProperty(transform, 'wTranslateY', {
    set: function (newValue) {
      this.translateY = newValue
      activitys.style.transform = newValue
    },
    __proto__: null
  })

  !function () {
    body.addEventListener("touchstart", touchstart)
    // document.body.addEventListener("touchmove", touchmove)
    body.addEventListener("touchend", touchend)
  }()

  function touchstart(e) {
    // 每次触摸刷新
    startTouchY = e.touches[0].pageY;
  }
  // function touchmove(e) {
  //   // 阻止默认拖动页面事件，微信
  //   e.preventDefault();
  // }
  function touchend(e) {
    let currentTouchY = e.changedTouches[0].pageY;
    if (Math.abs(currentTouchY - startTouchY) >= 100) {
      if (currentTouchY > startTouchY) previous();
      else next();
    }
  }
  function previous() {
    if (currentActivityIndex <= 0) return;

    currentActivityIndex -= 1;
    transform.wTranslateY = `translateY(-${currentActivityIndex}00%)`;
    console.log(transform)
  }
  function next() {
    if (currentActivityIndex >= max) return;

    currentActivityIndex += 1;
    transform.wTranslateY = `translateY(-${currentActivityIndex}00%)`;
    console.log(transform)
  }
}()