import CodeBlock from "./CodeBlock";
import Toggle from "./Toggle"
import useCounter from './useCounter';

function Test() {
  const [count, increment, decrement] = useCounter();

  const code1 = `
    import { render, fireEvent, waitFor, renderHook } from '@testing-library/react';
    import { act } from 'react-dom/test-utils';
    import Toggle from './views/test/Toggle';
    import useCounter from './views/test/useCounter';
    
    // 测试Toggle组件
    test('toggle', async () => {
      const { container } = render(<Toggle />);
    
      expect(container.querySelector('p')?.textContent).toBe('close');
    
      act(() => {
        fireEvent.click(container.querySelector('button')!)
      })
    
      // 测试同步代码
      // expect(container.querySelector('p')?.textContent).toBe('open');
    
      // 测试异步代码
      await waitFor(() => expect(container.querySelector('p')?.textContent).toBe('open'), {
        timeout: 3000
      });
    })
  `;

  const code2 = `
    import { render, fireEvent, waitFor, renderHook } from '@testing-library/react';
    import { act } from 'react-dom/test-utils';
    import Toggle from './views/test/Toggle';
    import useCounter from './views/test/useCounter';
    
    // 测试useCounter Hook
    test('useCounter', async () => {
      const hook = renderHook(() => useCounter(0));
    
      const [count, increment, decrement] = hook.result.current;
    
      act(() => {
        increment(2);
      });
      expect(hook.result.current[0]).toBe(2);
    
      act(() => {
        decrement(3);
      });
      expect(hook.result.current[0]).toBe(-1);
    
      hook.unmount();
    });
 `;

  return (
    <div className="test">
      <div style={{ width: "300px", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>组件测试:</h2>
        <Toggle></Toggle>
      </div>
      <CodeBlock language="ts1" code={code1} />
      <div style={{ width: "300px", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>hook测试:</h2>
        <div>
          <div>
            <span style={{ marginRight: '10px' }}>计数：{count}</span>
            <button onClick={() => increment(1)}>加一</button>
            <button onClick={() => decrement(2)}>减二</button>
          </div>
        </div>
      </div>
      <CodeBlock language="ts2" code={code2} />
    </div>
  )
}

export default Test