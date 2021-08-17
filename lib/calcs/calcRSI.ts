
export function RSI(dayCount: number,times: Array<number>, data: Array<number | string>) {
    var result = [];
    for (var i = 0, len = times.length; i < len; i++) {
      if (i < dayCount) {
        result.push("-");
        continue;
      }
      var a = 0;
      var b = 0;
      var tmp = 0;
      for (var j = 0; j < dayCount; j++) {
        tmp = (Number(data[i - j]) || 0) - (Number(data[i - j - 1]) || 0);
        if (tmp >= 0) {
          a += tmp;
        } else {
          b += tmp;
        }
      }
      result.push(Number(((a / (a + b * -1)) * 100).toFixed(5)));
    }
    return result;
  }

  