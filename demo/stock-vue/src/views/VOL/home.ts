import data from "../data";
import { init } from "echarts";
import { Ref } from "vue";
import dayjs from "dayjs";

export function drawChart(wrap: Ref<HTMLElement | undefined>) {
  const myChart = wrap.value && init(wrap.value);
  const valData = data.data.map((r) => r[6]);
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
      series: [{ type: "bar", data: valData }],
    });
}
