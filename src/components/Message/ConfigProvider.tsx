import { PropsWithChildren, RefObject, createContext, useRef } from "react";
import { MessageProvider, MessageRef } from ".";

interface ConfigProviderProps {
  messageRef?: RefObject<MessageRef>
}

// 创建一个 Context 保存消息组件的 ref，并且提供给 useMessage 使用
export const ConfigContext = createContext<ConfigProviderProps>({});

export function MessageConfigProvider(props: PropsWithChildren) {
  const { children } = props;

  const messageRef = useRef<MessageRef>(null);

  return (
    <ConfigContext.Provider value={{ messageRef }}>
      <MessageProvider ref={messageRef}></MessageProvider>
      {children}
    </ConfigContext.Provider>
  );
}
