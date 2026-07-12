#!/usr/bin/env tsx
// ============================================================================
// LDTOCS · RDM Digital OS — Civilizational Ecosystem Orchestrator
// Live Digital Technologic Operating Civilizational System
//
// Este archivo ve el ecosistema RDM/TAMV como un sistema civilizacional:
// - Heptafederado (F1–F7).
// - Capas de operación L0–L9.
// - Pipelines de conciencia P0–P8 para Isabella / ISA-AI.
// - Repos y submódulos como nodos dentro del tejido YUN.
//
// Uso:
//   tsx tools/rdmx-ldtocs.ts sync   [--dry-run] [--no-commit] [--verbose]
//   tsx tools/rdmx-ldtocs.ts status [--verbose]
//   tsx tools/rdmx-ldtocs.ts help
// ============================================================================

import { execSync } from "child_process";
import os from "os";

// Dominios y federaciones YUN
type Domain =
  | "territorial"
  | "civilizational"
  | "quantum"
  | "smart-city"
  | "core"
  | "twin"
  | "roots"
  | "nexus";

type FederationId =
  | "F1_DEKATEOTL"
  | "F2_ANUBIS"
  | "F3_BOOKPI"
  | "F4_PHOENIX"
  | "F5_MDD_TAMV"
  | "F6_KAOS_HYPERRENDER"
  | "F7_CHRONOS";

// Capas operativas L0–L9 (stack del OS)
type LayerId =
  | "L0_BOOT"
  | "L1_PROTOCOL"
  | "L2_INFRA"
  | "L3_DATA_FABRIC"
  | "L4_IDENTITY_COMMERCE"
  | "L5_INTELLIGENCE"
  | "L6_TERRITORIAL"
  | "L7_GAMEPLAY"
  | "L8_EXPERIENCE_UI"
  | "L9_OBSERVABILITY";

// Pipelines de conciencia P0–P8 (Isabella / ISA-AI)
type PipelineId =
  | "P0_NUCLEO_AMOR"
  | "P1_MEMORIA_EMOCIONAL"
  | "P2_PROCESAMIENTO_LINGUISTICO"
  | "P3_RECONOCIMIENTO_EMOCIONAL"
  | "P4_INTERPRETACION_CONTEXTUAL"
  | "P5_ANALISIS_PSICOLOGICO"
  | "P6_EMPATIA_PROFUNDA"
  | "P7_SANACION_COLECTIVA"
  | "P8_CONSCIENCIA_LEGADO";

interface ModuleRef {
  id: string;
  repo: string;
  path: string;
  defaultBranch?: string;
  isRoot?: boolean;
  critical?: boolean;
  domain: Domain;
  federation: FederationId;
  layer: LayerId;
  pipeline?: PipelineId; // vinculación conceptual con pipeline de conciencia
}

interface CliOptions {
  dryRun: boolean;
  autoCommit: boolean;
  verbose: boolean;
}

interface ModuleStatus {
  id: string;
  path: string;
  branch: string;
  hash: string;
  dirty: boolean;
  initialized: boolean;
  domain: Domain;
  federation: FederationId;
  layer: LayerId;
  pipeline?: PipelineId;
}

interface CivilizationalSnapshot {
  timestamp: string;
  originHost: string;
  originUser: string;
  modules: ModuleStatus[];
  summary: {
    total: number;
    initialized: number;
    clean: number;
    dirty: number;
    criticalIssues: number;
    byFederation: Record<FederationId, { total: number; issues: number }>;
    byLayer: Record<LayerId, { total: number; issues: number }>;
  };
}

// Mapa heptafederado del ecosistema (repos principales que conocemos)
const MODULES: ModuleRef[] = [
  // Nodo territorial raíz
  {
    id: "real-del-monte-explorer",
    repo: "https://github.com/OsoPanda1/real-del-monte-explorer.git",
    path: ".",
    defaultBranch: "main",
    isRoot: true,
    critical: true,
    domain: "territorial",
    federation: "F1_DEKATEOTL",
    layer: "L8_EXPERIENCE_UI",
    pipeline: "P2_PROCESAMIENTO_LINGUISTICO",
  },
  // Gemelo digital / twin territorial
  {
    id: "real-del-monte-twin",
    repo: "https://github.com/OsoPanda1/real-del-monte-twin.git",
    path: "packages/real-del-monte-twin",
    defaultBranch: "main",
    critical: true,
    domain: "twin",
    federation: "F7_CHRONOS",
    layer: "L6_TERRITORIAL",
    pipeline: "P4_INTERPRETACION_CONTEXTUAL",
  },
  // Núcleo RDM Digital
  {
    id: "rdm-digital-core",
    repo: "https://github.com/OsoPanda1/rdm-digital-2dbd42b0.git",
    path: "packages/rdm-digital-core",
    defaultBranch: "main",
    critical: true,
    domain: "core",
    federation: "F1_DEKATEOTL",
    layer: "L3_DATA_FABRIC",
    pipeline: "P5_ANALISIS_PSICOLOGICO",
  },
  // Smart City OS
  {
    id: "rdm-smart-city-os",
    repo: "https://github.com/OsoPanda1/rdm-smart-city-os.git",
    path: "packages/rdm-smart-city-os",
    defaultBranch: "main",
    domain: "smart-city",
    federation: "F4_PHOENIX",
    layer: "L2_INFRA",
    pipeline: "P7_SANACION_COLECTIVA",
  },
  // Citemesh roots (infra territorial)
  {
    id: "citemesh-roots",
    repo: "https://github.com/OsoPanda1/citemesh-roots.git",
    path: "packages/citemesh-roots",
    defaultBranch: "main",
    domain: "roots",
    federation: "F6_KAOS_HYPERRENDER",
    layer: "L2_INFRA",
    pipeline: "P6_EMPATIA_PROFUNDA",
  },
  // Nexus civilizacional
  {
    id: "genesis-digytamv-nexus",
    repo: "https://github.com/OsoPanda1/genesis-digytamv-nexus.git",
    path: "packages/genesis-digytamv-nexus",
    defaultBranch: "main",
    critical: true,
    domain: "nexus",
    federation: "F2_ANUBIS",
    layer: "L1_PROTOCOL",
    pipeline: "P0_NUCLEO_AMOR",
  },
  // Núcleo civilizacional (Isabella / ISA-AI / MEXA-AI)
  {
    id: "civilizational-core",
    repo: "https://github.com/OsoPanda1/civilizational-core.git",
    path: "packages/civilizational-core",
    defaultBranch: "main",
    critical: true,
    domain: "civilizational",
    federation: "F2_ANUBIS",
    layer: "L5_INTELLIGENCE",
    pipeline: "P1_MEMORIA_EMOCIONAL",
  },
  // Sistema cuántico TAMV
  {
    id: "quantum-system-tamv",
    repo: "https://github.com/OsoPanda1/quantum-system-tamv.git",
    path: "packages/quantum-system-tamv",
    defaultBranch: "main",
    domain: "quantum",
    federation: "F3_BOOKPI",
    layer: "L1_PROTOCOL",
    pipeline: "P8_CONSCIENCIA_LEGADO",
  },
  // Nodo Cero RDM Digital
  {
    id: "rdm-digital-nodo-cero",
    repo: "https://github.com/OsoPanda1/rdm-digital-nodo-cero.git",
    path: "packages/rdm-digital-nodo-cero",
    defaultBranch: "main",
    critical: true,
    domain: "territorial",
    federation: "F5_MDD_TAMV",
    layer: "L4_IDENTITY_COMMERCE",
    pipeline: "P3_RECONOCIMIENTO_EMOCIONAL",
  },
  // Explorers alternos / variantes
  {
    id: "real-del-monte-explorer-11b3982a",
    repo: "https://github.com/OsoPanda1/real-del-monte-explorer-11b3982a.git",
    path: "packages/real-del-monte-explorer-11b3982a",
    defaultBranch: "main",
    domain: "territorial",
    federation: "F6_KAOS_HYPERRENDER",
    layer: "L8_EXPERIENCE_UI",
  },
  {
    id: "rdm-digital-2026",
    repo: "https://github.com/OsoPanda1/RDM-DIGITAL2026.git",
    path: "packages/rdm-digital-2026",
    defaultBranch: "main",
    domain: "territorial",
    federation: "F1_DEKATEOTL",
    layer: "L8_EXPERIENCE_UI",
  },
];

// ============================================================================
// Utilidades de ejecución
// ============================================================================

function run(cmd: string, cwd?: string, opts?: CliOptions): string {
  const dryRun = opts?.dryRun ?? false;
  const verbose = opts?.verbose ?? false;

  if (dryRun) {
    console.log(`  ⏎ [dry-run] ${cwd ? `(${cwd}) ` : ""}${cmd}`);
    return "";
  }

  if (verbose) {
    console.log(`  ⇢ ${cwd ? `(${cwd}) ` : ""}${cmd}`);
  }

  try {
    return execSync(cmd, { stdio: "pipe", cwd, encoding: "utf-8" }).trim();
  } catch (e: unknown) {
    const err = e as { stderr?: string; message?: string };
    console.error(`  ⚠ Command failed: ${cmd}`);
    if (err.stderr) console.error(`    ${err.stderr.trim()}`);
    else if (err.message) console.error(`    ${err.message}`);
    return "";
  }
}

function getShortHash(cwd: string, opts: CliOptions): string {
  return run("git rev-parse --short HEAD", cwd, opts);
}

function getBranch(cwd: string, opts: CliOptions): string {
  const branch = run("git rev-parse --abbrev-ref HEAD", cwd, opts);
  return branch || "(detached)";
}

function hasLocalChanges(cwd: string, opts: CliOptions): boolean {
  const status = run("git status --porcelain", cwd, opts);
  return status !== "";
}

// ============================================================================
// Estado del ecosistema / snapshot civilizacional
// ============================================================================

function collectStatus(opts: CliOptions): ModuleStatus[] {
  return MODULES.map((mod) => {
    const hash = getShortHash(mod.path, opts);
    const initialized = hash !== "";
    const branch = initialized ? getBranch(mod.path, opts) : "";
    const dirty = initialized ? hasLocalChanges(mod.path, opts) : false;

    return {
      id: mod.id,
      path: mod.path,
      branch,
      hash,
      dirty,
      initialized,
      domain: mod.domain,
      federation: mod.federation,
      layer: mod.layer,
      pipeline: mod.pipeline,
    };
  });
}

function buildSnapshot(opts: CliOptions): CivilizationalSnapshot {
  const modules = collectStatus(opts);
  const total = modules.length;
  const initialized = modules.filter((m) => m.initialized).length;
  const clean = modules.filter((m) => m.initialized && !m.dirty).length;
  const dirty = modules.filter((m) => m.initialized && m.dirty).length;

  const criticalIds = new Set(
    MODULES.filter((m) => m.critical).map((m) => m.id),
  );
  const criticalIssues = modules.filter(
    (m) => criticalIds.has(m.id) && (!m.initialized || m.dirty),
  ).length;

  const byFederation = {} as CivilizationalSnapshot["summary"]["byFederation"];
  const byLayer = {} as CivilizationalSnapshot["summary"]["byLayer"];

  for (const mod of MODULES) {
    if (!byFederation[mod.federation]) {
      byFederation[mod.federation] = { total: 0, issues: 0 };
    }
    if (!byLayer[mod.layer]) {
      byLayer[mod.layer] = { total: 0, issues: 0 };
    }
  }

  for (const m of modules) {
    byFederation[m.federation].total += 1;
    byLayer[m.layer].total += 1;

    const issue = !m.initialized || m.dirty;
    if (issue) {
      byFederation[m.federation].issues += 1;
      byLayer[m.layer].issues += 1;
    }
  }

  return {
    timestamp: new Date().toISOString(),
    originHost: os.hostname(),
    originUser: os.userInfo().username,
    modules,
    summary: {
      total,
      initialized,
      clean,
      dirty,
      criticalIssues,
      byFederation,
      byLayer,
    },
  };
}

function printSnapshot(snapshot: CivilizationalSnapshot): void {
  console.log("╔═══════════════════════════════════════════════════╗");
  console.log("║ LDTOCS · RDM Digital OS — Civilizational Status  ║");
  console.log("╚═══════════════════════════════════════════════════╝\n");

  console.log(`Timestamp:   ${snapshot.timestamp}`);
  console.log(`OriginHost:  ${snapshot.originHost}`);
  console.log(`OriginUser:  ${snapshot.originUser}\n`);

  for (const m of snapshot.modules) {
    const health = !m.initialized
      ? "✗ not initialized"
      : m.dirty
      ? "⚠ dirty"
      : "✓ clean";

    const pipelineLabel = m.pipeline ? ` · ${m.pipeline}` : "";
    console.log(
      `  ${m.id.padEnd(32)} ${health} @ ${m.branch || "n/a"} (${m.hash ||
        "-"}) [${m.federation}/${m.layer}${pipelineLabel}]`,
    );
  }

  console.log("\nSummary:");
  console.log(
    `  Total: ${snapshot.summary.total}, initialized: ${snapshot.summary.initialized}, clean: ${snapshot.summary.clean}, dirty: ${snapshot.summary.dirty}, critical issues: ${snapshot.summary.criticalIssues}\n`,
  );

  console.log("  By Federation:");
  for (const [fed, data] of Object.entries(snapshot.summary.byFederation)) {
    console.log(`    ${fed.padEnd(18)} total=${data.total}, issues=${data.issues}`);
  }

  console.log("\n  By Layer:");
  for (const [layer, data] of Object.entries(snapshot.summary.byLayer)) {
    console.log(`    ${layer.padEnd(18)} total=${data.total}, issues=${data.issues}`);
  }

  console.log();
}

// ============================================================================
// Sync del ecosistema heptafederado
// ============================================================================

function syncEcosystem(opts: CliOptions): void {
  console.log("╔═══════════════════════════════════════════════════╗");
  console.log("║ LDTOCS · RDM Digital OS — Ecosystem Sync         ║");
  console.log("╚═══════════════════════════════════════════════════╝\n");

  console.log("→ Syncing submodule configuration (YUN fabric)...");
  run("git submodule sync --recursive", undefined, opts);
  run("git submodule update --init --recursive", undefined, opts);

  for (const mod of MODULES) {
    const label = mod.isRoot ? `${mod.id} (root)` : mod.id;
    console.log(`\n── ${label} ──`);
    console.log(`   Federation: ${mod.federation}`);
    console.log(`   Domain:     ${mod.domain}`);
    console.log(`   Layer:      ${mod.layer}`);
    if (mod.pipeline) console.log(`   Pipeline:   ${mod.pipeline}`);
    console.log(`   Path:       ${mod.path}`);

    const hash = getShortHash(mod.path, opts);
    if (!hash) {
      console.log("   ⚠ Not initialized or not a git repo — skipping");
      continue;
    }

    const branch = getBranch(mod.path, opts);
    console.log(`   Branch:  ${branch}`);
    console.log(`   Current: ${hash}`);

    if (!mod.isRoot) {
      console.log("   Fetching latest remote state...");
      run("git fetch --all --prune", mod.path, opts);

      if (mod.defaultBranch) {
        console.log(`   Aligning to origin/${mod.defaultBranch}...`);
        run(`git checkout ${mod.defaultBranch}`, mod.path, opts);
        run(`git pull --rebase origin ${mod.defaultBranch}`, mod.path, opts);
      } else {
        console.log("   Updating to latest tracked commit (submodule)…");
        run("git submodule update --remote", mod.path, opts);
      }

      const newHash = getShortHash(mod.path, opts);
      console.log(
        `   Updated: ${newHash}${hash === newHash ? " (no changes)" : " ✓"}`,
      );
    } else {
      console.log("   Updating root (territorial shell)…");
      run("git fetch --all --prune", mod.path, opts);
      if (mod.defaultBranch) {
        run(`git checkout ${mod.defaultBranch}`, mod.path, opts);
        run(`git pull --rebase origin ${mod.defaultBranch}`, mod.path, opts);
      }
      const newHash = getShortHash(mod.path, opts);
      console.log(`   Root updated: ${newHash}`);
    }
  }

  console.log("\n→ Staging submodule pointer changes...");
  if (opts.dryRun) {
    console.log("  ⏎ [dry-run] git add .");
    console.log(
      '  ⏎ [dry-run] git commit -m "chore: ldto-sys sync" (if there are changes)',
    );
  } else {
    run("git add .", undefined, opts);
    if (!opts.autoCommit) {
      console.log("  Changes staged but not committed (auto-commit disabled).");
    } else {
      const diff = run("git diff --cached --name-only", undefined, opts);
      if (!diff) {
        console.log("  No changes to commit.");
      } else {
        run('git commit -m "chore: ldto-sys sync"', undefined, opts);
        console.log('  ✅ Commit created: "chore: ldto-sys sync"');
      }
    }
  }

  const snapshot = buildSnapshot(opts);
  printSnapshot(snapshot);

  // Hook de integración:
  // - Aquí puedes enviar snapshot a Supabase, Vercel Function, ISA-AI, Autonoma, etc.
  // - Por ejemplo: POST /api/ldtocs-snapshot con el JSON.
}

// ============================================================================
// CLI
// ============================================================================

function printUsage(): void {
  console.log("LDTOCS · RDM Digital OS — Civilizational Ecosystem Orchestrator");
  console.log();
  console.log("Usage:");
  console.log("  tsx tools/rdmx-ldtocs.ts sync   [--dry-run] [--no-commit] [--verbose]");
  console.log("  tsx tools/rdmx-ldtocs.ts status [--verbose]");
  console.log("  tsx tools/rdmx-ldtocs.ts help");
  console.log();
  console.log("Options:");
  console.log("  --dry-run   Ejecuta comandos sin aplicar cambios.");
  console.log("  --no-commit No crea commit automático tras el sync.");
  console.log("  --verbose   Muestra comandos ejecutados y salida detallada.\n");
}

const [, , rawCommand, ...rawArgs] = process.argv;
const command = rawCommand ?? "sync";
const argSet = new Set(rawArgs);

const options: CliOptions = {
  dryRun: argSet.has("--dry-run"),
  autoCommit: !argSet.has("--no-commit"),
  verbose: argSet.has("--verbose"),
};

switch (command) {
  case "sync":
    syncEcosystem(options);
    break;
  case "status":
    printSnapshot(buildSnapshot(options));
    break;
  case "help":
  default:
    printUsage();
    break;
}
