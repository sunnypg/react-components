import { Button, message } from "antd"
import { MessageProvider, MessageRef } from "../../components/Message"
import { useRef } from "react";
import { useMessage } from "../../components/Message/hooks/useMessage";
import { MessageConfigProvider } from "../../components/Message/ConfigProvider";

function Message() {
  const myMessage = useMessage();

  return <Button type="primary" onClick={() => myMessage.add({ content: '提示信息' })}>成功</Button>
}

function MessageView() {
  // const messageRef = useRef<MessageRef>(null);

  return (
    <MessageConfigProvider>
      <div>
        <h2>Antd Message</h2>
        <Button type="primary" onClick={() => message.info('提示信息')}>提示</Button>
      </div>
      <div>
        <h2>自定义 Message</h2>
        {/* <h3>用法1：</h3> */}
        <Message></Message>
        {/* <h3>用法2：</h3>
        <MessageProvider ref={messageRef}></MessageProvider>
        <Button type="primary" onClick={() => messageRef.current!.add({ content: '请求成功' })}>成功</Button> */}
      </div>
    </MessageConfigProvider>
  )
}

export default MessageView