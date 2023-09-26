import React, { useState } from 'react'
import { NextPage } from 'next'
import Button from '@/components/Button'
import { useForm } from 'react-hook-form'
import Editor from 'react-simple-code-editor'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism.css'
import { languages } from 'prismjs/components/prism-core'
import { fixDuplicated, hightlightWithLineNumbers, validateInput } from '@/utils'

interface FormType {
  input:string
}

const Home : NextPage = () => {
  const [text, setText] = useState<string>('')
  const [errors, setErrors] = useState<string[]>([])
  const [validateResult, setValidateResult] = useState(true)
  const [disabled, setDisabled] = useState(false)
  const [duplicated, setDuplicated] = useState(false)

  const { handleSubmit} = useForm<FormType>({
    mode: 'all',
  })
    
  const onSubmit = () => {
    const result = validateInput(text)
    setErrors(result.result)
    setValidateResult(result.validateResult)
    setDisabled(result.disabled)
    setDuplicated(result.duplicated)
  }

  const fixDuplicate = () => {
    setText(fixDuplicated(text))
    setDisabled(false)
    setValidateResult(true)
    setDuplicated(false)    
  }

  const combine = () => {  
    setText(fixDuplicated(text))
    setDisabled(false)
    setValidateResult(true)
    setDuplicated(false)
  }
  
  return(
    <div className='flex flex-col items-center justify-center w-full h-screen'>
      <div className='flex flex-col w-1/2'>
        <div className='flex justify-between'>
          <span className='text-base font-medium text-white'>Addresses with Amounts</span>
          <span className='text-white hover:cursor-pointer'>Upload File</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='w-full mt-6 max-h-[300px] overflow-auto'>
            <Editor
              value={text}
              onValueChange={code => setText(code)}
              highlight={code => hightlightWithLineNumbers(code, languages.js)}
              padding={20}
              textareaId='codeArea'
              className='editor min-h-[300px]'
            />
          </div>       
          <div className='flex flex-row justify-between mt-6'>
            <span className='text-base font-medium text-white'>Separated by &apos;,&apos; or &apos; &apos; or &apos;=&apos;</span>
            <span className='text-[#5a5b67] hover:underline hover:cursor-pointer'>Show Examples</span>
          </div>
          {duplicated && (
            <div className='flex flex-row justify-between mt-6'>
              <span className='text-base font-medium text-white'>Duplicated</span>
              <div className='flex flex-row gap-6'>
                <div className='pr-8 border-r-2 border-red-600'><span className='text-[#cf372e] hover:cursor-pointer' onClick={fixDuplicate}>Keep the first one</span></div>
                <span className='text-[#cf372e] hover:cursor-pointer' onClick={combine}>Combine Balance</span>
              </div>
            </div>
          )}
          {!validateResult && (
            <div className='flex flex-col p-4 rounded-lg border-2 border-[#682d2d] gap-2 mt-6'>
              {
                errors?.map(error => {
                  return (
                    <span className='text-[#cf372e]'>{error}</span>
                  )
                })
              }              
            </div>
          )
          }          
          <div className='py-6'>
            <Button text='Next' variant='gradient' className='w-full' isLoading={disabled}/>
          </div>
        </form>
      </div>      
    </div>
  )
}

export default Home
