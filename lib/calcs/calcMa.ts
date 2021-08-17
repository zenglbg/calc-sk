/**
 * 1、MA(X，N)，求X的N日移动均匀值。算法是：
 *   (X1+X2+X3+…..+Xn)/N
 * 例如：MA(C，20)表示20日的均匀收盘价。C表示CLOSE。
 * @param data Array<收盘(close)>
 * @param dayCount number 天数
 * @returns 数组
 */
export function MA(
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
