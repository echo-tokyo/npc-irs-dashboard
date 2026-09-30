import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import { Stack } from '@mui/material'
import type { Employee } from '@/types/employee'
import { DeleteEmployeeButton } from './DeleteEmployeeButton'
import { EmployeeFormButton } from './EmployeeFormButton'

interface EmployeesToolbarProps {
  selected: Employee | null
  onChange: () => void
}

const styles = {
  toolbar: { px: 2, pb: 2, justifyContent: 'flex-end' },
}

export const EmployeesToolbar = ({
  selected,
  onChange,
}: EmployeesToolbarProps) => (
  <Stack direction='row' spacing={1} sx={styles.toolbar}>
    <EmployeeFormButton
      variant='contained'
      startIcon={<AddIcon />}
      onSaved={onChange}
    >
      Добавить
    </EmployeeFormButton>
    <EmployeeFormButton
      variant='outlined'
      startIcon={<EditIcon />}
      employee={selected}
      disabled={!selected}
      onSaved={onChange}
    >
      Изменить
    </EmployeeFormButton>
    <DeleteEmployeeButton employee={selected} onDeleted={onChange} />
  </Stack>
)
