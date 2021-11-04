const jsSHA = require("jssha");
const getAuthHeader = () => {
  const AppID = "2dfbcb68d0e04fb5bc9d1f59f2e3df35";
  const AppKey = "HmEvi7uEhV77UNGt-MYo6ETs43E";
  const GMTString = new Date().toGMTString();
  const ShaObj = new jsSHA("SHA-1", "TEXT");
  ShaObj.setHMACKey(AppKey, "TEXT");
  ShaObj.update("x-date: " + GMTString);
  const HMAC = ShaObj.getHMAC("B64");
  const Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;
  return { Authorization: Authorization, "X-Date": GMTString };
};

// 抓取 景點/餐飲/旅宿/活動 相關資料
// mode => ScenicSpot/Restaurant/Hotel/Activity
const getTravelInfo = (mode, top, skip, city = "") => {
  let url = "https://ptx.transportdata.tw/MOTC/v2/Tourism/";
  url += `${mode}/${city}?$top=${top}&$skip=${skip}&$format=JSON`;
  return fetch(url, { headers: getAuthHeader }).then((res) => res.json());
};

// 抓取 景點/餐飲/旅宿/活動 鄰近相關資料

const getNearbyTravelInfo = (mode, top, skip, lat, lon, meters, city = "") => {
  let url = "https://ptx.transportdata.tw/MOTC/v2/Tourism/";
  url += `${mode}/${city}?$top=${top}&$skip=${skip}&$spatialFilter=nearby(${lat}%2C${lon}%2C${meters})&$format=JSON`;
  return fetch(url, { headers: getAuthHeader }).then((res) => res.json());
};

export { getTravelInfo, getNearbyTravelInfo };
