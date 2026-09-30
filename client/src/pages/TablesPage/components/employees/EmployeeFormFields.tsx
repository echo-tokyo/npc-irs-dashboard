import { useState, type ChangeEvent } from 'react'
import type { Department } from '@/types/department'
import type {
  EmployeeForm,
  EmployeeFormErrors,
} from '../../utils/employee-form'
import { MenuItem, Stack, TextField } from '@mui/material'

const hiddenDateStyle = { '& input': { color: 'transparent' } }

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
  const [isDateFocused, setIsDateFocused] = useState(false)

  const fieldProps = (name: keyof EmployeeForm) => ({
    name,
    value: form[name],
    onChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
  })

  const departmentValue = departments.length > 0 ? form.department_id : ''
  const isDateEmpty = !form.hire_date && !isDateFocused

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
        sx={isDateEmpty ? hiddenDateStyle : undefined}
        onFocus={() => setIsDateFocused(true)}
        onBlur={() => setIsDateFocused(false)}
        slotProps={{ inputLabel: { shrink: !isDateEmpty } }}
      />
    </Stack>
  )
}
