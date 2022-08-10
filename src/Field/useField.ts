import { useEffect, useState } from 'react'
import { changeEvent, validEvent } from 'Utilities'
import { ValidationFunction, EventsNames, ValidFieldElement } from 'types'

interface IUseFieldProps {
  name: string
  validation?: ValidationFunction
  initialValue?: any
}
export const useField = ({ name, validation, initialValue }: IUseFieldProps) => {
  const [element, setElement] = useState<ValidFieldElement | null>(null)
  const [fieldValue, setFieldValue] = useState<string>(initialValue || '')
  const [isValid, setIsValid] = useState<boolean>(!validation?.(initialValue) || true)
  const [isTouched, setIsTouched] = useState(false)

  useEffect(() => {
    if (element) {
      const invalidSubmitHandler = () => {
        setIsTouched(true)
      }
      element.addEventListener(EventsNames.invalidSubmit, invalidSubmitHandler)
      return () => element.removeEventListener(EventsNames.invalidSubmit, invalidSubmitHandler)
    }
  }, [element])

  useEffect(() => {
    element?.form?.dispatchEvent(validEvent({ name, isValid }))
  }, [element, isValid])

  const onChange = (changeValue: any) => {
    setIsValid(!validation?.(changeValue))
    element?.form?.dispatchEvent(changeEvent({ name, value: changeValue }))
    setFieldValue(changeValue)
  }

  const fieldRef = (node: HTMLInputElement) => setElement(node)

  return { onChange, fieldRef, fieldName: name, fieldValue, isTouched, setIsTouched, isValid }
}
