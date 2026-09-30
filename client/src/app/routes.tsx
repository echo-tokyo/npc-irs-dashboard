import AssessmentIcon from '@mui/icons-material/Assessment'
import SettingsIcon from '@mui/icons-material/Settings'
import TableViewIcon from '@mui/icons-material/TableView'
import { PlaceholderPage } from '@/pages/PlaceholderPage'
import { TablesPage } from '@/pages/TablesPage/TablesPage'

export const routes = [
  {
    path: '/',
    title: 'Таблицы',
    icon: <TableViewIcon />,
    Component: TablesPage,
  },
  {
    path: '/reports',
    title: 'Отчёты',
    icon: <AssessmentIcon />,
    Component: PlaceholderPage,
  },
  {
    path: '/settings',
    title: 'Настройки',
    icon: <SettingsIcon />,
    Component: PlaceholderPage,
  },
]
