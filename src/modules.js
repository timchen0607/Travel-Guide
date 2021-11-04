// API 驗證
import jsSHA from "jssha/dist/sha1";
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
const getTravelInfo = (mode, skip = 0, city = "") => {
  let url = "https://ptx.transportdata.tw/MOTC/v2/Tourism/";
  url += `${mode}/${city}?$top=20&$skip=${skip}&$filter=Picture/PictureUrl1 ne null&$format=JSON`;
  return fetch(url, { headers: getAuthHeader() }).then((res) => res.json());
};

// 抓取 景點/餐飲/旅宿/活動 鄰近相關資料
// mode => ScenicSpot/Restaurant/Hotel/Activity
const getNearbyInfo = (mode, lat, lon, meters = 10000, skip = 0) => {
  let url = "https://ptx.transportdata.tw/MOTC/v2/Tourism/";
  url += `${mode}?$top=20&$skip=${skip}&$spatialFilter=nearby(${lat}%2C${lon}%2C${meters})&$filter=Picture/PictureUrl1 ne null&$format=JSON`;
  return fetch(url, { headers: getAuthHeader() }).then((res) => res.json());
};

export { getTravelInfo, getNearbyInfo };
