export function WR(
  dayCount: number,
  times: Array<number>,
  data: Array<Array<number>>
) {
  let minSet: Array<number | string> = [];
  let maxSet: Array<number | string> = [];
  let result = [];
  for (var i = 0; i < times.length; i++) {
    if (i < dayCount) {
      minSet.push("-");
      maxSet.push("-");
      continue;
    }
    var tmpArrMin = [];
    var tmpArrMax = [];
    for (var j = 0; j < dayCount; j++) {
      tmpArrMin.push(data[i - j][2]);
      tmpArrMax.push(data[i - j][3]);
    }
    minSet.push(Math.min.apply(null, tmpArrMin));
    maxSet.push(Math.max.apply(null, tmpArrMax));
  }
  result = data.map((item, index) => {
    if (index < dayCount) return "-";
    return Number(
      (
        (((Number(maxSet[index]) || 0) - item[1]) /
          ((Number(maxSet[index]) || 0) - (Number(minSet[index]) || 0))) *
        100
      ).toFixed(5)
    );
  });
  return result;
}
