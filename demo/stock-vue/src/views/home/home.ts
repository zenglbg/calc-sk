import data from "../data";
import { init } from "echarts";
import { Ref } from "vue";
import dayjs from "dayjs";
function calculateMA(
  data: Array<number>,
  dayCount: number
): Array<number | string> {
  /**
   * 1、MA(X，N)，求X的N日移动均匀值。算法是：
   *   (X1+X2+X3+…..+Xn)/N
   * 例如：MA(C，20)表示20日的均匀收盘价。C表示CLOSE。
   */
  const result = [];
  for (let i = 0, len = data.length; i < len; i++) {
    if (i < dayCount) {
      result.push("-");
      continue;
    }
    let sum = 0;
    for (let j = 0; j < dayCount; j++) {
      sum = sum + data[i - j];
    }
    result.push(sum / dayCount);
  }
  return result;
}
/*
 * 计算EMA指数平滑移动平均线，用于MACD
 * EMA算法
 * EMA(N) = 2/(N+1)*C + (N-1)/(N+1)*EMA', EMA'为前一天的ema; 通常N取12和26
 * @param {number} n 时间窗口
 * @param {array} data 输入数据
 * @param {string} field 计算字段配置
 */
function calculateEMA(data: Array<number>, n: number) {
  const a = 2 / (n + 1);
  const ema: Array<number> = [data[0]];

  for (let index = 1; index < data.length; index++) {
    const element = data[index];
    ema.push(a * element + ((n - 1) / (n + 1)) * ema[index - 1]);
  }
  return ema;
}

export function drawChart(wrap: Ref<HTMLElement | undefined>) {
  const myChart = wrap.value && init(wrap.value);
  const klineData = data.data.map((r) => [r[2], r[3], r[5], r[4]]);
  const xData = data.data.map(([t]) =>
    dayjs(t * 1000).format("YYYY/MM/DD hh:mm")
  );
  myChart &&
    myChart.setOption({
      title: {
        text: "ECharts 入门示例",
      },
      tooltip: {},
      dataZoom: [
        {
          type: "inside",
          start: 90,
          end: 100,
        },
      ],
      xAxis: [
        {
          type: "category",
          data: xData,
          splitLine: {
            // 坐标轴在 grid 区域中的分隔线
            lineStyle: {
              color: ["#f3f3f3"],
            },
          },
        },
      ],
      yAxis: [
        {
          scale: true,
          splitArea: {
            show: true,
          },
        },
      ],
      series: [
        { type: "candlestick", data: klineData },
        {
          name: "ma5",
          type: "line",
          data: calculateMA(
            klineData.map((r) => r[1]),
            5
          ),
        },
        {
          name: "ma10",
          type: "line",
          data: calculateMA(
            klineData.map((r) => r[1]),
            10
          ),
        },
        {
          name: "ma30",
          type: "line",
          data: calculateMA(
            klineData.map((r) => r[1]),
            30
          ),
        },
        {
          name: "ma50",
          type: "line",
          data: calculateMA(
            klineData.map((r) => r[1]),
            50
          ),
        },
        {
          name: "ema",
          type: "line",
          data: calculateEMA(
            klineData.map((r) => r[1]),
            100
          ),
        },
      ],
    });
}
