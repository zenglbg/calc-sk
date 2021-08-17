
// export function WR(dayCount: number,times: Array<number>, data: Array<Array<number>>) {
//     let minSet: Array<number|string> = [];
//     let maxSet: Array<number|string> = [];
//     let result = [];
//     for (var i = 0; i < times.length; i++) {
//       if (i < dayCount) {
//         minSet.push("-");
//         maxSet.push("-");
//         continue;
//       }
//       var tmpArrMin = [];
//       var tmpArrMax = [];
//       for (var j = 0; j < dayCount; j++) {
//         tmpArrMin.push(data[i - j][2]);
//         tmpArrMax.push(data[i - j][3]);
//       }
//       minSet.push(Math.min.apply(null, tmpArrMin));
//       maxSet.push(Math.max.apply(null, tmpArrMax));
//     }
//     result = data.map((item, index) => {
//       if (index < dayCount) return "-";
//       return Number(
//         (
//           (((Number(maxSet[index]) || 0) - item[1]) / ((Number(maxSet[index]) || 0) - (Number(minSet[index]) || 0))) *
//           100
//         ).toFixed(5)
//       );
//     });
//     return result;
//   }


//  export function VR (dayCount: number,times: Array<number>, data: Array<Array<number>>) {
//     let UVS = [];
//     let DVS = [];
//     let PVS = [];
//     let result = [];
//     for (var i = 0; i < times.length; i++) {
//       if (i < dayCount) {
//         UVS.push("-");
//         DVS.push("-");
//         PVS.push("-");
//         result.push("-");
//         continue;
//       }
//       var tmpUVS = 0;
//       var tmpDVS = 0;
//       var tmpPVS = 0;
//       for (var j = 0; j < dayCount; j++) {
//         if (data[i - j][1] - data[i - j][0] > 0) {
//           tmpUVS += Number(data.vols[i - j]);
//         } else if (data[i - j][1] - data[i - j][0] < 0) {
//           tmpDVS += Number(data.vols[i - j]);
//         } else {
//           tmpPVS += Number(data.vols[i - j]);
//         }
//       }
//       UVS.push(tmpUVS);
//       DVS.push(tmpDVS);
//       PVS.push(tmpPVS);
//       result.push(
//         Number(
//           ((UVS[i] + (1 / 2) * PVS[i]) / (DVS[i] + (1 / 2) * PVS[i])).toFixed(5)
//         )
//       );
//     }
//     return result;
//   }
//   calcCCI: function (dayCount, data) {
//     var result = [];
//     var maData = line.calculateMA(dayCount, data);
//     var mdData = line.md(dayCount, data, maData);
//     result = data.datas.map((item, index) => {
//       let tp = (item[3] + item[2] + item[1]) / 3;
//       return Number(((tp - maData[index]) / mdData[index] / 0.015).toFixed(5));
//     });
//     return result;
//   }
//   calcBIAS: function (dayCount, data) {
//     var result = [];
//     var ma = line.calculateMA(dayCount, data);
//     for (var i = 0; i < data.times.length; i++) {
//       if (i < dayCount) {
//         result.push("-");
//         continue;
//       }
//       result.push(
//         Number((((data.datas[i][1] - ma[i]) / ma[i]) * 100).toFixed(5))
//       );
//     }
//     return result;
//   }