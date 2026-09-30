import { useEffect, useState, type ChangeEvent, type SubmitEvent } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { toast } from 'sonner'
import { getDepartments } from '@/services/department-service'
import { createEmployee, updateEmployee } from '@/services/employee-service'
import type { Department } from '@/types/department'
import type { Employee } from '@/types/employee'
import { EmployeeFormFields } from './EmployeeFormFields'
import {
  toEmployeeForm,
  toEmployeePayload,
  validateEmployeeForm,
  type EmployeeFormErrors,
} from '../../utils/employee-form'

interface EmployeeFormDialogProps {
  open: boolean
  employee: Employee | null
  onClose: () => void
  onSaved: () => void
}

export const EmployeeFormDialog = ({
  open,
  employee,
  onClose,
  onSaved,
}: EmployeeFormDialogProps) => {
  const [form, setForm] = useState(() => toEmployeeForm(employee))
  const [errors, setErrors] = useState<EmployeeFormErrors>({})
  const [departments, setDepartments] = useState<Department[]>([])
  const [isSaving, setIsSaving] = useState(false)

  const title = employee ? 'Изменить сотрудника' : 'Новый сотрудник'

  useEffect(() => {
    getDepartments()
      .then(({ rows }) => setDepartments(rows))
      .catch(() => {
        // The error toast is shown by the api interceptor
      })
  }, [])

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, [target.name]: target.value }))
    setErrors((current) => ({ ...current, [target.name]: undefined }))
  }

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validationErrors = validateEmployeeForm(form)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setIsSaving(true)

    try {
      const payload = toEmployeePayload(form)

      if (employee) {
        await updateEmployee(employee.id, payload)
      } else {
        await createEmployee(payload)
      }

      toast.success(employee ? 'Сотрудник изменён' : 'Сотрудник добавлен')
      onSaved()
    } catch {
      // The error toast is shown by the api interceptor
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <form onSubmit={handleSubmit} noValidate>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <EmployeeFormFields
            form={form}
            errors={errors}
            departments={departments}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='secondary' onClick={onClose}>
            Отмена
          </Button>
          <Button type='submit' variant='contained' disabled={isSaving}>
            Сохранить
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
