import { useSpringValue, animated, useSpring, useSprings, useTrail, useSpringRef, useChain, useTransition, AnimatedProps } from '@react-spring/web'
import { CSSProperties, useEffect, useState } from 'react';
import style from '../css/spring.module.scss'

// 单个属性变化
function Spring1() {
  const width = useSpringValue(0, {
    config: {
      // duration: 2000
      mass: 2, // 质量（也就是重量），质量越大，回弹惯性越大，回弹的距离和次数越多
      friction: 10, // 摩擦力，增加点阻力可以抵消质量和张力的效果
      tension: 200 // 张力，弹簧松紧程度，弹簧越紧，回弹速度越快
    }
  });

  useEffect(() => {
    width.start(300);
  }, []);

  return <animated.div className={style.box} style={{ width }}></animated.div>
}

// 多个属性变化
function Spring2() {
  // const styles = useSpring({
  //   from: {
  //     width: 0,
  //     height: 0
  //   },
  //   to: {
  //     width: 200,
  //     height: 200
  //   },
  //   config: {
  //     // duration: 1000
  //     mass: 2,
  //     friction: 10,
  //     tension: 400
  //   }
  // });
  const [styles, api] = useSpring(() => {
    return {
      from: {
        width: 100,
        height: 100
      },
      config: {
        // duration: 2000
        mass: 2,
        friction: 10,
        tension: 400
      }
    }
  });

  useEffect(() => {
    api.start({
      width: 200,
      height: 200
    });
  }, []);

  return <animated.div className={style.box} style={{ ...styles }}></animated.div>
}

// 多个元素多个属性 并行执行动画
function Spring3() {
  const [springs, api] = useSprings(
    3,
    () => ({
      from: { width: 0 },
      // to: { width: 300 },
      config: {
        duration: 1000
      }
    })
  )

  useEffect(() => {
    api.start({ width: 300 }); // 当你指定了 to，那会立刻执行动画，或者不指定 to，用 api.start 来开始动画
  }, [])

  return <div>
    {springs.map((styles, i) => (
      <animated.div style={styles} className={style.box} key={i}></animated.div>
    ))}
  </div>
}

// 多个元素多个属性 依次执行动画
function Spring4() {
  const [springs, api] = useTrail(
    3,
    () => ({
      from: { width: 0 },
      config: {
        duration: 1000
      }
    })
  )

  useEffect(() => {
    api.start({ width: 300 });
  }, [])

  return <div>
    {springs.map((styles, i) => (
      <animated.div style={styles} className={style.box} key={i}></animated.div>
    ))}
  </div>
}

// 多个动画 顺序执行
function Spring5() {
  const api1 = useSpringRef()
  const [springs] = useTrail(
    3,
    () => ({
      ref: api1,
      from: { width: 0 },
      to: { width: 300 },
      config: {
        duration: 1000
      }
    }),
    []
  )

  const api2 = useSpringRef()
  const [springs2] = useSprings(
    3,
    () => ({
      ref: api2,
      from: { height: 100 },
      to: { height: 50 },
      config: {
        duration: 1000
      }
    }),
    []
  )

  useChain([api1, api2], [0, 1], 500)

  return <div>
    {springs.map((styles, i) => (
      <animated.div style={{ ...styles, ...springs2[i] }} className={style.box} key={i}></animated.div>
    ))}
  </div>
}

// 笑脸动画
const COORDS = [
  [50, 30],
  [90, 30],
  [50, 50],
  [60, 60],
  [70, 60],
  [80, 60],
  [90, 50],
]

const STROKE_WIDTH = 0.5

const MAX_WIDTH = 150
const MAX_HEIGHT = 100

function Smile() {
  const gridApi = useSpringRef()
  const gridSprings = useTrail(16, {
    ref: gridApi,
    from: {
      x2: 0,
      y2: 0,
    },
    to: {
      x2: MAX_WIDTH,
      y2: MAX_HEIGHT,
    },
  })

  const boxApi = useSpringRef()
  const [boxSprings] = useSprings(COORDS.length, i => ({
    ref: boxApi,
    from: {
      scale: 0,
    },
    to: {
      scale: 1,
    },
    delay: i * 200,
    config: {
      mass: 2,
      tension: 220,
    },
  }))

  useChain([gridApi, boxApi], [0, 1], 1500)

  return (
    <div className={style.smile_container}>
      {/* 用 svg 的 line 来画线，设置 x1、y1、x2、y2 就是一条线 */}
      <svg viewBox={`0 0 ${MAX_WIDTH} ${MAX_HEIGHT}`}>
        <g>
          {gridSprings.map(({ x2 }, index) => (
            <animated.line
              x1={0}
              y1={index * 10}
              x2={x2}
              y2={index * 10}
              key={index}
              strokeWidth={STROKE_WIDTH}
              stroke="currentColor"
            />
          ))}
          {gridSprings.map(({ y2 }, index) => (
            <animated.line
              x1={index * 10}
              y1={0}
              x2={index * 10}
              y2={y2}
              key={index}
              strokeWidth={STROKE_WIDTH}
              stroke="currentColor"
            />
          ))}
        </g>
        {/* 方块 */}
        {boxSprings.map(({ scale }, index) => (
          <animated.rect
            key={index}
            width={10}
            height={10}
            fill="currentColor"
            style={{
              transform: `translate(${COORDS[index][0]}px, ${COORDS[index][1]}px)`,
              transformOrigin: `5px 5px`,
              scale,
            }}
          />
        ))}
      </svg>
    </div>
  )
}

// 过渡动画
interface PageItem {
  (props: AnimatedProps<{ style: CSSProperties }>): React.ReactElement
}

const pages: Array<PageItem> = [
  ({ style }) => <animated.div style={{ ...style, background: 'lightpink' }}>A</animated.div>,
  ({ style }) => <animated.div style={{ ...style, background: 'lightblue' }}>B</animated.div>,
  ({ style }) => <animated.div style={{ ...style, background: 'lightgreen' }}>C</animated.div>,
]

function SpringTransition() {
  const [index, set] = useState(0);

  const onClick = () => set(state => (state + 1) % 3);

  const transitions = useTransition(index, {
    from: { transform: 'translate3d(100%,0,0)' },
    enter: { transform: 'translate3d(0%,0,0)' },
    leave: { transform: 'translate3d(-100%,0,0)' },
  })

  return (
    <div className={style.transition_container} onClick={onClick}>
      {transitions((style, i) => {
        const Page = pages[i]
        return <Page style={style} />
      })}
    </div>
  )
}

export default function SpringBase() {
  return (
    <div style={{ maxHeight: 'calc(100vh - 270px)', overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}>
      <h2>动画API：</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr' }}>
        <div>
          单个属性变化
          <Spring1></Spring1>
        </div>
        <div>
          多个属性变化
          <Spring2></Spring2>
        </div>
        <div>
          多个元素多个属性 并行执行动画
          <Spring3></Spring3>
        </div>
        <div>
          多个元素多个属性 依次执行动画
          <Spring4></Spring4>
        </div>
        <div>
          多个动画 顺序执行
          <Spring5></Spring5>
        </div>
      </div>
      <h2>😀demo：</h2>
      <Smile></Smile>
      <h2>过渡动画：</h2>
      <SpringTransition></SpringTransition>
    </div>
  )
}