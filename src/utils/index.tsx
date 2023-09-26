import { highlight } from 'prismjs/components/prism-core'

export const classNames = (...classes: string[]) =>
  classes.filter(Boolean).join(' ')

export  const hightlightWithLineNumbers = (input:any, language:any) =>
  highlight(input, language)
    .split('\n')
    .map((line: any, i:number) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
    .join('\n')

export const validateInput = (input: string) => {
  const lines = input.split('\n')
  let result = ''
  let duplicated = false

  const addressDuplicates: { [key: string]: number[] } = {}
  lines.forEach((line, index) => {
    const parts = line.split(/=| |,/)
    if (parts.length < 2) {
      result += 'Input value should not be empty\n'
      return
    }
    const address = parts[0].trim()
    const amount = parts[1].trim()
    if (!/^(0x)?[0-9a-fA-F]{40}$/.test(address)&&!/^[1-9]\d*$/.test(amount)) {
      result += `Line ${index + 1} invalid Ethereum address and wrong amount\n`
    }
    else if(!/^(0x)?[0-9a-fA-F]{40}$/.test(address)){
      result += `Line ${index + 1} invalid Ethereum address\n`
    }
    else if(!/^[1-9]\d*$/.test(amount)){
      result += `Line ${index + 1} wrong amount\n`
    }
    else {
      if (addressDuplicates[address]) {
        addressDuplicates[address].push(index + 1)
        duplicated = true
      } else {
        addressDuplicates[address] = [index + 1]
      }
    }
  })

  const sortedAddressesByIndex = Object.entries(addressDuplicates).sort((a, b) => a[1][0] - b[1][0])
  sortedAddressesByIndex.filter(entry => entry[1].length > 1).forEach(entry => {
    result += `${entry[0]} duplicate in Line: ${entry[1].join(', ')}\n`
  })

  const resultArray = result.split('\n').filter(line => line !== '')

  let output:{validateResult:boolean, result:Array<string>, disabled:boolean, duplicated:boolean}
  
  if(resultArray.length>0) output = {validateResult:false, result: resultArray, disabled:true, duplicated}
  
  else output = {validateResult:true, result: [], disabled:false, duplicated}

  return output
}

export const fixDuplicated = (text: string) => {
  const lines = text.split('\n').filter((line) => line.trim() !== '')
  const duplicates: { [address: string]: Array<number> } = {}
  const filteredLines: string[] = []

  lines.forEach((line, index) => {
    const address = line.trim().split('=')[0].trim().toLowerCase()
    if (duplicates[address]) {
      duplicates[address].push(index + 1)
    } else {
      duplicates[address] = [index + 1]
      filteredLines.push(line)
    }
  })

  return filteredLines.join('\n')
}

export const combineBalance = (text: string) => {
  const lines = text.split('\n')
  const addressMap: { [trimmedAddress: string]: number } = {}

  lines.forEach((line) => {
    const [address, amount] = line.split(/=| |,/)
    const trimmedAddress = address.trim()
    const trimmedAmount = parseInt(amount.trim(), 10)
    if (!Number.isNaN(trimmedAmount)) {
      if (addressMap[trimmedAddress]) {
        addressMap[trimmedAddress] += trimmedAmount
      } else {
        addressMap[trimmedAddress] = trimmedAmount
      }
    }
  })
  
  return Object.entries(addressMap)
    .map(([address, amount]) => `${address}=${amount}`)
    .join('\n')
}