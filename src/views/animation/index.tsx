import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import SpringBase from './cps/spring-base';
import GestureBase from './cps/gesture-base';
import TransitionBase from './cps/transition-base';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'react-spring 基础',
    children: <SpringBase />,
  },
  {
    key: '2',
    label: 'use-gesture 手势库',
    children: <GestureBase />,
  },
  {
    key: '3',
    label: 'react-transition-group 过渡动画',
    children: <TransitionBase />,
  },
];

function Animation() {
  return <Tabs defaultActiveKey="1" items={items} />
}

export default Animation