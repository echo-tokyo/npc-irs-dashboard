import { useState } from 'react'
import { Button, type ButtonProps } from '@mui/material'
import type { Employee } from '@/types/employee'
import { EmployeeFormDialog } from './EmployeeFormDialog'

type EmployeeFormButtonProps = ButtonProps & {
  employee?: Employee | null
  onSaved: () => void
}

export const EmployeeFormButton = ({
  employee = null,
  onSaved,
  ...buttonProps
}: EmployeeFormButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSaved = () => {
    setIsOpen(false)
    onSaved()
  }

  return (
    <>
      <Button {...buttonProps} onClick={() => setIsOpen(true)} />
      {isOpen && (
        <EmployeeFormDialog
          employee={employee}
          onClose={() => setIsOpen(false)}
          onSaved={handleSaved}
        />
      )}
    </>
  )
}
