export enum EventsNames {
  change = 'formen-change',
  valid = 'formen-valid',
  touch = 'formen-touch',
  invalidSubmit = 'formen-invalidSubmit',
  validating = 'formen-validating',
}

export interface IChangeObject {
  name: string
  value: any
}

export interface IValidatingObject {
  name: string
  isValidating: boolean
}

export interface IValidObject {
  name: string
  isValid: boolean
}
export interface ITouchObject {
  name: string
  isTouched: boolean
}

export type ValidationFunction = (value?: any) => string | undefined
export type ValidFieldElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement
  | HTMLFieldSetElement
  | HTMLOutputElement
