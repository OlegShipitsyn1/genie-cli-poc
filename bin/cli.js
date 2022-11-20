#!/usr/bin/env node
import implement from '../commands/implement.js'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs(hideBin(process.argv))
  .command(...implement)
  .demandCommand(1)
  .parse()