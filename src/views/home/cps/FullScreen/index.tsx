import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import useScreen from "./useScreen";
import { useEffect, useState } from "react";

function Fullscreen() {
  const { isFullScreen, requestFullScreen, exitFullScreen } = useScreen()

  const [fullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    // 监听F11键
    window.addEventListener('keydown', F11)
    // 监听屏幕变化
    window.addEventListener("resize", updateFullscreen);

    return () => {
      window.removeEventListener('keydown', F11)
      window.removeEventListener("resize", updateFullscreen);
    }
  }, [])

  function updateFullscreen() {
    setFullScreen(isFullScreen())
  }

  function F11(e: KeyboardEvent) {
    if (e.keyCode == 122) {
      e.preventDefault();
      requestFullScreen(document.body);
    }
  }

  return (
    fullScreen ? <FullscreenExitOutlined style={{ fontSize: '20px' }} onClick={() => exitFullScreen()} /> :
      <FullscreenOutlined style={{ fontSize: '20px' }} onClick={() => requestFullScreen(document.body)} />
  )
}

export default Fullscreen