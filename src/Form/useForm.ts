import { useEffect, useState } from 'react'
import { IChangeObject, IValidObject, ITouchObject, EventsNames } from 'types'
import { invalidSubmitEvent, dispachEventAll } from 'Utilities'

interface IUseFormProps {
  onSubmit: (values: any) => void
}
export const useForm = ({ onSubmit }: IUseFormProps) => {
  const [form, setForm] = useState<HTMLFormElement | null>(null)
  const [values, setValues] = useState({})
  const [elementsValid, setElementsValid] = useState<Record<string, boolean>>({})
  // const [elementsValidating, setElementsValidating] = useState<Record<string, boolean>>({})
  const [isTouched, setIsTouched] = useState<boolean>()

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const isFormValid = Object.values(elementsValid).every((item) => item)
    if (!isFormValid) return dispachEventAll(form, invalidSubmitEvent())

    onSubmit(values)
  }

  useEffect(() => {
    if (form) {
      const changeListener = (e: Event) => {
        const { name, value } = (e as CustomEvent<IChangeObject>).detail
        setValues((v) => ({ ...v, ...{ [name]: value } }))
      }
      const validListener = (e: Event) => {
        const { name, isValid } = (e as CustomEvent<IValidObject>).detail
        setElementsValid((els) => ({ ...els, ...{ [name]: isValid } }))
      }
      const touchListener = (e: Event) => {
        const value = (e as CustomEvent<ITouchObject>).detail
        setIsTouched(value.isTouched)
      }
      // const validatingListener = (e: Event) => {
      //   const { name, isValidating } = (e as CustomEvent<IValidatingObject>).detail
      //   setElementsValidating((els) => ({ ...els, ...{ [name]: isValidating } }))
      // }
      form.addEventListener(EventsNames.touch, touchListener, { once: true })
      form.addEventListener(EventsNames.change, changeListener, false)
      form.addEventListener(EventsNames.valid, validListener, false)
      // form.addEventListener(EventsNames.validating, validatingListener, false)

      return () => {
        form.removeEventListener(EventsNames.touch, touchListener)
        form.removeEventListener(EventsNames.change, changeListener)
        form.removeEventListener(EventsNames.valid, validListener)
        // form.removeEventListener(EventsNames.validating, validatingListener)
      }
    }
  }, [form])

  const formRef = (node: HTMLFormElement | null) => setForm(node)
  return { formRef, onSubmitHandler, isTouched }
}
