const EMPTY_VALUE = '-'

const moneyFormat = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
})

export const formatValue = (value?: string | number | null) => {
  if (value === undefined) {
    return ''
  }
  if (value === null) {
    return EMPTY_VALUE
  }
  return String(value)
}

export const formatMoney = (value?: string | number | null) => {
  if (value === undefined || value === null) {
    return formatValue(value)
  }
  return moneyFormat.format(Number(value))
}

export const formatDate = (value?: string | null) => {
  if (value === undefined || value === null) {
    return formatValue(value)
  }
  return value.split('-').reverse().join('.')
}
