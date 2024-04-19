import { CSSProperties, FC, ReactNode, forwardRef, useImperativeHandle, useMemo } from "react";
import useStore from "./hooks/useStore";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import './index.scss'
import { createPortal } from "react-dom";
import { useTimer } from "./hooks/useTimer";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export type Position = 'top' | 'bottom';

export interface MessageProps {
  style?: CSSProperties;
  className?: string | string[];
  content: ReactNode | string;
  duration?: number;
  onClose?: (...args: any) => void;
  id?: number;
  position?: Position;
}

const MessageItem: FC<MessageProps> = (item) => {
  const { onMouseEnter, onMouseLeave } = useTimer({
    id: item.id!,
    duration: item.duration,
    remove: item.onClose!,
  });

  return <div className="message-item" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <ExclamationCircleOutlined />
    <span style={{ marginLeft: '6px' }}> {item.content}</span>
  </div >
}

export interface MessageRef {
  add: (messageProps: MessageProps) => number;
  remove: (id: number) => void;
  update: (id: number, messageProps: MessageProps) => void;
  clearAll: () => void;
}

export const MessageProvider = forwardRef<MessageRef, {}>((props, ref) => {
  const { messageList, add, update, remove, clearAll } = useStore('top');

  // useEffect(() => {
  //   setInterval(() => {
  //     add({
  //       content: Math.random().toString().slice(2, 8)
  //     })
  //   }, 2000);
  // }, []);

  if ('current' in ref!) {
    // 直接修改 ref.current
    ref.current = {
      add,
      update,
      remove,
      clearAll
    }
  }

  // 使用 useImperative 转发 ref 有一个问题，它并不是立刻修改 ref，而是会在之后的某个时间来修改
  // useImperativeHandle(ref, () => {
  //   return {
  //     add,
  //     update,
  //     remove,
  //     clearAll
  //   }
  // }, []);

  const positions = Object.keys(messageList) as Position[];

  const messageWrapper = <div className="message-wrapper">
    {
      positions.map(direction => {
        return <TransitionGroup className={`message-wrapper-${direction}`} key={direction}>
          {
            messageList[direction].map(item => {
              return <CSSTransition key={item.id} timeout={1000} classNames='message'>
                <MessageItem onClose={remove} {...item}></MessageItem>
              </CSSTransition>
            })
          }
        </TransitionGroup>
      })
    }
  </div>

  const el = useMemo(() => {
    const el = document.createElement('div');
    el.className = `wrapper`;

    document.body.appendChild(el);
    return el;
  }, []);

  // 挂载到 body
  return createPortal(messageWrapper, el);
})