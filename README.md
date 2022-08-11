# Formen

Form management library for React

## Install

`npm install formen`

## Usage

It's a good idea to prepare Field and Form components.

### On the field level.

```js
import { useState } from 'react'
import { useField } from 'formen'

export const Field = ({ name, validation, initialValue }) => {
  const { fieldRef, fieldName, setIsTouched, onChange, isTouched, error } = useField({ name, validation, initialValue })
  const [value,setValue] = useState("")

  return (
      <input
        ref={fieldRef}
        name={fieldName}
        value={value}
        onChange={(event) => {
          setValue(event.currentTarget.value)
          onChange(event.currentTarget.value)
        }}
        onBlur={() => setIsTouched(true)}
      />
      {isTouched && error && <span>{error}</span>}
  )
}

```

### On the form level

```js
import { useForm } from 'formen'

export const Form = ({ onSubmit, children }) => {
  const { formRef, onSubmitHandler } = useForm({ onSubmit })
  return (
    <form ref={formRef} onSubmit={onSubmitHandler}>
      {children}
    </form>
  )
}
```

### Using them

```js
import { Field, Form } from '...'

export const App = () => {
  const firstNameValidation = (firstName) => {
    switch (firstName) {
      case 'test':
        return 'invalid name'
      default:
        return
    }
  }
  const lastNameValidation = (lastName) => {
    switch (lastName) {
      case 'test2':
        return 'invalid lastName'
      default:
        return
    }
  }
  return (
    <Form onSubmit={(values) => console.log(values)}>
      <Field name="firstName" validation={firstNameValidation} />
      <Field name="lastName" validation={lastNameValidation} />
      <button type="submit">submit</button>
    </Form>
  )
}
```
