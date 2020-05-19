@echo off

for %%a in (%*) do (
  node gen-json %%a
)
pause
