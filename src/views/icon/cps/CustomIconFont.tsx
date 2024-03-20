import { createFromIconfont } from '../../../components/Icon/createFromtIconfont';

const IconFont = createFromIconfont('//at.alicdn.com/t/c/font_4443338_a2wwqhorbk4.js');

function CustomIconFont() {
  return (
    <div>
      <IconFont type="icon-shouye-zhihui" size="50px"></IconFont>
      <IconFont type="icon-gerenzhongxin-zhihui" fill="blue" size="50px"></IconFont>
    </div>
  );
}

export default CustomIconFont;

