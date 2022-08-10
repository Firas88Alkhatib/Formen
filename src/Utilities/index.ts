import { EventsNames, IChangeObject, IValidObject, ITouchObject, IValidatingObject } from '../types'

export const changeEvent = (data: IChangeObject) => {
  return new CustomEvent<IChangeObject>(EventsNames.change, { detail: data })
}
export const touchEvent = (data: ITouchObject) => {
  return new CustomEvent<ITouchObject>(EventsNames.touch, { detail: data })
}
export const validEvent = (data: IValidObject) => {
  return new CustomEvent<IValidObject>(EventsNames.valid, { detail: data })
}

export const invalidSubmitEvent = () => {
  return new CustomEvent(EventsNames.invalidSubmit)
}
export const validatingEvent = (data: IValidObject) => {
  return new CustomEvent<IValidObject>(EventsNames.valid, { detail: data })
}

export const getFormControllsNames = (form?: HTMLFormElement) => {
  return Array.from(new FormData(form).keys())
}
export const dispachEventAll = (form: HTMLFormElement | null, event: CustomEvent) => {
  const names = getFormControllsNames(form || undefined)
  names.forEach((name) => {
    const element = form?.elements.namedItem(name)
    element instanceof Element && element.dispatchEvent(event)
  })
}
