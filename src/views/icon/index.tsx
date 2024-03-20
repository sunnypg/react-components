// 通过 antd 扩展的图标组件
import HeartIcon from "./cps/CustomAntdIcon";
// 通过 antd 和 iconfont 封装图标组件
import { Space } from 'antd';
import IconFont from "./cps/AntdIconFont";
// 自定义图标组件
import IconAdd from "./cps/IconAdd";
import IconEmail from "./cps/IconEmail";
// 自定义 iconfont 图标组件
import CustomIconFont from "./cps/CustomIconFont";

function IconView() {
  return (
    <div>
      <div>
        <h2>通过 antd 扩展的图标组件:</h2>
        <HeartIcon style={{ color: 'pink', fontSize: 50 }} />
      </div>
      <div >
        <h2>通过 antd 和 iconfont 封装图标组件:</h2>
        <Space>
          <IconFont type="icon-tuichu" style={{ fontSize: 50 }} />
          <IconFont type="icon-facebook" style={{ fontSize: 50 }} />
          <IconFont type="icon-twitter" style={{ fontSize: 50 }} />
        </Space>
      </div>
      <div>
        <h2>自定义图标组件:</h2>
        <IconAdd size="50px"></IconAdd>
        <IconEmail size="50px" spin></IconEmail>
      </div>
      <div>
        <h2>自定义 iconfont 图标组件:</h2>
        <CustomIconFont></CustomIconFont>
      </div>
    </div>
  )
}

export default IconView