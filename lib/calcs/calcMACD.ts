
/**
 * 计算EMA指数平滑移动平均线，用于MACD
 * EMA算法
 * EMA(N) = 2/(N+1)*C + (N-1)/(N+1)*EMA', EMA'为前一天的ema; 通常N取12和26
 * @param {number} n 时间窗口
 * @param {array} data 输入数据
 */
 export function EMA(data: Array<number>, n: number): Array<number> {
    const a = 2 / (n + 1);
    const ema: Array<number> = [data[0]];
  
    for (let index = 1; index < data.length; index++) {
      const element = data[index];
      ema.push(a * element + ((n - 1) / (n + 1)) * ema[index - 1]);
    }
    return ema;
  }
  
  /**
   * 计算DIF快线，用于MACD
   * @param {array} data 输入数据
   * @param {number} short 快速EMA时间窗口
   * @param {number} long 慢速EMA时间窗口
   */
  export function DIF(data: Array<number>, short = 12, long = 26): Array<number> {
    const dif: Array<number> = [];
    const emaShort = EMA(data, short);
    const emaLong = EMA(data, long);
    for (let index = 0; index < data.length; index++) {
      const num = Number(emaShort[index] - emaLong[index]);
      dif.push(num);
    }
    return dif;
  }
  
  /**
   * 计算DEA慢线，用于MACD
   * @param {number} mid 对dif的时间窗口
   * @param {array} dif 输入数据
   * @param  {number} n 对dif的时间窗口
   * @returns
   */
  export function DEA(dif: Array<number>, n = 9): Array<number> {
    return EMA(dif, n);
  }
  
  /**
   * 计算macd数据
   * @param data {array} 输入的数据，一般为收盘价的list
   * @param short {number} 计算快速ema时间窗口
   * @param long {number}  计算慢速ema时间窗口
   * @param mid {number}  计算dea时间窗口
   * @returns {OBJECT} 返回macd对象
   */
  export function MACD(
    data: Array<number>,
    short = 12,
    long = 26,
    mid = 9
  ): {
    [key: string]: Array<number>;
  } {
    const macd: Array<number> = [];
  
    const dif = DIF(data, short, long);
    const dea = DEA(dif, mid);
    for (let index = 0; index < macd.length; index++) {
      macd.push(Number(dif[index] - dea[index]) * 2);
    }
    return {
      dif,
      dea,
      macd,
    };
  }