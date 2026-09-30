import type { ChangeEvent } from 'react'
import type { Department } from '@/types/department'
import type { EmployeeForm, EmployeeFormErrors } from './employeeForm'
import { MenuItem, Stack, TextField } from '@mui/material'

const emptyDateStyle = { '& input:not(:focus)': { color: 'text.secondary' } }

interface EmployeeFormFieldsProps {
  form: EmployeeForm
  errors: EmployeeFormErrors
  departments: Department[]
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const EmployeeFormFields = ({
  form,
  errors,
  departments,
  onChange,
}: EmployeeFormFieldsProps) => {
  const fieldProps = (name: keyof EmployeeForm) => ({
    name,
    value: form[name],
    onChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
  })

  const departmentValue = departments.length > 0 ? form.department_id : ''
  const dateStyle = form.hire_date ? undefined : emptyDateStyle

  return (
    <Stack spacing={2} sx={{ pt: 1 }}>
      <TextField
        {...fieldProps('department_id')}
        value={departmentValue}
        select
        required
        label='Отдел'
      >
        {departments.map(({ id, name }) => (
          <MenuItem key={id} value={String(id)}>
            {name}
          </MenuItem>
        ))}
      </TextField>
      <TextField {...fieldProps('full_name')} required label='ФИО' />
      <TextField
        {...fieldProps('salary')}
        label='Зарплата, ₽'
        slotProps={{ htmlInput: { inputMode: 'decimal' } }}
      />
      <TextField
        {...fieldProps('age')}
        label='Возраст'
        slotProps={{ htmlInput: { inputMode: 'numeric' } }}
      />
      <TextField
        {...fieldProps('hire_date')}
        type='date'
        label='Дата найма'
        sx={dateStyle}
        slotProps={{ inputLabel: { shrink: true } }}
      />
    </Stack>
  )
}
