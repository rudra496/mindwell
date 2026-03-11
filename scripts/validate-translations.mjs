import fs from 'node:fs'
import path from 'node:path'

const enPath = path.resolve('messages/en.json')
const bnPath = path.resolve('messages/bn.json')

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'))
const bn = JSON.parse(fs.readFileSync(bnPath, 'utf8'))

function flatten(obj, prefix = '') {
  const out = {}
  for (const [key, value] of Object.entries(obj)) {
    const next = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(out, flatten(value, next))
    } else {
      out[next] = String(value)
    }
  }
  return out
}

const enFlat = flatten(en)
const bnFlat = flatten(bn)

const missingInBn = Object.keys(enFlat).filter((key) => !(key in bnFlat))
const missingInEn = Object.keys(bnFlat).filter((key) => !(key in enFlat))

const placeholderTokens = ['TODO', 'TBD', 'TRANSLATE_ME', '__MISSING__']
const untranslated = Object.entries(bnFlat)
  .filter(([key, value]) => value === key || placeholderTokens.some((token) => value.includes(token)))
  .map(([key]) => key)

if (missingInBn.length) {
  console.error('Missing keys in bn.json:')
  missingInBn.forEach((k) => console.error(`  - ${k}`))
}

if (missingInEn.length) {
  console.error('Missing keys in en.json:')
  missingInEn.forEach((k) => console.error(`  - ${k}`))
}

if (untranslated.length) {
  console.error('Potential untranslated values in bn.json:')
  untranslated.forEach((k) => console.error(`  - ${k}`))
}

if (missingInBn.length || missingInEn.length || untranslated.length) {
  process.exit(1)
}

console.log(`Translation validation passed (${Object.keys(enFlat).length} keys).`)
