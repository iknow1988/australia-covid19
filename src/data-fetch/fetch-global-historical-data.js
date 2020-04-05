const { NovelCovid } = require('novelcovid');
const { write } = require('./file-manager');
const {getHistoricalData } = require('./utils');

const fetchTop5GlobalHistoricalData = async () => {
  const track = new NovelCovid();
  const dailyData = await track.histroical(null);
  const globalHistoricalDailyData = [];
  
  const top5 = dailyData.sort((a, b) => {
    const aKey = Object.keys(a.timeline.cases);
    const bKey = Object.keys(b.timeline.cases);
    return b.timeline.cases[bKey[bKey.length - 1]] - a.timeline.cases[aKey[aKey.length - 1]];
  }).slice(0, 5);
  
  top5.forEach(function(obj){
    globalHistoricalDailyData.push({
      country: obj.country,
      data: getHistoricalData(obj.timeline).filter( x => x.id === "confirmed")[0].data
    });
  });
  write('./src/data/global_historical_data.json', JSON.stringify(globalHistoricalDailyData));
}


module.exports = fetchTop5GlobalHistoricalData;