// API 驗證
import jsSHA from "jssha/dist/sha1";
const getAuthHeader = () => {
  const AppID = process.env.VUE_APP_APP_ID
  const AppKey = process.env.VUE_APP_APP_KEY
  const GMTString = new Date().toGMTString();
  const ShaObj = new jsSHA("SHA-1", "TEXT");
  ShaObj.setHMACKey(AppKey, "TEXT");
  ShaObj.update("x-date: " + GMTString);
  const HMAC = ShaObj.getHMAC("B64");
  const Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;
  return { Authorization: Authorization, "X-Date": GMTString };
};

const perPage = 18; // 每頁顯示筆數
// mode => ScenicSpot/Restaurant/Hotel/Activity
// $count=true 查看 API 剩餘次數

// 抓取 景點/餐飲/旅宿/活動 相關資料
const getTravelInfo = (mode, city, page = 1, keyword = null) => {
  city = city === "Taiwan" ? "" : city;
  let url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/${mode}/${city}?`;
  url += `$top=${perPage}&$skip=${(page - 1) * perPage}&$format=JSON`;
  url += `&$select=ID,Name,Address,Picture`;
  if (mode === "ScenicSpot") url += ",Class1,Class2,Class3,OpenTime,TicketInfo";
  if (mode === "Restaurant") url += ",Class,OpenTime";
  if (mode === "Hotel") url += ",Class";
  if (mode === "Activity") url += ",Class1,Class2";
  url += `&$filter=Picture/PictureUrl1 ne null`;
  if (keyword) {
    let filter = "";
    keyword.split(",").forEach((k) => {
      filter += ` or contains(Name,'${k}')`;
      filter += ` or contains(Description,'${k}')`;
      filter += ` or contains(Address,'${k}')`;
      if (mode === "Restaurant" || mode === "Hotel")
        filter += ` or contains(Class,'${k}')`;
      if (mode === "ScenicSpot" || mode === "Activity")
        filter += ` or contains(Class1,'${k}') or contains(Class2,'${k}')`;
      if (mode === "ScenicSpot") filter += ` or contains(Class3,'${k}')`;
    });
    filter = filter.replace(" or ", "");
    url += ` and (${filter})`;
  }
  return fetch(url, { headers: getAuthHeader() }).then((res) => res.json());
};

// 抓取 景點/餐飲/旅宿/活動 鄰近相關資料
const getNearbyInfo = (mode, lat, lon, page = 1) => {
  let url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/${mode}?`;
  url += `$top=${perPage}&$skip=${(page - 1) * perPage}&$format=JSON`;
  url += `&$select=ID,Name,Address,Picture`;
  if (mode === "ScenicSpot") url += ",Class1,Class2,Class3,OpenTime,TicketInfo";
  if (mode === "Restaurant") url += ",Class,OpenTime";
  if (mode === "Hotel") url += ",Class";
  if (mode === "Activity") url += ",Class1,Class2";
  url += `&$spatialFilter=nearby(${lat},${lon},50000)`;
  url += `&$filter=Picture/PictureUrl1 ne null`;
  return fetch(url, { headers: getAuthHeader() }).then((res) => res.json());
};

// 取得單筆資料
const getDetail = (ID) => {
  let url = "https://ptx.transportdata.tw/MOTC/v2/Tourism/";
  url += `${getMode(ID, true)}/?$filter=ID eq '${ID}'&$format=JSON`;
  return fetch(url, { headers: getAuthHeader() })
    .then((res) => res.json())
    .then((res) => {
      if (res.length === 0) throw new Error();
      res[0].modeName = getMode(res[0].ID);
      if (res[0].Description)
        res[0].Description = res[0].Description.split("。").join("。\n\n");
      if (res[0].DescriptionDetail)
        res[0].DescriptionDetail =
          res[0].DescriptionDetail.split("。").join("。\n\n");
      if (res[0].TravelInfo)
        res[0].TravelInfo = res[0].TravelInfo.split("。").join("。\n\n");
      if (res[0].ParkingInfo) res[0].ParkingInfo = res[0].ParkingInfo + "\n\n";
      if (res[0].StartTime) res[0].StartTime = res[0].StartTime.split("T")[0];
      if (res[0].EndTime) res[0].EndTime = res[0].EndTime.split("T")[0];
      if (res[0].StartTime === res[0].EndTime) res[0].Date = res[0].EndTime;
      return res[0];
    });
};

// 偵測顯示模式;
const getMode = (ID, en) => {
  const tag = ID.split("_")[0];
  if (tag === "C1") return en ? "ScenicSpot" : "景點";
  if (tag === "C2") return en ? "Activity" : "活動";
  if (tag === "C3") return en ? "Restaurant" : "餐飲";
  if (tag === "C4") return en ? "Hotel" : "旅宿";
};

// 資料篩選功能
const dataFilter = (arr, count = 4) => {
  return new Promise((resolve) => {
    const result = [];
    for (let i = 0; i < count; i++) {
      if (!arr.length) return;
      const idx = Math.floor(Math.random() * arr.length);
      result.push(arr[idx]);
      arr.splice(idx, 1);
    }
    resolve(result);
  });
};

//  整理雜亂資料
const dataRegular = (arr) => {
  return new Promise((resolve) => {
    arr.forEach((item) => {
      if (item.StartTime) item.StartTime = item.StartTime.split("T")[0];
      if (item.EndTime) item.EndTime = item.EndTime.split("T")[0];
      if (item.StartTime === item.EndTime) item.Date = item.EndTime;
    });
    resolve(arr);
  });
};

export {
  getTravelInfo,
  getNearbyInfo,
  getDetail,
  getMode,
  dataFilter,
  dataRegular,
};
