#!/usr/bin/env node

import { readFileSync } from 'fs'
import { detect } from 'jschardet'
import { decode } from 'iconv-lite'
import { Options } from 'csv-parse'
import parse from 'csv-parse/lib/sync' // eslint-disable-line import/default
import yargs from 'yargs'
import chalk from 'chalk'

const gradePoint: GradePoint = {
  Ｓ: 4,
  Ａ: 3,
  Ｂ: 2,
  Ｃ: 1,
  Ｄ: 0
}

yargs.demandCommand(1)

const argv = yargs.parse()

const filename = argv._[0]
const content = readFileSync(filename)

const { encoding } = detect(content)
const decoded = decode(content, encoding)

const extracted = decoded.split('\n\n')[1]

const options: Options = {
  columns: true
}

const records: GradeRecords = parse(extracted, options)

const numberOfCredit = records.length

const gradePoints = records.map(c => gradePoint[c['評語']])
const sumOfPoint = gradePoints.reduce((a: number, c: number) => a + c)

const gpa = sumOfPoint / numberOfCredit

console.log(`\nあなたの GPA は ${chalk.bold.red(gpa)} です.`)
