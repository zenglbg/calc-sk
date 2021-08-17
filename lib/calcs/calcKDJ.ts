

/**
 * 计算LnHn数据
 * Ln为之前n日内的最低价；
 * Hn为之前n日内的最高价。
 * @param data {array} 输入的数据，一般为收盘价的list
 * 开盘
 * 收盘
 * 最低
 * 最高
 * 成交量
 * @param n {number}  周期（n日、n周等）
 * @returns {OBJECT} 返回macd对象
 */
 export function LnHn (data: Array<Array<number>>, n: number) {
    var lList = [];
      var hList = [];
      for (var i = 0; i < data.length; i++) {
        if (i < n) {
          lList.push("-");
          hList.push("-");
          continue;
        }
        var tmpL = [];
        var tmpH = [];
        for (var j = 0; j < n; j++) {
          tmpL.push(data[i - j][2]);
          tmpH.push(data[i - j][3]);
        }
        lList.push(Math.min.apply(null, tmpL));
        hList.push(Math.max.apply(null, tmpH));
      }
      return {
        min: lList,
        max: hList
      };
  }
  
  /**
   * 未成熟随机值（即RSV值）
   * @param dayCount 周期
   * @param data 开盘价数组
   * @param LnHn 周期内最低最高价OBJECT
   * @returns Array
   */
  export function RSV (dayCount: number, data: Array<number>, LnHn: {min: Array<number | string>,max: Array<number | string>,}) {
    var result = [];
      for (var i = 0; i < data.length; i++) {
        if (i < dayCount) {
          result.push("-");
          continue;
        }
        if(typeof LnHn.min[i] === 'string' || typeof LnHn.max[i] === 'string')
        {
          result.push('-')
        }else {
          result.push(
            ((data[i] - Number(LnHn.min[i])) / (Number(LnHn.max[i]) - Number(LnHn.min[i]))) * 100
          );
        }
    
      }
      return result;
  }
  
  /**
   * 
   * @param dayCount 
   * @param data 
   * @param rsvData 未成熟随机值（即RSV值）
   * @returns 
   */
  export  function K(dayCount : number, len: number, rsvData: Array<number | string>) {
    var arr = [];
    for (var i = 0; i < len; i++) {
      if (i < dayCount) {
        arr.push(50);
        continue;
      }
      if(typeof rsvData[i] === 'string')
      {
        arr.push(50)
      } else {
        arr.push(
          Number(((2 / 3) * arr[i - 1] + (1 / 3) * Number(rsvData[i])).toFixed(5))
        );
      }
    }
    return arr;
  }
  
  export  function D(dayCount : number, len: number, k: Array<number>) {
    var arr = [];
    for (var i = 0; i < len; i++) {
      if (i < dayCount) {
        arr.push(50);
        continue;
      }
      arr.push(Number(((2 / 3) * arr[i - 1] + (1 / 3) * k[i]).toFixed(5)));
    }
    return arr;
  }
  
  export  function J (dayCount : number, k: Array<number>, d: Array<number>) {
    var arr = [];
    for (var i = 0; i < k.length; i++) {
      if (i < dayCount) {
        arr.push("-");
        continue;
      }
      arr.push(Number((3 * k[i] - 2 * d[i]).toFixed(5)));
    }
    return arr;
  }
  
  export  function KDJ (dayCount: number, data: Array<Array<number>>) {
    var LnHnData = LnHn( data, dayCount);
    var rsvData = RSV(dayCount, data.map(val => val[1]), LnHnData);
    var k = K(dayCount, data.length, rsvData);
    var d = D(dayCount, data.length, k);
    var j = J(dayCount, k, d);
    return {
      k: k,
      d: d,
      j: j
    };
  }
  