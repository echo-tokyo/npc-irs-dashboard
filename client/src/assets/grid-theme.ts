import { colorSchemeDark, themeQuartz } from 'ag-grid-community'
import { theme } from './theme'

const { palette, typography } = theme

export const gridTheme = themeQuartz.withPart(colorSchemeDark).withParams({
  backgroundColor: palette.background.paper,
  foregroundColor: palette.text.primary,
  headerBackgroundColor: palette.background.paper,
  headerTextColor: palette.text.secondary,
  headerFontWeight: 700,
  accentColor: palette.primary.main,
  borderColor: 'rgba(255, 255, 255, 0.1)',
  fontFamily: typography.fontFamily,
  fontSize: 14,
  wrapperBorder: false,
  columnBorder: false,
})
