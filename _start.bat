@echo ! --- GO TO DESKTOP --- !
@TIMEOUT /T 10

cd /d "s:\Pf not install SSD\MongoDB\"
start "BD" mongod.exe
rem @pause
TIMEOUT /T 10

cd /d %~dp0%server
start "Server" nodemon --verbose "server.js"
rem @pause
TIMEOUT /T 15

cd ..
cd client
npm run start

@pause