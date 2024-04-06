import classNames from "classnames";
import React from "react";
import "./index.scss"
import { ConfigContext } from "./ConfigProvider";

export type SizeType = 'small' | 'middle' | 'large' | number | undefined;

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  size?: SizeType | [SizeType, SizeType];
  direction?: 'horizontal' | 'vertical';
  align?: 'start' | 'end' | 'center' | 'baseline';
  split?: React.ReactNode;
  wrap?: boolean;
}

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
};

function getNumberSize(size: SizeType) {
  return typeof size === 'string' ? spaceSize[size] : size || 0;
}

const Space: React.FC<SpaceProps> = (props) => {
  // 当有 ConfigProvider 包裹的时候，就不用单独设置 size 了，会直接用那里的配置。
  const { space } = React.useContext(ConfigContext);

  const {
    className,
    style,
    children,
    size = space?.size || 'small', // 继承ConfigProvider
    direction = 'horizontal',
    align,
    split,
    wrap = false,
    ...otherProps
  } = props;

  // 将子元素数组扁平化
  const childNodes = React.Children.toArray(props.children);

  // 计算类名
  const mergedAlign = direction === 'horizontal' && align === undefined ? 'center' : align;
  const cn = classNames(
    'space',
    `space-${direction}`,
    {
      [`space-align-${mergedAlign}`]: mergedAlign,
    },
    className,
  );

  // 给每一个子元素包一层div
  const nodes = childNodes.map((child: any, i) => {
    const key = child && child.key || `space-item-${i}`;
    return <>
      <div className='space-item' key={key}>
        {child}
      </div>
      {i < childNodes.length && split && (
        <span className={`${className}-split`} style={style}>
          {split}
        </span>
      )}
    </>
  });

  // 计算其他样式（行列间距，是否换行）
  const otherStyles: React.CSSProperties = {};
  const [horizontalSize, verticalSize] = React.useMemo(
    () =>
      ((Array.isArray(size) ? size : [size, size]) as [SizeType, SizeType]).map(item =>
        getNumberSize(item),
      ),
    [size]
  );

  otherStyles.columnGap = horizontalSize; // 行间距
  otherStyles.rowGap = verticalSize; // 列间距

  if (wrap) {
    otherStyles.flexWrap = 'wrap'; // 换行
  }

  return <div
    className={cn}
    style={{
      ...otherStyles,
      ...style
    }}
    {...otherProps}>
    {nodes}
  </div>
}

export default Space