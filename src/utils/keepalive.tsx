import { createContext, useContext } from 'react';
import { useOutlet, useLocation, matchPath } from 'react-router-dom'
import type { FC, PropsWithChildren, ReactNode } from 'react';

interface KeepAliveLayoutProps extends PropsWithChildren {
  keepPaths: Array<string | RegExp>; // 页面路径，可以是 string 也可以是正则
  keepElements?: Record<string, ReactNode>; // 页面路径和组件的键值对，用来保存 keepalive 的组件
  dropByPath?: (path: string) => void; // 根据页面路径删除 keepElement 中的对应组件
}

type KeepAliveContextType = Omit<Required<KeepAliveLayoutProps>, 'children'>;

const keepElements: KeepAliveContextType['keepElements'] = {};

// 创建一个Context 存储需要 keepalive 的页面
export const KeepAliveContext = createContext<KeepAliveContextType>({
  keepPaths: [],
  keepElements,
  dropByPath(path: string) {
    keepElements[path] = null;
  }
});

// 判断是否需要 keepalive
const isKeepPath = (keepPaths: Array<string | RegExp>, path: string) => {
  let isKeep = false;
  for (let i = 0; i < keepPaths.length; i++) {
    let item = keepPaths[i];
    if (item === path) {
      isKeep = true;
    }
    if (item instanceof RegExp && item.test(path)) {
      isKeep = true;
    }
    if (typeof item === 'string' && item.toLowerCase() === path) {
      isKeep = true;
    }
  }
  return isKeep;
}

// 获取需要 keepalive 的页面
export function useKeepOutlet() {
  const location = useLocation();
  const element = useOutlet();

  const { keepElements, keepPaths } = useContext(KeepAliveContext);
  const isKeep = isKeepPath(keepPaths, location.pathname);

  if (isKeep) {
    keepElements![location.pathname] = element;
  }

  // 1、如果有 keepalive 的组件，则渲染全部 keepalive 组件，根据 location.pathname 显示对应的组件
  return <>
    {
      Object.entries(keepElements).map(([pathname, element]) => (
        <div
          key={pathname}
          style={{ height: '100%', width: '100%', position: 'relative', overflow: 'hidden auto' }}
          className="keep-alive-page"
          hidden={!matchPath(location.pathname, pathname)}
        >
          {element}
        </div>
      ))
    }
    {/* 2、如果没有 keepalive 的组件，则渲染当前页面 */}
    {!isKeep && element}
  </>
}

// 设置需要 keepalive 的路由
const KeepAliveLayout: FC<KeepAliveLayoutProps> = (props) => {
  const { keepPaths, ...other } = props;

  const { keepElements, dropByPath } = useContext(KeepAliveContext);

  return (
    <KeepAliveContext.Provider value={{ keepPaths, keepElements, dropByPath }} {...other} />
  )
}

export default KeepAliveLayout;
