import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const workspace = path.join(root, 'workspace')
const outDir = path.join(root, 'public', 'images', 'elysian')
const mapPath = path.join(import.meta.dirname, 'elysian-image-map.json')

const map = JSON.parse(fs.readFileSync(mapPath, 'utf8'))
fs.mkdirSync(outDir, { recursive: true })

const maxLongEdge = 2000
const webpQuality = 85

for (const [filename, basename] of Object.entries(map)) {
  const src = path.join(workspace, filename)
  if (!fs.existsSync(src)) {
    console.warn('Missing:', src)
    continue
  }
  const dest = path.join(outDir, `${basename}.webp`)
  await sharp(src)
    .rotate()
    .resize({
      width: maxLongEdge,
      height: maxLongEdge,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: webpQuality, effort: 4 })
    .toFile(dest)
  const st = fs.statSync(dest)
  console.log(`${basename}.webp\t${Math.round(st.size / 1024)} KB`)
}
