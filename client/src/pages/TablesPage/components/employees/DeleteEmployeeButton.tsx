import { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material'
import { toast } from 'sonner'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { deleteEmployee } from '@/services/employee-service'
import type { Employee } from '@/types/employee'

interface DeleteEmployeeButtonProps {
  employee: Employee | null
  onDeleted: () => void
}

export const DeleteEmployeeButton = ({
  employee,
  onDeleted,
}: DeleteEmployeeButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleConfirm = async () => {
    setIsOpen(false)

    if (!employee) {
      return
    }

    try {
      await deleteEmployee(employee.id)
      toast.success('Сотрудник удалён')
      onDeleted()
    } catch {
      // The error toast is shown by the api interceptor
    }
  }

  return (
    <>
      <Button
        variant='contained'
        color='error'
        startIcon={<DeleteIcon />}
        disabled={!employee}
        onClick={() => setIsOpen(true)}
      >
        Удалить
      </Button>
      <ConfirmDialog
        open={isOpen}
        title='Удалить сотрудника?'
        message={employee?.full_name}
        confirmText='Удалить'
        onConfirm={handleConfirm}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}
