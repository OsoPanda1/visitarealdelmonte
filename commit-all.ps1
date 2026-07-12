# PowerShell script to commit & push all changes to GitHub main
# Run this from PowerShell (not bash/cmd)

$repo = "C:\Users\tamvo\Downloads\rdm digital\visitarealdelmonte"

Write-Host "=== Staging all files ===" -ForegroundColor Cyan
git -C $repo add -A

Write-Host "=== Status ===" -ForegroundColor Cyan
git -C $repo status

Write-Host "=== Committing ===" -ForegroundColor Cyan
git -C $repo commit -m "feat: Vercel AI Gateway en todas las capas + CI fixes + README update

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
- README.md: documentacion completa de Vercel AI Gateway + cascada de modelos"

Write-Host "=== Pushing to origin main ===" -ForegroundColor Cyan
git -C $repo push origin main

Write-Host "=== Done! ===" -ForegroundColor Green
