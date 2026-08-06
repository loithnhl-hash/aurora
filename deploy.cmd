@echo off
REM === Deploy GetKey to GitHub Pages ===
REM Chạy file này sau khi đã cài Git và tạo repo trống trên GitHub.

cd /d "C:\Users\lmod8\Downloads\GetKey"

git init
git add .
git commit -m "Deploy API SEVER Thành Lợi"
git branch -M main
git remote add origin https://github.com/%1/getkey.git
git push -u origin main
