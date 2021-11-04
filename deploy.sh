# ./deploy.sh
set -e # 當發生錯誤時終止腳本運行

npm run build # 建置

cd dist # 移動至到建置後的 dist 目錄 

git init #因為 dist 資料夾預設被忽略，因此進行初始化
git add -A
git commit -m 'deploy'
# 部署到 github 分支為 gh-pages
git push -f https://github.com/timchen0607/Travel-Guide.git master:gh-pages

cd -