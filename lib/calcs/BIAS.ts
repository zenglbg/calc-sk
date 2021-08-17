
import { MA } from './calcMa';

/**
 * 计算BIAS
 * @param dayCount 周期 number
 * @param times Array(时间)
 * @param data Array(收盘价)
 * @returns Array
 */
export function BIAS (dayCount: number,times: Array<number>, data: Array<number>) {
    var result = [];
    var ma = MA(data, dayCount);
    for (var i = 0; i < times.length; i++) {
        if (i < dayCount) {
        result.push("-");
        continue;
        }
        result.push(
        Number((((data[i] - (Number(ma[i]) || 0)) / (Number(ma[i]) || 1)) * 100).toFixed(5))
        );
    }
    return result;
}