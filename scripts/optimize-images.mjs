/**
 * Génère les versions légères des captures de projets.
 *
 *   public/projects/<slug>/images/<chemin>.png    (original, ouvert seulement sur demande)
 *   → public/projects/<slug>/optimized/<chemin>.sm.webp   640 px, recadré en 16:10 par le haut
 *   → public/projects/<slug>/optimized/<chemin>.md.webp   1280 px, recadré en 16:10 par le haut
 *   → public/projects/<slug>/optimized/<chemin>.full.webp page entière, 1600 px de large max
 *
 * Le site est un export statique (images non optimisées par Next) : sans ce script,
 * le navigateur téléchargerait des PNG de plusieurs Mo pour afficher une vignette.
 *
 * Usage : npm run images   (à relancer après avoir ajouté ou remplacé une capture)
 */
import { mkdir, readdir, stat } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import sharp from "sharp";

const ROOT = "public/projects";
const SOURCE_EXT = /\.(png|jpe?g|webp)$/i;
const FRAME_RATIO = 10 / 16;
const FULL_MAX_WIDTH = 1600;
const BACKGROUND = { r: 255, g: 255, b: 255, alpha: 1 };

sharp.cache(false);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (SOURCE_EXT.test(entry.name)) yield path;
  }
}

async function isFresh(source, target) {
  try {
    return (await stat(target)).mtimeMs >= (await stat(source)).mtimeMs;
  } catch {
    return false;
  }
}

/** Vignette 16:10 : le haut de la page (ce qu'on voit à l'ouverture), ou l'image entière si elle est plus large que le cadre. */
async function frame(source, target, width) {
  const { width: w = 0, height: h = 0 } = await sharp(source).metadata();
  const height = Math.round(width * FRAME_RATIO);
  const pipeline = sharp(source, { limitInputPixels: false });
  if (w / h > 1 / FRAME_RATIO) {
    // Schéma très large : on le montre en entier sur fond blanc plutôt que de couper les côtés.
    pipeline.resize(width, height, { fit: "contain", background: BACKGROUND });
  } else {
    const cropHeight = Math.min(h, Math.round(w * FRAME_RATIO));
    pipeline.extract({ left: 0, top: 0, width: w, height: cropHeight }).resize(width, height, { fit: "cover", position: "top" });
  }
  await pipeline.flatten({ background: BACKGROUND }).webp({ quality: 78 }).toFile(target);
}

async function full(source, target) {
  await sharp(source, { limitInputPixels: false })
    .resize({ width: FULL_MAX_WIDTH, withoutEnlargement: true })
    .flatten({ background: BACKGROUND })
    .webp({ quality: 80 })
    .toFile(target);
}

let written = 0;
for (const slug of await readdir(ROOT)) {
  const imagesDir = join(ROOT, slug, "images");
  try {
    await stat(imagesDir);
  } catch {
    continue;
  }
  for await (const source of walk(imagesDir)) {
    const base = join(ROOT, slug, "optimized", relative(imagesDir, source)).replace(SOURCE_EXT, "");
    await mkdir(dirname(base), { recursive: true });
    const jobs = [
      [`${base}.sm.webp`, (t) => frame(source, t, 640)],
      [`${base}.md.webp`, (t) => frame(source, t, 1280)],
      [`${base}.full.webp`, (t) => full(source, t)],
    ];
    for (const [target, run] of jobs) {
      if (await isFresh(source, target)) continue;
      await run(target);
      written++;
    }
  }
}
console.log(`optimize-images : ${written} fichier(s) généré(s).`);
