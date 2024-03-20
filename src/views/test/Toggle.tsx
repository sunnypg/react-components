import { useCallback, useState } from 'react';

function Toggle() {

  const [status, setStatus] = useState(false);

  const clickHandler = useCallback(() => {
    setStatus((prevStatus) => !prevStatus);
    // setTimeout(() => {
    //   setStatus((prevStatus) => !prevStatus);
    // }, 2000);
  }, []);

  return (
    <div>
      <span style={{ marginRight: '10px' }}>状态：{status ? 'open' : 'close'}</span>
      <button onClick={clickHandler}>切换</button>
    </div>
  );
}

export default Toggle;
