#!/bin/bash
# ============================================================
# SCRIPT DE COMMIT — Vercel AI Gateway en YUN
# Ejecuta este script desde la raíz del repo local
# ============================================================

echo "Staging all modified files..."
git add \
  supabase/functions/_shared/vercel-ai-gateway.ts \
  supabase/functions/isabella-ai/index.ts \
  supabase/functions/realito-chat/index.ts \
  api/model-router.ts \
  server/src/services/protocol/sovereign.engine.ts \
  ai-text-demo/index.ts \
  .env.example

echo "Creating commit..."
git commit -m "Implement Vercel AI Gateway en todas las capas — Claude gratuito con fallbacks a HuggingFace/Gemini/builtin

- Nuevo shared client vercel-ai-gateway.ts con callGatewayChat y callGatewayMessages
- isabella-ai: Vercel AI Gateway → Model Router → Gemini → builtin
- realito-chat: Vercel AI Gateway → Model Router → Gemini → builtin
- api/model-router: Vercel AI Gateway → HuggingFace → OpenLLM
- server/sovereign.engine: Vercel AI Gateway → Encrypted Gateway
- ai-text-demo: soporta Vercel AI Gateway + OpenAI
- .env.example: seccion VERCEL_AI_GATEWAY_*

Fallback chain: VERCEL_AI_GATEWAY_URL > MODEL_ROUTER_URL > GEMINI_API_KEY > builtin"

echo "Pushing to remote..."
git push origin main

echo "Done!"
