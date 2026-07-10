#!/usr/bin/env tsx
// ============================================================================
// RDM Digital OS — Ecosystem Orchestrator
// Multi-repo + submodule sync with status reporting
// Usage:
//   tsx tools/rdmx-sync.ts [sync|status] [--dry-run] [--no-commit]
// ============================================================================

import { execSync } from "child_process";

interface ModuleRef {
  id: string;
  repo: string;
  path: string;
  defaultBranch?: string; // allows explicit branch pinning
  isRoot?: boolean;
}

const MODULES: ModuleRef[] = [
  {
    id: "real-del-monte-explorer",
    repo: "https://github.com/OsoPanda1/real-del-monte-explorer.git",
    path: ".",
    defaultBranch: "main",
    isRoot: true,
  },
  {
    id: "real-del-monte-twin",
    repo: "https://github.com/OsoPanda1/real-del-monte-twin.git",
    path: "packages/real-del-monte-twin",
    defaultBranch: "main",
  },
  {
    id: "rdm-digital-core",
    repo: "https://github.com/OsoPanda1/rdm-digital-2dbd42b0.git",
    path: "packages/rdm-digital-core",
    defaultBranch: "main",
  },
  {
    id: "rdm-smart-city-os",
    repo: "https://github.com/OsoPanda1/rdm-smart-city-os.git",
    path: "packages/rdm-smart-city-os",
    defaultBranch: "main",
  },
  {
    id: "real-del-monte-elevated",
    repo: "https://github.com/OsoPanda1/real-del-monte-elevated.git",
    path: "packages/real-del-monte-elevated",
    defaultBranch: "main",
  },
  {
    id: "citemesh-roots",
    repo: "https://github.com/OsoPanda1/citemesh-roots.git",
    path: "packages/citemesh-roots",
    defaultBranch: "main",
  },
  {
    id: "genesis-digytamv-nexus",
    repo: "https://github.com/OsoPanda1/genesis-digytamv-nexus.git",
    path: "packages/genesis-digytamv-nexus",
    defaultBranch: "main",
  },
  {
    id: "civilizational-core",
    repo: "https://github.com/OsoPanda1/civilizational-core.git",
    path: "packages/civilizational-core",
    defaultBranch: "main",
  },
  {
    id: "quantum-system-tamv",
    repo: "https://github.com/OsoPanda1/quantum-system-tamv.git",
    path: "packages/quantum-system-tamv",
    defaultBranch: "main",
  },
  {
    id: "rdm-digital-nodo-cero",
    repo: "https://github.com/OsoPanda1/rdm-digital-nodo-cero.git",
    path: "packages/rdm-digital-nodo-cero",
    defaultBranch: "main",
  },
  {
    id: "real-del-monte-explorer-11b3982a",
    repo: "https://github.com/OsoPanda1/real-del-monte-explorer-11b3982a.git",
    path: "packages/real-del-monte-explorer-11b3982a",
    defaultBranch: "main",
  },
  {
    id: "rdm-digital-2026",
    repo: "https://github.com/OsoPanda1/RDM-DIGITAL2026.git",
    path: "packages/rdm-digital-2026",
    defaultBranch: "main",
  },
];

function run(cmd: string, cwd?: string, dryRun = false): string {
  if (dryRun) {
    console.log(`  ⏎ [dry-run] ${cwd ? `(${cwd}) ` : ""}${cmd}`);
    return "";
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

function getShortHash(cwd: string): string {
  return run("git rev-parse --short HEAD", cwd);
}

function getBranch(cwd: string): string {
  const branch = run("git rev-parse --abbrev-ref HEAD", cwd);
  return branch || "(detached)";
}

function hasLocalChanges(cwd: string): boolean {
  const status = run("git status --porcelain", cwd);
  return status !== "";
}

function syncSubmodules(dryRun: boolean, autoCommit: boolean): void {
  console.log("╔═══════════════════════════════════════════════════╗");
  console.log("║   RDM Digital OS — Ecosystem Sync                ║");
  console.log("╚═══════════════════════════════════════════════════╝\n");

  console.log("→ Syncing submodule configuration...");
  run("git submodule sync --recursive", undefined, dryRun);
  run("git submodule update --init --recursive", undefined, dryRun);

  for (const mod of MODULES) {
    const label = mod.isRoot ? `${mod.id} (root)` : mod.id;
    console.log(`\n── ${label} ──`);
    console.log(`   Path: ${mod.path}`);

    const hash = getShortHash(mod.path);
    if (!hash) {
      console.log("   ⚠ Not initialized or not a git repo — skipping");
      continue;
    }

    const branch = getBranch(mod.path);
    console.log(`   Branch: ${branch}`);
    console.log(`   Current: ${hash}`);

    if (!mod.isRoot) {
      // Best-practice: submodules track a specific commit; use update --remote
      console.log("   Fetching latest remote state...");
      run("git fetch --all --prune", mod.path, dryRun);

      if (mod.defaultBranch) {
        // Align to explicit branch if defined
        console.log(`   Rebase onto origin/${mod.defaultBranch}...`);
        run(`git checkout ${mod.defaultBranch}`, mod.path, dryRun);
        run(`git pull --rebase origin ${mod.defaultBranch}`, mod.path, dryRun);
      } else {
        console.log("   Updating submodule to latest remote commit...");
        run("git submodule update --remote", mod.path, dryRun);
      }

      const newHash = getShortHash(mod.path);
      console.log(
        `   Updated: ${newHash}${hash === newHash ? " (no changes)" : " ✓"}`,
      );
    } else {
      // Root repo: prefer fetch + rebase over plain pull
      console.log("   Updating root repo (fetch + rebase)...");
      run("git fetch --all --prune", mod.path, dryRun);
      if (mod.defaultBranch) {
        run(`git checkout ${mod.defaultBranch}`, mod.path, dryRun);
        run(`git pull --rebase origin ${mod.defaultBranch}`, mod.path, dryRun);
      }
      const newHash = getShortHash(mod.path);
      console.log(`   Root updated: ${newHash}`);
    }
  }

  console.log("\n→ Staging submodule pointer changes...");
  if (dryRun) {
    console.log("  ⏎ [dry-run] git add .");
    console.log(
      "  ⏎ [dry-run] git commit -m \"chore: sync submodules\" (if there are changes)",
    );
  } else {
    run("git add .");
    if (!autoCommit) {
      console.log("  Changes staged but not committed (auto-commit disabled).");
    } else {
      const diff = run("git diff --cached --name-only");
      if (!diff) {
        console.log("  No changes to commit.");
      } else {
        run('git commit -m "chore: sync submodules"');
        console.log("  ✅ Commit created: chore: sync submodules");
      }
    }
  }

  console.log("\n✅ Sync complete.\n");
}

function showStatus(): void {
  console.log("╔═══════════════════════════════════════════════════╗");
  console.log("║   RDM Digital OS — Module Status                 ║");
  console.log("╚═══════════════════════════════════════════════════╝\n");

  for (const mod of MODULES) {
    const hash = getShortHash(mod.path);
    const branch = hash ? getBranch(mod.path) : "";
    const dirty = hash ? hasLocalChanges(mod.path) : false;
    const status = !hash
      ? "✗ not initialized"
      : `${dirty ? "⚠ dirty" : "✓ clean"} @ ${branch} (${hash})`;
    console.log(`  ${mod.id.padEnd(32)} ${status}`);
  }

  console.log();
}

function printUsage(): void {
  console.log("Usage:");
  console.log("  tsx tools/rdmx-sync.ts sync [--dry-run] [--no-commit]");
  console.log("  tsx tools/rdmx-sync.ts status");
  console.log();
}

const [, , rawCommand, ...rawArgs] = process.argv;
const command = rawCommand ?? "sync";
const args = new Set(rawArgs);

const dryRun = args.has("--dry-run");
const autoCommit = !args.has("--no-commit");

switch (command) {
  case "sync":
    syncSubmodules(dryRun, autoCommit);
    break;
  case "status":
    showStatus();
    break;
  default:
    printUsage();
    break;
}
