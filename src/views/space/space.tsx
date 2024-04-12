import Space from "../../components/Space"
import "./index.scss"
import { ConfigProvider } from '../../components/Space/ConfigProvider';
import { useEffect, useState } from "react";

function getPageData(page: number) {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve({
        data: `第 ${page} 页 数据列表`,
        page
      })
    }, 3000 * Math.random())
  })
}

function SpaceView() {
  const [query, setQuery] = useState(0)
  const [data, setData] = useState({ data: '', page: 0 })
  const inputChange = function (e: any) {
    setQuery(e.target.value)
  }

  useEffect(() => {
    let ignore = false;
    getPageData(query).then((data) => {
      if (!ignore) setData(data);
    })

    // 修复竞态问题
    return () => {
      ignore = true;
    };
  }, [query])

  return (
    <div>
      <ConfigProvider space={{ size: 20 }}>
        <Space direction="horizontal">
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </Space>
        <Space direction="vertical">
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </Space>
      </ConfigProvider>

      <div>
        <h2>竞态问题</h2>
        搜索：<input type="text" onChange={inputChange}></input>
        <span>{query}</span>
        <div>
          <div>数据：{data.data}</div>
          <div>页数：{data.page}</div>
        </div>
      </div>
    </div>
  )
}

export default SpaceView