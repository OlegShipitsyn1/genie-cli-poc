import { fileURLToPath } from 'url'
import inquirer from 'inquirer'
import { Subject } from 'rxjs'
import path from 'path'
import fs from 'fs'
import { processModule } from '../lib/processModule.js'
import { throwException, info } from '../lib/logger.js'
import yaml from 'js-yaml'
const __dirname = fileURLToPath(new URL('.', import.meta.url))
const commandName = path.basename(fileURLToPath(import.meta.url), '.js')

export const prompts = new Subject()

const shouldFileBeReplaced = (q) => {
  if (q.answer) return prompts.complete()
  prompts.next({
    name: 'renameInsteadOfReplacing',
    type: 'input',
    message: 'Введите новое название для компонента'
  })
}

const renameInsteadOfReplacing = (q) => {
  console.log('renamed to', q.answer)
  prompts.complete()
}

const answerStrategies = {
  shouldFileBeReplaced,
  renameInsteadOfReplacing
}

const onEachAnswer = (q) => {
  console.log(q)
  answerStrategies[q.name](q)
}

const onError = (err) => {
  console.log('error has occurred', err)
}

const onComplete = () => {
  console.log('completed')
}

inquirer.prompt(prompts).ui.process.subscribe(onEachAnswer, onError, onComplete)

const isExistingFile = (path) => {
  try { if (fs.existsSync(path)) return true }
  catch (e) { return false }
}

// const askForReplacement = () => {
//   prompts.next({
//     name: 'shouldFileBeReplaced',
//     type: 'confirm',
//     message: 'Заменить файл?'
//   })
// }

const implementFeature = async (argv) => {
  const copyPath = argv.path ? path.resolve(process.cwd(), argv.path) : process.cwd()
  const component = argv.component
  const pathWithComponent = path.resolve(copyPath, component)

  const filePath = path.resolve(__dirname, `../db/${component}`)
  if (!isExistingFile(filePath)) throwException(`Non existing component "${component}"`)
  const template = fs.readFileSync(filePath, 'utf8')
  const configPath = path.format({ ...path.parse(filePath), base: '', ext: '.yml' })
  const config = yaml.load(fs.readFileSync(configPath, 'utf8'))
  const readyContent = await processModule(component, template, config)
  try {
    fs.writeFileSync(pathWithComponent, readyContent, 'utf8')
    info(`"${component}" successfully created at "${copyPath}"`)
  } catch (e) {
    console.error(e)
  }
  process.exit(0)
}

export default [
  `${commandName} <component> [path]`,
  'clones component into directory',
  () => {},
  implementFeature
]