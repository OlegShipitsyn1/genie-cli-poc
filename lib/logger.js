import chalk from 'chalk'

export const throwException = (text) => {
  console.error(chalk.red(`[GENIE ERROR]: ${text}`))
  process.exit(0)
}

export const info = (text) => {
  console.log(chalk.green(`[GENIE INFO]: ${text}`))
}