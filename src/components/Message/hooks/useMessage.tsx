import { useContext } from 'react';
import { ConfigContext } from '../ConfigProvider';
import { MessageRef } from '..';

export function useMessage(): MessageRef {
  const { messageRef } = useContext(ConfigContext);

  if (!messageRef) {
    throw new Error('请在最外层添加 ConfigProvider 组件');
  }

  // 返回消息组件的引用
  return messageRef.current!;
}
