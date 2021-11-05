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

const perPage = 20; // 每頁顯示筆數
// mode => ScenicSpot/Restaurant/Hotel/Activity
// $count=true 查看 API 剩餘次數

// 抓取 景點/餐飲/旅宿/活動 相關資料
const getTravelInfo = (mode, city, keyword, page = 1) => {
  city = city === "Taiwan" ? "" : city;
  let url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/${mode}/${city}?`;
  url += `$top=${perPage}&$skip=${(page - 1) * perPage}&$format=JSON`;
  url += `&$select=ID,Name,Description,Address,Picture`;
  if (mode !== "ScenicSpot") url += ",Class";
  if (mode === "Activity") url += "1,Class2";
  url += `&$filter=Picture/PictureUrl1 ne null`;
  if (keyword)
    url += ` and (contains(Name,'${keyword}') or contains(Description,'${keyword}') or contains(Address,'${keyword}'))`;
  console.log(url);
  return fetch(url, { headers: getAuthHeader() }).then((res) => res.json());
};

// 抓取 景點/餐飲/旅宿/活動 鄰近相關資料
const getNearbyInfo = (mode, lat, lon, page = 1) => {
  let url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/${mode}?`;
  url += `$top=${perPage}&$skip=${(page - 1) * perPage}&$format=JSON`;
  url += `&$select=ID,Name,Description,Address,Picture`;
  if (mode !== "ScenicSpot") url += ",Class";
  if (mode === "Activity") url += "1,Class2";
  url += `&$spatialFilter=nearby(${lat},${lon},50000)`;
  url += `&$filter=Picture/PictureUrl1 ne null`;
  return fetch(url, { headers: getAuthHeader() }).then((res) => res.json());
};

// 取得單筆資料
const getDetail = (ID) => {
  const classID = ID.split("_")[0];
  let mode = null;
  if (classID === "C1") mode = "ScenicSpot";
  else if (classID === "C2") mode = "Activity";
  else if (classID === "C3") mode = "Restaurant";
  else if (classID === "C4") mode = "Hotel";
  else throw new Error("Wrong parameter.");
  let url = "https://ptx.transportdata.tw/MOTC/v2/Tourism/";
  url += `${mode}/?$filter=ID eq '${ID}'&$format=JSON`;
  return fetch(url, { headers: getAuthHeader() }).then((res) => res.json());
};

// 資料篩選功能
const dataFilter = (arr, count = 4) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    if (!arr.length) return;
    const idx = Math.floor(Math.random() * arr.length);
    result.push(arr[idx]);
    arr.splice(idx, 1);
  }
  return result;
};

export { getTravelInfo, getNearbyInfo, getDetail, dataFilter };
