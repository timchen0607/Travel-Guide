// 抓取 景點/餐飲/旅宿/活動 相關資料
// mode => ScenicSpot/Restaurant/Hotel/Activity
const getTravelInfo = (mode, top, skip, city = "") => {
  let url = "https://ptx.transportdata.tw/MOTC/v2/Tourism/";
  url += `${mode}/${city}?$top=${top}&$skip=${skip}&$format=JSON`;
  console.log(url);
  return fetch(url).then((res) => res.json());
};

// 抓取 景點/餐飲/旅宿/活動 鄰近相關資料

const getNearbyTravelInfo = (mode, top, skip, lat, lon, meters, city = "") => {
  let url = "https://ptx.transportdata.tw/MOTC/v2/Tourism/";
  url += `${mode}/${city}?$top=${top}&$skip=${skip}&$spatialFilter=nearby(${lat}%2C${lon}%2C${meters})&$format=JSON`;
  return fetch(url).then((res) => res.json());
};

export { getTravelInfo, getNearbyTravelInfo };
