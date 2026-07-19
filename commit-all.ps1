# =================================================================
# SCRIPT DE COMMIT ROBUSTO — PowerShell
# =================================================================

# Configuración estricta: detiene el script ante cualquier error
$ErrorActionPreference = "Stop"

$repo = "C:\Users\tamvo\Downloads\rdm digital\visitarealdelmonte"

# 1. Validar que la carpeta existe
if (!(Test-Path -Path $repo)) {
    Write-Host "Error: El repositorio '$repo' no existe." -ForegroundColor Red
    exit 1
}

# Cambiar al directorio del repo de forma segura
Push-Location $repo

try {
    Write-Host "=== Validando cambios ===" -ForegroundColor Cyan
    
    # 2. Verificar si hay cambios pendientes
    $status = git status --porcelain
    if ([string]::IsNullOrWhiteSpace($status)) {
        Write-Host "No hay cambios detectados. Nada que commitear." -ForegroundColor Yellow
        exit 0
    }

    # 3. Staging
    Write-Host "=== Staging de archivos ===" -ForegroundColor Cyan
    git add -A

    # 4. Commit
    Write-Host "=== Creando commit ===" -ForegroundColor Cyan
    $commitMsg = @"
feat: Vercel AI Gateway en todas las capas + CI fixes + README update

- Nuevo shared client vercel-ai-gateway.ts (callGatewayChat / callGatewayMessages)
- isabella-ai: Vercel AI Gateway -> Model Router -> Gemini -> builtin
- realito-chat: Vercel AI Gateway -> Model Router -> Gemini -> builtin
- api/model-router: Vercel AI Gateway -> HuggingFace -> OpenLLM
- server/sovereign.engine: Vercel AI Gateway -> Encrypted Gateway
- ai-text-demo: soporte Vercel AI Gateway + OpenAI directo
- .env.example: seccion VERCEL_AI_GATEWAY_*
- Fix: rate-limit.ts alineado con rate-limit.js (RATE_LIMITS, retryAfter)
- Fix: auth.d.ts para tipo de requireAuth
- Fix: @ts-ignore -> @ts-expect-error en cache/index.ts
- Fix: syntax error en routes/musica.tsx (extra </div>)
- Fix: unused eslint-disable directives eliminados (6 archivos)
- README.md: documentacion completa de Vercel AI Gateway + cascada de modelos
"@
    git commit -m $commitMsg

    # 5. Push
    Write-Host "=== Pushing a origin main ===" -ForegroundColor Cyan
    git push origin main

    Write-Host "=== Proceso finalizado exitosamente ===" -ForegroundColor Green

} catch {
    Write-Host "ERROR: El proceso falló. Revisa la salida de Git arriba." -ForegroundColor Red
    exit 1
} finally {
    # Regresar al directorio original siempre
    Pop-Location
}
