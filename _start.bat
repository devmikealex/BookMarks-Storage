cd /d "s:\Pf not install SSD\MongoDB\"
start "BD" mongod.exe
@pause

cd /d %~dp0%server
start "Server" node "server.js"
@pause

cd ..
cd client
npm run start
@pause