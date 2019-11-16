declare type GradeRecord = {
  'No.': string
  開講年度: string
  開講学期: string
  時間割コード: string
  科目: string
  '教員名 ': string
  評語: string
  合否: string
  '': string
}

declare type GradeRecords = GradeRecord[]

declare type GradePoint = {
  [key: string]: number
  readonly Ｓ: number
  readonly Ａ: number
  readonly Ｂ: number
  readonly Ｃ: number
  readonly Ｄ: number
}
