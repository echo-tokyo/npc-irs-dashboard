const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/
const INTEGER_PATTERN = /^-?\d+$/
const MONEY_PATTERN = /^\d+(\.\d{1,2})?$/

export class ValidationError extends Error {}

function isEmpty(value: unknown): boolean {
  if (value === undefined || value === null || value === '') {
    return true
  }

  return false
}

export const parseId = (value: unknown) => {
  const id = Number(value)

  if (!Number.isInteger(id) || id < 1) {
    throw new ValidationError('Некорректный id')
  }
  return id
}

export const readText = (
  value: unknown,
  field: string,
  { maxLength }: { maxLength: number },
) => {
  if (typeof value !== 'string' || !value.trim()) {
    throw new ValidationError(`${field}: обязательное поле`)
  }

  const text = value.trim()

  if (text.length > maxLength) {
    throw new ValidationError(`${field}: не длиннее ${maxLength} символов`)
  }
  return text
}

export const readInteger = (
  value: unknown,
  field: string,
  { min = -Infinity, max = Infinity } = {},
) => {
  if (isEmpty(value)) {
    return null
  }
  if (!INTEGER_PATTERN.test(String(value))) {
    throw new ValidationError(`${field}: ожидается целое число`)
  }

  const number = Number(value)

  if (number < min) {
    throw new ValidationError(`${field}: не меньше ${min}`)
  }
  if (number > max) {
    throw new ValidationError(`${field}: не больше ${max}`)
  }
  return number
}

export const readMoney = (
  value: unknown,
  field: string,
  { max }: { max: number },
) => {
  if (isEmpty(value)) {
    return null
  }

  const text = String(value)

  if (!MONEY_PATTERN.test(text)) {
    throw new ValidationError(
      `${field}: неотрицательное число, не больше 2 знаков после точки`,
    )
  }
  if (Number(text) > max) {
    throw new ValidationError(`${field}: не больше ${max}`)
  }
  return text
}

export const readDate = (value: unknown, field: string) => {
  if (isEmpty(value)) {
    return null
  }
  if (typeof value !== 'string' || !DATE_PATTERN.test(value)) {
    throw new ValidationError(`${field}: ожидается дата в формате ГГГГ-ММ-ДД`)
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime()) || !date.toISOString().startsWith(value)) {
    throw new ValidationError(`${field}: такой даты не существует`)
  }
  return value
}
