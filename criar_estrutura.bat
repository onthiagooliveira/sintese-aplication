@echo off
SETLOCAL EnableDelayedExpansion

:: Define a pasta raiz do projeto
SET PROJECT_ROOT=sintese-aplication

echo Criando a estrutura de pastas para: %PROJECT_ROOT%...

:: 1. CRIANDO A ESTRUTURA DE DIRETÓRIOS
mkdir "%PROJECT_ROOT%\.github\workflows"
mkdir "%PROJECT_ROOT%\backend\app\core"
mkdir "%PROJECT_ROOT%\backend\app\db"
mkdir "%PROJECT_ROOT%\backend\app\storage"
mkdir "%PROJECT_ROOT%\backend\app\modules"
mkdir "%PROJECT_ROOT%\backend\migrations"
mkdir "%PROJECT_ROOT%\backend\tests\unit"
mkdir "%PROJECT_ROOT%\backend\tests\integration"
mkdir "%PROJECT_ROOT%\backend\tests\security"
mkdir "%PROJECT_ROOT%\backend\docs\adr"
mkdir "%PROJECT_ROOT%\backend\docs\api"
mkdir "%PROJECT_ROOT%\frontend\src\main"
mkdir "%PROJECT_ROOT%\frontend\src\preload"
mkdir "%PROJECT_ROOT%\frontend\src\renderer\css"
mkdir "%PROJECT_ROOT%\frontend\src\renderer\js"
mkdir "%PROJECT_ROOT%\frontend\src\renderer\assets"
mkdir "%PROJECT_ROOT%\frontend\build"
mkdir "%PROJECT_ROOT%\frontend\tests"

:: 2. CRIANDO OS ARQUIVOS VAZIOS
echo Criando arquivos vazios...

:: Arquivos Raiz
type null > "%PROJECT_ROOT%\docker-compose.yml"
type null > "%PROJECT_ROOT%\.env.example"
type null > "%PROJECT_ROOT%\.gitignore"
type null > "%PROJECT_ROOT%\.editorconfig"
type null > "%PROJECT_ROOT%\CHANGELOG.md"
type null > "%PROJECT_ROOT%\README.md"

:: Arquivos .github
type null > "%PROJECT_ROOT%\.github\workflows\ci.yml"

:: Arquivos Backend
type null > "%PROJECT_ROOT%\backend\app\main.py"
type null > "%PROJECT_ROOT%\backend\pyproject.toml"
type null > "%PROJECT_ROOT%\backend\Dockerfile"

:: Arquivos Frontend
type null > "%PROJECT_ROOT%\frontend\src\renderer\index.html"
type null > "%PROJECT_ROOT%\frontend\src\renderer\dashboard.html"
type null > "%PROJECT_ROOT%\frontend\src\renderer\js\api.js"
type null > "%PROJECT_ROOT%\frontend\src\renderer\js\auth.js"
type null > "%PROJECT_ROOT%\frontend\src\renderer\js\dashboard.js"
type null > "%PROJECT_ROOT%\frontend\package.json"

echo.
echo [SUCESSO] Estrutura do projeto "%PROJECT_ROOT%" criada com sucesso!
pause
