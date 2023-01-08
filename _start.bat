cd /d "s:\Pf not install SSD\MongoDB\"
start "BD" mongod.exe
TIMEOUT /T 5

cd /d %~dp0%server
start "Server" server.js
