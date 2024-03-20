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


