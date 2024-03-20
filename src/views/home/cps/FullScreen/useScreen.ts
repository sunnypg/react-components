export default function useScreen() {
  const document: any = window.document;
  // 打开全屏
  function requestFullScreen(element: any) {
    const requestMethod = element.requestFullscreen || element.webkitRequestFullscreen || element.msRequestFullscreen || element.mozRequestFullScreen;
    if (requestMethod) {
      requestMethod.call(element);
    }
  }
  // 退出全屏
  function exitFullScreen() {
    const exitMethod = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen;
    if (exitMethod) {
      exitMethod.call(document);
    }
  }
  // 判断是否全屏
  function isFullScreen() {
    const isFull = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement || document.mozFullScreenElement;
    return !!isFull;
  }

  return { requestFullScreen, exitFullScreen, isFullScreen }
}
