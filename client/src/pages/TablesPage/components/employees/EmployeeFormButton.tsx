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
  const [dialogKey, setDialogKey] = useState(0)

  const handleOpen = () => {
    setDialogKey((key) => key + 1)
    setIsOpen(true)
  }

  const handleSaved = () => {
    setIsOpen(false)
    onSaved()
  }

  return (
    <>
      <Button {...buttonProps} onClick={handleOpen} />
      {dialogKey > 0 && (
        <EmployeeFormDialog
          key={dialogKey}
          open={isOpen}
          employee={employee}
          onClose={() => setIsOpen(false)}
          onSaved={handleSaved}
        />
      )}
    </>
  )
}
