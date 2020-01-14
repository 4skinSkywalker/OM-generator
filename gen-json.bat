@echo off
SET mypath=%~dp0
node %mypath:~0,-1%/gen-json "%~1"
pause