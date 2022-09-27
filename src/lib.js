// 台灣地區列表
const regionLib = ["North", "Central", "South", "East&Outer"];
// 台灣各縣市資料
const cityLib = {
  Taiwan: { name: "臺灣", icon: "main-island", region: "All" },
  Taipei: { name: "台北", icon: "postbox2", region: "North" },
  NewTaipei: { name: "新北", icon: "queens-head", region: "North" },
  Keelung: { name: "基隆", icon: "ershawan", region: "North" },
  Taoyuan: { name: "桃園", icon: "slipper", region: "North" },
  Hsinchu: { name: "竹市", icon: "green-man", region: "North" },
  HsinchuCounty: { name: "竹縣", icon: "red-man", region: "North" },
  YilanCounty: { name: "宜蘭", icon: "ly-mus", region: "North" },
  MiaoliCounty: { name: "苗栗", icon: "longteng-brg", region: "Central" },
  Taichung: { name: "台中", icon: "taichung-park", region: "Central" },
  ChanghuaCounty: { name: "彰化", icon: "bagua", region: "Central" },
  NantouCounty: { name: "南投", icon: "black-bear", region: "Central" },
  YunlinCounty: { name: "雲林", icon: "fortune", region: "Central" },
  Chiayi: { name: "嘉市", icon: "taiwanese-bag", region: "South" },
  ChiayiCounty: { name: "嘉縣", icon: "alishan-rw", region: "South" },
  Tainan: { name: "台南", icon: "provintia", region: "South" },
  Kaohsiung: { name: "高雄", icon: "dt-pagoda", region: "South" },
  PingtungCounty: { name: "屏東", icon: "vase-rock", region: "South" },
  PenghuCounty: { name: "澎湖", icon: "penghu-islands", region: "South" },
  HualienCounty: { name: "花蓮", icon: "balloon", region: "East&Outer" },
  TaitungCounty: { name: "臺東", icon: "flying-fish", region: "East&Outer" },
  KinmenCounty: { name: "金門", icon: "kinmen-island", region: "East&Outer" },
  LienchiangCounty: { name: "連江", icon: "jug", region: "East&Outer" },
};
// 搜尋主題列表
const themeLib = [
  { id: 1, name: "觀光遊憩", keywords: "觀光,遊憩" },
  { id: 2, name: "自然風景", keywords: "自然,風景" },
  { id: 3, name: "地方特產", keywords: "地方特產" },
  { id: 4, name: "異國料理", keywords: "異國料理" },
  { id: 5, name: "度假民宿", keywords: "度假,民宿" },
  { id: 6, name: "國際旅館", keywords: "國際,旅館" },
  { id: 7, name: "節慶活動", keywords: "節慶活動" },
  { id: 8, name: "藝文體驗", keywords: "藝文,體驗" },
];
// 模式列表
const modeLib = {
  ScenicSpot: { title: "景點", color: "#3fb195" },
  Restaurant: { title: "餐飲", color: "#ff9999" },
  Hotel: { title: "旅宿", color: "#a79bfd" },
  Activity: { title: "活動", color: "#feb155" },
};
// 隨機標語列表
const sloganLib = [
  ["探索。", "福爾摩沙"],
  ["尋找。", "山林秘境"],
  ["體驗。", "節慶活動"],
  ["發現。", "異國美食"],
  ["徜徉。", "蔚藍大海"],
  ["尋覓。", "文化古蹟"],
];

export { regionLib, cityLib, themeLib, modeLib, sloganLib };
