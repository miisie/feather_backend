@echo off
setlocal
set /p name=Enter migration name: 
set "MIGRATION_DIR=%~dp0database\migrations"
npm run migration:generate -- "%MIGRATION_DIR%\%name%"
endlocal
