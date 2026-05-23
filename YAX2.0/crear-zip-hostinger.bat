@echo off
title Crear ZIP para Hostinger
cd /d "%~dp0"
echo.
echo  Creando yax-sitio.zip para Hostinger...
echo.

if not exist "data" mkdir data

powershell -NoProfile -Command ^
  "$t='deploy-temp'; Remove-Item $t -Recurse -Force -ErrorAction SilentlyContinue; New-Item -ItemType Directory -Path $t,'$t\data' -Force | Out-Null; Copy-Item index.html,server.js,package.json -Destination $t; Copy-Item img -Destination $t -Recurse; Compress-Archive -Path '$t\*' -DestinationPath '..\yax-sitio.zip' -Force; Remove-Item $t -Recurse -Force"

if exist "..\yax-sitio.zip" (
    echo.
    echo  Listo: ..\yax-sitio.zip
    echo  Sube ese archivo en hPanel - Node.js Apps - Upload ZIP
    echo.
) else (
    echo  Error al crear el ZIP.
)

pause
