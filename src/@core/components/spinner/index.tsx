// ** MUI Imports
import { useTheme } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const FallbackSpinner = ({ sx }: { sx?: BoxProps['sx'] }) => {
  // ** Hook
  const theme = useTheme()

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
      <svg width={82} height={56.375} viewBox='0 0 32 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <svg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 276.86 276.86'>
          <defs>
            <style>.cls-1 {}</style>
          </defs>
          <path
            className='cls-1'
            fill={theme.palette.primary.main}
            d='m43.14,83.58h33.25l22.69,95.16,27.97-95.16h23.22l27.97,95.16,22.69-95.16h33.25l-40.11,135.61h-27.97l-27.44-86.18-27.18,86.18h-27.97L43.14,83.58Z'
          />
          <path
            className='cls-1'
            fill={theme.palette.primary.main}
            d='m138.43,276.86C62.1,276.86,0,214.76,0,138.43S62.1,0,138.43,0s138.43,62.1,138.43,138.43-62.1,138.43-138.43,138.43Zm0-267C67.53,9.86,9.86,67.53,9.86,138.43s57.68,128.57,128.57,128.57,128.57-57.68,128.57-128.57S209.33,9.86,138.43,9.86Z'
          />
        </svg>
      </svg>
      <CircularProgress disableShrink sx={{ mt: 6 }} />
    </Box>
  )
}

export default FallbackSpinner
