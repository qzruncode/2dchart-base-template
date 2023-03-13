import React from 'react';
const des = `
ewchart是专门将数据绘制成二维图形
1. 开发ewchart的目的：我在开发业务需求过程中会经常遇到各种定制化的需求，然而现在的开源绘图工具大多写的太死，ewchart中只包含必要的绘图元素，诸如tooltip，foottab这类完全由用户自定义实现
2. 支持的图形类别：折线图、面积图、饼图、直方图、散点图、树形图
3. 未来的计划：持续提供更多的绘图功能
4. 如果你的项目还有很多特殊绘图功能ewchart无法实现的，你可以下载ewchart源码，自行修改
`;

function ReadMe() {
  return (
    <div>
      <pre>
        <code>{des}</code>
      </pre>
    </div>
  );
}

export default ReadMe;
