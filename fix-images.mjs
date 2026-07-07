import { readFileSync, writeFileSync, existsSync, copyFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = join(__dirname, "src");
const publicDir = join(__dirname, "public");
const imagesDir = join(srcDir, "assets", "images");

// Files with /images/ URL references to fix
const targetFiles = [
  "src/components/ExperienceHub.tsx",
  "src/pages/XRTecnologia.tsx",
  "src/pages/Tenochtitlan.tsx",
  "src/components/SEOMeta.tsx",
  "src/pages/SeguridadTenochtitlan.tsx",
  "src/components/RealitoChat.tsx",
  "src/pages/Reglamento.tsx",
  "src/components/rdm/RDMHero.tsx",
  "src/pages/QuantumComputing.tsx",
  "src/pages/PremiumPlans.tsx",
  "src/pages/Mina.tsx",
  "src/pages/MetaverseHome.tsx",
  "src/pages/Membresias.tsx",
  "src/pages/Manuales.tsx",
  "src/pages/Introduccion.tsx",
  "src/pages/Gobernanza.tsx",
  "src/pages/GameHub.tsx",
  "src/components/home/CategoryColumns.tsx",
  "src/pages/Filosofia.tsx",
  "src/pages/Feed.tsx",
  "src/pages/FAQ.tsx",
  "src/pages/CasosDeUso.tsx",
  "src/pages/BlockchainMSR.tsx",
  "src/pages/BiografiaCEO.tsx",
  "src/pages/EconomiaFederada.tsx",
  "src/pages/Donar.tsx",
  "src/pages/Documentacion.tsx",
  "src/pages/Despliegue.tsx",
  "src/pages/Arquitectura.tsx",
  "src/data/imported/businesses.ts",
  "src/features/music/api.ts",
];

function toVarName(filename) {
  // Remove extension, convert special chars to underscore
  let name = filename.replace(/\.[^.]+$/, "");
  // Replace non-alphanumeric chars with underscore
  name = name.replace(/[^a-zA-Z0-9]/g, "_");
  // Ensure it starts with a letter
  if (/^[0-9]/.test(name)) name = "img_" + name;
  return name;
}

function findImageFiles(text) {
  // Find all "/images/<filename>" patterns
  const regex = /["']\/images\/([^"']+)["']/g;
  const matches = [];
  let m;
  while ((m = regex.exec(text)) !== null) {
    matches.push(m[1]);
  }
  return [...new Set(matches)];
}

function addImport(text, importStatements) {
  // Find the last import line, insert after it
  const lines = text.split("\n");
  let lastImportIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trimStart().startsWith("import ")) {
      lastImportIdx = i;
    }
  }
  if (lastImportIdx === -1) {
    // No imports, insert at top
    lines.splice(0, 0, ...importStatements, "");
  } else {
    lines.splice(lastImportIdx + 1, 0, ...importStatements);
  }
  return lines.join("\n");
}

for (const relPath of targetFiles) {
  const absPath = join(__dirname, relPath);
  if (!existsSync(absPath)) {
    console.log(`SKIP (not found): ${relPath}`);
    continue;
  }

  let content = readFileSync(absPath, "utf-8");
  const imageFiles = findImageFiles(content);

  if (imageFiles.length === 0) {
    console.log(`OK (no /images/ refs): ${relPath}`);
    continue;
  }

  // Check which files actually exist in images dir
  const validImports = [];
  const replacements = {};

  for (const imgFile of imageFiles) {
    const imgPath = join(imagesDir, imgFile);
    if (!existsSync(imgPath)) {
      console.log(`  WARN: ${imgFile} not found in src/assets/images/, skipping`);
      continue;
    }

    const varName = toVarName(imgFile);

    // Check if import already exists
    const importRegex = new RegExp(`import\\s+${varName}\\s+from`);
    if (importRegex.test(content)) {
      console.log(`  SKIP (import exists): ${imgFile} -> ${varName}`);
      validImports.push({ file: imgFile, varName, alreadyExists: true });
    } else {
      validImports.push({ file: imgFile, varName, alreadyExists: false });
    }
    replacements[`/images/${imgFile}`] = varName;
  }

  if (validImports.length === 0) {
    console.log(`OK (no valid refs): ${relPath}`);
    continue;
  }

  // Build import statements
  const newImports = validImports
    .filter((v) => !v.alreadyExists)
    .map((v) => `import ${v.varName} from "@/assets/images/${v.file}";`);

  // Replace URL strings with variable references
  // We need to handle both " and ' variants
  for (const [urlStr, varName] of Object.entries(replacements)) {
    // Replace "/images/file.jpg" with varName (for JSX context)
    content = content.replaceAll(`"${urlStr}"`, varName);
    content = content.replaceAll(`'${urlStr}'`, varName);
  }

  // Add imports
  if (newImports.length > 0) {
    content = addImport(content, newImports);
  }

  writeFileSync(absPath, content, "utf-8");
  console.log(`FIXED: ${relPath} (${validImports.length} refs, ${newImports.length} new imports)`);
}

// Also fix SitesSection.tsx
const sitesPath = join(srcDir, "components", "SitesSection.tsx");
if (existsSync(sitesPath)) {
  let sitesContent = readFileSync(sitesPath, "utf-8");
  sitesContent = sitesContent.replaceAll(
    "@/assets/images/imported/",
    "@/assets/images/"
  );
  writeFileSync(sitesPath, sitesContent, "utf-8");
  console.log("FIXED: src/components/SitesSection.tsx (broken imported/ paths)");
}

// Fix Gastronomia.tsx - GASTRO_IMAGES array needs to use imports
const gastroPath = join(srcDir, "pages", "Gastronomia.tsx");
if (existsSync(gastroPath)) {
  let gastroContent = readFileSync(gastroPath, "utf-8");

  // The imports were injected mid-file, and GASTRO_IMAGES still uses URL strings.
  // Move the three imports to after line 15, fix GASTRO_IMAGES
  gastroContent = gastroContent.replace(
    `import { logger } from "@/lib/logger";
import gastronomia_pastes from "@/assets/images/gastronomia-pastes.jpg";
import gastronomia_paste from "@/assets/images/gastronomia-paste.jpg";
import gastronomia_festival from "@/assets/images/gastronomia-festival.jpg";`,
    ""
  );

  // Add them after the existing imports (line 15 = pasteImg, rdm1, rdm2)
  gastroContent = gastroContent.replace(
    `import rdm2 from "@/assets/images/rdm2.jpeg";`,
    `import rdm2 from "@/assets/images/rdm2.jpeg";
import gastronomia_pastes from "@/assets/images/gastronomia-pastes.jpg";
import gastronomia_paste from "@/assets/images/gastronomia-paste.jpg";
import gastronomia_festival from "@/assets/images/gastronomia-festival.jpg";`
  );

  // Fix GASTRO_IMAGES array
  gastroContent = gastroContent.replace(
    `const GASTRO_IMAGES = [
  "/images/gastronomia-pastes.jpg",
  "/images/gastronomia-paste.jpg",
  "/images/gastronomia-festival.jpg",
];`,
    `const GASTRO_IMAGES = [
  gastronomia_pastes,
  gastronomia_paste,
  gastronomia_festival,
];`
  );

  writeFileSync(gastroPath, gastroContent, "utf-8");
  console.log("FIXED: src/pages/Gastronomia.tsx (GASTRO_IMAGES imports)");
}

// Also copy rdm-hero.png to public/images/ for OG tags & manifest
const heroSrc = join(imagesDir, "rdm-hero.png");
const publicImagesDir = join(publicDir, "images");

// Check if rdm-hero.png exists in images
if (existsSync(heroSrc)) {
  if (!existsSync(publicImagesDir)) {
    mkdirSync(publicImagesDir, { recursive: true });
  }
  copyFileSync(heroSrc, join(publicImagesDir, "rdm-hero.png"));
  console.log("COPIED: public/images/rdm-hero.png (for OG tags + manifest)");
}

console.log("\nDONE.");
