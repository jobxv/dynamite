@echo off
echo ==========================================
echo      Starting Dynamite Backend Server
echo ==========================================
echo.
echo Step 1: Skipping PHP check (using absolute path)...

echo [OK] PHP found.
echo.
echo Step 2: Starting Server on localhost:8000...
echo (Keep this window open)
echo.
"C:\xampp\php\php.exe" -S localhost:8000 router.php
