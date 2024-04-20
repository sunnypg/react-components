import { useEffect, useRef, useState } from "react"
import { Button } from "antd"
import { useSystemStore } from "../../store"
import Portal from "../../components/ApiComponents/Portal"
import MutateObserver from "../../components/ApiComponents/MutateObserver"
import CopyToClipboard from "../../components/ApiComponents/CopyToClipboard"

function IndexView() {
  const name = useSystemStore((state: any) => state.name)
  const updateName = useSystemStore((state: any) => state.updateName)
  const updateAge = useSystemStore((state: any) => state.updateAge)
  const age = useSystemStore((state: any) => state.age)

  // useSystemStore.subscribe((state) => {
  //   console.log('监听', useSystemStore.getState());
  // })

  const content = <div className="btn">
    <button>按钮</button>
  </div>;

  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    console.log(containerRef.current);
  }, []);

  const [className, setClassName] = useState('aaa');

  useEffect(() => {
    setTimeout(() => setClassName('bbb'), 2000);
  }, []);

  const callback = function (mutationsList: MutationRecord[]) {
    console.log(mutationsList);
  };

  return (
    <div>
      <div className="aaa">
        <h3>name: {name}</h3>
        <Button type="primary" onClick={() => updateName("Kobe Blaent")}>updateName</Button>
        <h3>age: {age}</h3>
        <Button type="primary" onClick={() => updateAge(age + 1)}>updateAge</Button>
        <h3>监听DOM变化</h3>
        <MutateObserver onMutate={callback}>
          <div id="container">
            <div className={className}>
              {
                className === 'aaa' ? <div>aaa</div> : <div>
                  <p>bbb</p>
                </div>
              }
            </div>
          </div>
        </MutateObserver>
        <h3>复制到剪切板</h3>
        <CopyToClipboard text={'神说要有光'} onCopy={() => {
          console.log('复制成功');
        }}>
          <Button type="primary" onClick={() => { alert('复制成功') }}>复制</Button>
        </CopyToClipboard>
        <h3>自定义Portal</h3>
        <Portal attach=".aaa" ref={containerRef}>
          {content}
        </Portal>
      </div>
    </div>
  )
}

export default IndexView