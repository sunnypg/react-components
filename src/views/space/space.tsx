import Space from "../../components/Space"
import "./index.scss"
import { ConfigProvider } from '../../components/Space/ConfigProvider';

function SpaceView() {
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
    </div>
  )
}

export default SpaceView