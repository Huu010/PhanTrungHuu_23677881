@echo off
cd /d %~dp0
if not exist node_modules (
  echo Dang cai dat dependencies...
  npm install
)
call npm run typecheck
if errorlevel 1 (
  echo TypeScript co loi. Hay kiem tra cua so tren.
  pause
  exit /b 1
)
npx expo start
