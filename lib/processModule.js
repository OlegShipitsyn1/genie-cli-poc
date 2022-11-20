import _ from 'lodash'
import { ESLint } from 'eslint'
import { writeFileSync, rmSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import lintingRules from './lintingRules.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const lintContent = async (name, content, eslintConfig) => {
  const eslint = new ESLint({ baseConfig: eslintConfig, fix: true })
  const filePath = path.resolve(__dirname, `../temp/${name}`)
  writeFileSync(filePath, content, 'utf8')
  const [ results ] = await eslint.lintFiles([ filePath ])
  rmSync(filePath)
  return results?.output ?? content
}

const buildModule = (filename, template, config) => {
  const contentWithFilename = template.replace(
    /_FILENAME_/g,
    path.format({ ...path.parse(filename), base: '', ext: '' })
  )
  return contentWithFilename.replace(/\[\s?_CONFIG_[a-zA-Z_.]+\s?]/g, replaceValue => {
    const keys = replaceValue.replace(/\[|\]/g, '').split('.').slice(1).map(s => s.trim())
    const keyPath = keys.join('.')
    return JSON.stringify(_.get(config, keyPath), null, 2)
  })
}

export const processModule = async (filename, template, config) => {
  const content = buildModule(filename, template, config)
  return await lintContent(filename, content, lintingRules)
}