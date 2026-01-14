<<<<<<< HEAD
@echo off
setlocal

REM Copy the environment file
if not exist .env (
    copy /Y env.temp .env >nul
    echo Created .env file from template
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo Failed to install dependencies
        exit /b 1
    )
)

echo Starting the application...
call npm start

endlocal
=======
@echo off
setlocal

REM Copy the environment file
if not exist .env (
    copy /Y env.temp .env >nul
    echo Created .env file from template
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo Failed to install dependencies
        exit /b 1
    )
)

echo Starting the application...
call npm start

endlocal
>>>>>>> ab2c966a99587ea66a339f9844b87fbd95e738a8
