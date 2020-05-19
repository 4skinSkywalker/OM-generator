@echo off

for %%a in (%*) do (
  node "%~dp0/gen-json" %%a
)
pause
