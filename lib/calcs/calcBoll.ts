
import {MA} from './calcMa';
/**
 * 
 * @param dayCount 周期
 * @param times 时间
 * @param data 收盘价数组
 * @param maData ma数据
 * @returns Array
 */
 export  function md(dayCount: number, times: Array<number>,data: Array<number>, maData:Array<number|string>) {
    var result = [];
    for (var i = 0, len = times.length; i < len; i++) {
      if (i < dayCount) {
        result.push("-");
        continue;
      }
      var sum = 0;
      for (var j = 0; j < dayCount; j++) {
        sum += Math.pow(data[i - j] - (Number(maData[i]) || 0), 2);
      }
      result.push(Number(Math.sqrt(sum / dayCount).toFixed(5)));
    }
    return result;
  }
  
   export function up(dayCount: number, n: number, mdData: Array<number|string>, mbData: Array<number|string>) {
    var result = [];
    for (var i = 0, len = mdData.length; i < len; i++) {
      if (i < dayCount) {
        result.push("-");
        continue;
      }
      result.push(
        Number((Number(mbData[i]) + n * (Number(mdData[i]) || 1)).toFixed(5))
      );
    }
    return result;
  }

  export function dn (dayCount: number, n: number, mdData: Array<number|string>, mbData: Array<number|string>) {
    var result = [];
    for (var i = 0, len = mdData.length; i < len; i++) {
      if (i < dayCount) {
        result.push("-");
        continue;
      }
      result.push(Number(((Number(mbData[i]) || 0) - n * (Number(mdData[i]) || 1)).toFixed(5)));
    }
    return result;
  }

  export function BOLL (dayCount: number,times: Array<number>, data: Array<number>) {
    var maData = MA(data, dayCount);
    var mdData = md(dayCount,times, data, maData);
    var mbData = MA( data, dayCount - 1);
    var upData = up(dayCount, 2, mdData, mbData);
    var dnData = dn(dayCount, 2, mdData, mbData);
    return {
      ma: maData,
      mb: mbData,
      up: upData,
      dn: dnData
    };
  }

  