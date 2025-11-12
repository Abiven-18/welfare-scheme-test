@echo off
echo ========================================
echo Welfare Scheme Repository Setup
echo ========================================
echo.

echo [1/5] Installing server dependencies...
cd server
call npm install
if errorlevel 1 (
    echo Error: Failed to install server dependencies
    pause
    exit /b 1
)
echo Server dependencies installed successfully!
echo.

echo [2/5] Installing client dependencies...
cd ..\client
call npm install
if errorlevel 1 (
    echo Error: Failed to install client dependencies
    pause
    exit /b 1
)
echo Client dependencies installed successfully!
echo.

echo [3/5] Installing data script dependencies...
cd ..\data\scripts
call npm install
if errorlevel 1 (
    echo Error: Failed to install data script dependencies
    pause
    exit /b 1
)
echo Data script dependencies installed successfully!
echo.

echo [4/5] Checking for .env file...
cd ..\..\server
if not exist .env (
    echo Creating .env file from example...
    copy .env.example .env
    echo.
    echo IMPORTANT: Please update the .env file with your MongoDB connection string
    echo Location: server\.env
    echo.
)
echo.

echo [5/5] Setup complete!
echo.
echo ========================================
echo Next Steps:
echo ========================================
echo 1. Update server\.env with your MongoDB URI
echo 2. Start MongoDB (if using local MongoDB)
echo 3. Import sample data: cd data\scripts ^&^& npm run import
echo 4. Start backend: cd server ^&^& npm run dev
echo 5. Start frontend: cd client ^&^& npm start
echo.
echo For detailed instructions, see QUICKSTART.md
echo ========================================
echo.
pause
