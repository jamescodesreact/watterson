// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'
import Typography, { TypographyProps } from '@mui/material/Typography'

// ** Type Import
import { LayoutProps } from 'src/@core/layouts/types'

// ** Custom Icon Import
import Icon from 'src/@core/components/icon'
import { WattersonLogo } from '/public/images/logo2.svg'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

interface Props {
  navHover: boolean
  collapsedNavWidth: number
  hidden: LayoutProps['hidden']
  navigationBorderWidth: number
  toggleNavVisibility: () => void
  settings: LayoutProps['settings']
  saveSettings: LayoutProps['saveSettings']
  navMenuBranding?: LayoutProps['verticalLayoutProps']['navMenu']['branding']
  menuLockedIcon?: LayoutProps['verticalLayoutProps']['navMenu']['lockedIcon']
  menuUnlockedIcon?: LayoutProps['verticalLayoutProps']['navMenu']['unlockedIcon']
}

// ** Styled Components
const MenuHeaderWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(3.5),
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight
}))

const HeaderTitle = styled(Typography)<TypographyProps>({
  fontWeight: 700,
  lineHeight: '24px',
  transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
})

const LinkStyled = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
})

const VerticalNavHeader = (props: Props) => {
  // ** Props
  const {
    hidden,
    navHover,
    settings,
    saveSettings,
    collapsedNavWidth,
    toggleNavVisibility,
    navigationBorderWidth,
    menuLockedIcon: userMenuLockedIcon,
    navMenuBranding: userNavMenuBranding,
    menuUnlockedIcon: userMenuUnlockedIcon
  } = props

  // ** Hooks & Vars
  const theme = useTheme()
  const { navCollapsed } = settings

  const menuCollapsedStyles = navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 }

  const menuHeaderPaddingLeft = () => {
    if (navCollapsed && !navHover) {
      if (userNavMenuBranding) {
        return 0
      } else {
        return (collapsedNavWidth - navigationBorderWidth - 34) / 8
      }
    } else {
      return 6
    }
  }

  const MenuLockedIcon = () => userMenuLockedIcon || <Icon icon='tabler:circle-dot' />

  const MenuUnlockedIcon = () => userMenuUnlockedIcon || <Icon icon='tabler:circle' />

  return (
    <MenuHeaderWrapper className='nav-header' sx={{ pl: menuHeaderPaddingLeft() }}>
      {userNavMenuBranding ? (
        userNavMenuBranding(props)
      ) : (
        <LinkStyled href='/'>
          <svg width={190} height='41' viewBox='0 0 190 41' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <rect width='190' height='41' fill='url(#pattern0)' />
            <defs>
              <pattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'>
                <use xlinkHref='#image0_0_4' transform='matrix(0.00431034 0 0 0.02 -0.0431035 -0.12)' />
              </pattern>
              <image
                id='image0_0_4'
                width='258'
                height='63'
                xlinkHref='data:image/png;base64,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'
              />
            </defs>
          </svg>
        </LinkStyled>
      )}

      {hidden ? (
        <IconButton
          disableRipple
          disableFocusRipple
          onClick={toggleNavVisibility}
          sx={{ p: 0, color: 'text.secondary', backgroundColor: 'transparent !important' }}
        >
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </IconButton>
      ) : userMenuLockedIcon === null && userMenuUnlockedIcon === null ? null : (
        <IconButton
          disableRipple
          disableFocusRipple
          onClick={() => saveSettings({ ...settings, navCollapsed: !navCollapsed })}
          sx={{
            p: 0,
            color: 'text.primary',
            backgroundColor: 'transparent !important',
            '& svg': {
              fontSize: '1.25rem',
              ...menuCollapsedStyles,
              transition: 'opacity .25s ease-in-out'
            }
          }}
        >
          {navCollapsed ? MenuUnlockedIcon() : MenuLockedIcon()}
        </IconButton>
      )}
    </MenuHeaderWrapper>
  )
}

export default VerticalNavHeader
