import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const workspace = path.join(root, 'workspace')
const outDir = path.join(workspace, '_scan_thumbs')
fs.mkdirSync(outDir, { recursive: true })

const files = fs
  .readdirSync(workspace)
  .filter((f) => /\.jpe?g$/i.test(f) && f.startsWith('IMG_'))

for (const f of files.sort()) {
  const src = path.join(workspace, f)
  const base = path.basename(f, path.extname(f))
  const dest = path.join(outDir, `${base}-thumb.jpg`)
  await sharp(src)
    .resize({ width: 900, height: 900, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82 })
    .toFile(dest)
  console.log(dest)
}
