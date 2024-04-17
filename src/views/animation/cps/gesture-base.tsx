import { useRef } from 'react'
import { useSprings, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react';
import style from '../css/gesture.module.scss'

const pages = [
  'https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/733853/pexels-photo-733853.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/4016596/pexels-photo-4016596.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
]

export default function GestureBase() {
  const index = useRef(0);
  const width = window.innerWidth;

  const [props, api] = useSprings(pages.length, i => ({
    x: i * width,
    scale: 1
  }));

  /**
   * @param {active} 拖动状态
   * @param {movement} 拖动距离 [x, y]
   * @param {direction} 方向 -1下降 1上升 0静止
   * @param {cancel} 可用于取消拖动
   */
  const bind = useDrag(({ active, movement: [mx], direction: [xDir], cancel }) => {
    // 当正在拖动并且拖动的距离超过了宽度的一半，就改变 index
    if (active && Math.abs(mx) > width / 2) {
      // index 根据移动的方向来计算，xDir 大于 0，就是向左，index 减一，反之加一
      let newIndex = index.current + (xDir > 0 ? -1 : 1);

      if (newIndex < 0) {
        newIndex = 0;
      }

      if (newIndex > pages.length - 1) {
        newIndex = pages.length - 1;
      }

      index.current = newIndex;

      // 改变 index 之后调用 cancel，就不再处理后续 drag 事件了
      cancel()
    }
    api.start(i => {
      // 根据拖动距离来计算每个元素的 x 和 scale
      const x = (i - index.current) * width + (active ? mx : 0)
      const scale = active ? 1 - Math.abs(mx) / width : 1
      return { x, scale }
    })
  });

  return (
    <div className={style.wrapper}>
      {props.map(({ x, scale }, i) => (
        <animated.div className={style.page} key={i} style={{ x }} {...bind()}>
          <animated.div style={{ scale, backgroundImage: `url(${pages[i]})` }} />
        </animated.div>
      ))}
    </div>
  )
}