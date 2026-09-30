const moneyFormat = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
})

export const formatMoney = (value?: string | number | null) => {
  if (value === undefined || value === null) {
    return ''
  }
  return moneyFormat.format(Number(value))
}

export const formatDate = (value?: string | null) => {
  if (!value) {
    return ''
  }
  return value.split('-').reverse().join('.')
}
