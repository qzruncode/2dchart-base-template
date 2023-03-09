/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import EWChart from 'ewchart';
import { Breadcrumb, Button } from 'antd';
import { disOrder } from './helper';

const des = `
1. 在实际开发中可能会遇到要对两个图进行实时对比的场景，为了能够实现这一功能，ewchart在tooltip上提供了协同tooltip
2. 示例代码
  <EWChart
    ...
    method={{
      onMove: handleMove,
    }}
    interactive={{
      mouse: {
        group: "one", // 分组，开启同组交互协同
        crossText: true, // 是否展示y坐标实时文本
      },
    }}
  />
  <EWChart
    ...
    method={{
      onMove: handleMove,
    }}
    interactive={{
      mouse: {
        group: "two", // 分组，开启同组交互协同
        crossText: true, // 是否展示y坐标实时文本
      },
    }}
  />
  <EWChart
    ...
    method={{
      onMove: handleMove,
    }}
    interactive={{
      mouse: {
        group: "two", // 分组，开启同组交互协同
        crossText: true, // 是否展示y坐标实时文本
      },
    }}
  />
  <EWChart
    ...
    method={{
      onMove: handleMove,
    }}
    interactive={{
      mouse: {
        group: "one", // 分组，开启同组交互协同
        crossText: true, // 是否展示y坐标实时文本
      },
    }}
  />
`;

const arr1 = [
  75,
  25,
  90,
  251,
  208,
  null,
  null,
  null,
  null,
  60,
  170,
  248,
  52,
  238,
  96,
  132,
  68,
  253,
  163,
  98,
  107,
  155,
  110,
  82,
  93,
  148,
  185,
  111,
  55,
  63,
];

const chartSizeParams = {
  // 宽度自适应
  height: 300,
  top: 20,
  right: 30,
  bottom: 30,
  left: 30,
};

const LineChart = ({ group }) => {
  const tooltipRef = useRef(null);
  const [toDay, setToDay] = useState(arr1);

  useEffect(() => {
    const ob = observer();
    tooltipRef.current && ob.observe(tooltipRef.current);
    return () => {
      ob.disconnect();
    };
  }, []);

  const observer = () => {
    const ob = new IntersectionObserver(
      entries => {
        if (entries[0].intersectionRatio > 0 && entries[0].intersectionRatio < 1) {
          entries[0].target.style.left =
            entries[0].target.parentElement.offsetWidth - entries[0].target.offsetWidth + 'px';
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: [0.1, 0.5, 1],
      }
    );
    tooltipRef.current && ob.observe(tooltipRef.current);
    return ob;
  };

  const handleMove = (
    type: 'enter' | 'move' | 'leave', // 鼠标事件类型
    data: Array<{ color?: string; label: string; value: number | null; x?: number; y?: number }>, // 当前点的信息
    position: { x: number; y: number } // 鼠标的实时位置
  ) => {
    if (tooltipRef.current) {
      if (type === 'move') {
        const maxOffsetX = position.x + tooltipRef.current.offsetWidth + 20;
        if (maxOffsetX < tooltipRef.current.parentElement.offsetWidth) {
          tooltipRef.current.style.left = position.x + 20 + 'px';
        }

        tooltipRef.current.style.top = position.y + tooltipRef.current.offsetHeight + 20 + 'px';
        let html = '';
        data.forEach(d => {
          html += `<div className="title"><span>${d.label}</span>：<span>${d.value}</span></div>`;
        });
        if (html === '') {
          tooltipRef.current.style.display = 'none';
        } else {
          tooltipRef.current.style.display = 'block';
          tooltipRef.current.innerHTML = html;
        }
      } else if (type === 'enter') {
        tooltipRef.current.style.display = 'block';
      } else if (type === 'leave') {
        tooltipRef.current.style.display = 'none';
      }
    }
  };

  return (
    <div className="my-chart" style={{ flex: '1', minWidth: 500 }}>
      <Button
        onClick={() => {
          setToDay(disOrder(toDay));
        }}>
        刷新
      </Button>

      <EWChart
        type="line"
        size={chartSizeParams}
        data={{
          x: {
            start: 1677658584000, // 时间戳
            end: 1677658614000, // 时间戳
            interval: 1000, // 1秒，每个点的时间间隔
          },
          y: {
            start: 10,
            end: 300,
          },
          yUnit: 'K',
          groups: [
            {
              lineType: 'solid',
              label: '今天',
              break: 'line',
              breakType: 'dotted',
              values: toDay,
            },
          ],
        }}
        method={{
          onMove: handleMove,
        }}
        interactive={{
          group: group, // 分组，开启同组交互协同
          mouse: {
            crossText: true, // 是否展示y坐标实时文本
          },
        }}
      />

      <div className="chart-tooltip" ref={tooltipRef}></div>
    </div>
  );
};

const Tooltip = () => {
  return (
    <div className="test_box">
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <LineChart group="one" />
        <LineChart group="two" />
        <LineChart group="two" />
        <LineChart group="one" />
      </div>

      <pre>
        <code>{des}</code>
      </pre>
    </div>
  );
};

export default Tooltip;
