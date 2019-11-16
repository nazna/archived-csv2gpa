#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const jschardet_1 = require("jschardet");
const iconv_lite_1 = require("iconv-lite");
const sync_1 = __importDefault(require("csv-parse/lib/sync")); // eslint-disable-line import/default
const yargs_1 = __importDefault(require("yargs"));
const chalk_1 = __importDefault(require("chalk"));
const gradePoint = {
    Ｓ: 4,
    Ａ: 3,
    Ｂ: 2,
    Ｃ: 1,
    Ｄ: 0
};
yargs_1.default.demandCommand(1);
const argv = yargs_1.default.parse();
const filename = argv._[0];
const content = fs_1.readFileSync(filename);
const { encoding } = jschardet_1.detect(content);
const decoded = iconv_lite_1.decode(content, encoding);
const extracted = decoded.split('\n\n')[1];
const options = {
    columns: true
};
const records = sync_1.default(extracted, options);
const numberOfCredit = records.length;
const gradePoints = records.map(c => gradePoint[c['評語']]);
const sumOfPoint = gradePoints.reduce((a, c) => a + c);
const gpa = sumOfPoint / numberOfCredit;
console.log(`\nあなたの GPA は ${chalk_1.default.bold.red(gpa)} です.`);
