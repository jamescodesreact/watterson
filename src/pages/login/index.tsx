// ** React Imports
import { useState, ReactNode, MouseEvent } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import useBgColor from 'src/@core/hooks/useBgColor'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

// ** Styled Components
const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 680,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500
  }
}))

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    color: theme.palette.text.secondary
  }
}))

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required()
})

const defaultValues = {
  password: 'admin',
  email: 'admin@vuexy.com'
}

interface FormData {
  email: string
  password: string
}

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  // ** Hooks
  const auth = useAuth()
  const theme = useTheme()
  const bgColors = useBgColor()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    const { email, password } = data
    auth.login({ email, password, rememberMe }, () => {
      setError('email', {
        type: 'manual',
        message: 'Email or Password is invalid'
      })
    })
  }

  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            borderRadius: '0px',
            justifyContent: 'center',
            backgroundColor: 'customColors.bodyBg',
            margin: theme => theme.spacing(8, 0, 8, 8)
          }}
        >
          <LoginIllustration alt='login-illustration' src={`/images/pages/bg-login.jpg`} />
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <svg width={160} height={112.7} viewBox='0 0 32 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <svg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1334 277'>
                <defs>
                  <style>.cls-1 {}</style>
                </defs>
                <path
                  className='cls-1'
                  fill={theme.palette.primary.main}
                  d='M43.21,83.65h33.25l22.69,95.16,27.97-95.16h23.22l27.97,95.16,22.69-95.16h33.25l-40.11,135.61h-27.97l-27.44-86.18-27.18,86.18h-27.97L43.21,83.65Z'
                />
                <path
                  className='cls-1'
                  fill={theme.palette.primary.main}
                  d='M370.09,131.23c0-16.92-7.13-24.32-22.96-24.32-11.08,0-20.32,4.49-27.44,13.48l-22.69-16.13c12.14-15.86,29.56-23.53,53.3-23.53s40.37,7.93,47.5,22.73c3.7,7.66,5.01,16.65,5.01,33.57v82.21h-25.6l-2.11-7.93c-8.71,7.93-18.47,10.84-36.94,10.84-33.51,0-46.18-11.63-46.18-42.03,0-32.52,12.4-42.82,50.67-42.82h27.44v-6.08ZM346.6,159.52c-16.89,0-23.48,5.55-23.48,19.3s5.8,18.24,23.48,18.24c10.56,0,17.15-2.38,20.58-7.4,2.37-3.17,2.9-6.61,2.9-15.86v-14.27h-23.49Z'
                />
                <path
                  className='cls-1'
                  fill={theme.palette.primary.main}
                  d='M438.71,109.56v-25.9h15.3l1.85-39.65h30.87v39.65h26.92v25.9h-26.92v56.31c0,20.62,5.28,26.96,23.22,26.7h3.69v26.7h-4.75c-45.39,0-54.89-9.78-54.89-56.57v-53.13h-15.3Z'
                />
                <path
                  className='cls-1'
                  fill={theme.palette.primary.main}
                  d='M541.86,109.56v-25.9h15.3l1.85-39.65h30.87v39.65h26.92v25.9h-26.92v56.31c0,20.62,5.28,26.96,23.22,26.7h3.69v26.7h-4.75c-45.39,0-54.89-9.78-54.89-56.57v-53.13h-15.3Z'
                />
                <path
                  className='cls-1'
                  fill={theme.palette.primary.main}
                  d='M680.06,163.75c0,21.41,10.03,32.78,29.29,32.78,12.93,0,20.85-3.97,27.97-14.01l24.01,14.01c-11.35,18.24-27.18,25.64-55.68,25.64-40.9,0-58.58-19.56-58.58-65.03v-9.52c0-47.32,16.89-66.88,58.05-66.88s58.05,19.56,58.05,66.88v11.9h-83.12v4.23ZM732.3,136.79v-2.91c0-18.5-9.24-28.55-26.39-28.55s-26.13,10.31-26.13,28.55v2.91h52.51Z'
                />
                <path
                  className='cls-1'
                  fill={theme.palette.primary.main}
                  d='M801.89,83.65h25.07l3.96,9.78c8.44-9.25,16.1-12.69,27.97-12.69,9.76,0,17.94,2.38,29.03,8.46l-14.25,26.96c-6.86-5.29-11.87-7.14-17.94-7.14-15.04,0-21.11,12.95-21.11,44.67v65.56h-32.72V83.65Z'
                />
                <path
                  className='cls-1'
                  fill={theme.palette.primary.main}
                  d='M941.36,182.25c7.92,11.1,14.51,14.01,30.61,14.01,18.21,0,26.92-5.55,26.92-17.18,0-5.82-2.64-10.05-7.39-11.9q-4.22-1.85-21.64-3.97c-33.51-4.23-45.39-14.54-45.39-39.39,0-27.76,17.42-43.09,48.82-43.09,25.33,0,41.96,7.93,53.04,25.91l-24.28,14.01c-7.13-10.57-13.72-14.01-26.39-14.01s-20.06,5.55-20.06,15.6,5.01,12.95,23.49,15.07c21.11,2.38,30.61,4.76,38.53,10.31,8.18,5.82,12.4,16.92,12.4,31.99,0,29.08-18.21,42.56-56.73,42.56-28.24,0-46.71-8.46-55.94-25.91l24.01-14.01Z'
                />
                <path
                  className='cls-1'
                  fill={theme.palette.primary.main}
                  d='M1064.87,141.28c0-42.56,17.42-60.54,58.58-60.54s58.32,17.98,58.32,60.54v20.35c0,42.56-17.42,60.53-58.32,60.53s-58.58-17.98-58.58-60.53v-20.35ZM1149.05,143.39c0-25.9-7.39-36.48-25.6-36.48s-25.86,10.57-25.86,36.48v15.86c0,25.91,7.39,36.48,25.86,36.48s25.6-10.57,25.6-36.48v-15.86Z'
                />
                <path
                  className='cls-1'
                  fill={theme.palette.primary.main}
                  d='M1221.59,83.65h24.54l2.9,11.9c8.71-10.57,18.74-14.8,36.15-14.8,23.22,0,38.53,8.99,44.86,26.17,2.9,7.66,3.96,17.98,3.96,34.63v77.72h-32.72v-74.02c0-26.17-6.33-36.48-22.69-36.48-17.68,0-24.28,10.84-24.28,40.45v70.05h-32.72V83.65Z'
                />
                <path
                  className='cls-1'
                  fill={theme.palette.primary.main}
                  d='M138.5,276.93C62.17,276.93.07,214.83.07,138.5S62.17.07,138.5.07s138.43,62.1,138.43,138.43-62.1,138.43-138.43,138.43ZM138.5,9.93C67.6,9.93,9.93,67.6,9.93,138.5s57.68,128.57,128.57,128.57,128.57-57.68,128.57-128.57S209.4,9.93,138.5,9.93Z'
                />
              </svg>
            </svg>
            <Box sx={{ my: 6 }}>
              <Typography sx={{ color: 'text.secondary' }}>
                Please sign-in to your account and start the adventure
              </Typography>
            </Box>
            <Alert icon={false} sx={{ py: 3, mb: 6, ...bgColors.primaryLight, '& .MuiAlert-message': { p: 0 } }}>
              <Typography variant='body2' sx={{ mb: 2, color: 'primary.main' }}>
                Admin: <strong>admin@watterson.com</strong> / Pass: <strong>admin</strong>
              </Typography>
              <Typography variant='body2' sx={{ color: 'primary.main' }}>
                Client: <strong>client@watterson.com</strong> / Pass: <strong>client</strong>
              </Typography>
            </Alert>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mb: 4 }}>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      autoFocus
                      label='Email'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder='admin@vuexy.com'
                      error={Boolean(errors.email)}
                      {...(errors.email && { helperText: errors.email.message })}
                    />
                  )}
                />
              </Box>
              <Box sx={{ mb: 1.5 }}>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      onBlur={onBlur}
                      label='Password'
                      onChange={onChange}
                      id='auth-login-v2-password'
                      error={Boolean(errors.password)}
                      {...(errors.password && { helperText: errors.password.message })}
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onMouseDown={e => e.preventDefault()}
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
              </Box>
              <Box
                sx={{
                  mb: 1.75,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <FormControlLabel
                  label='Remember Me'
                  control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
                />
                <Typography component={LinkStyled} href='/forgot-password'>
                  Forgot Password?
                </Typography>
              </Box>
              <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
                Login
              </Button>
              <Divider
                sx={{
                  color: 'text.disabled',
                  '& .MuiDivider-wrapper': { px: 6 },
                  fontSize: theme.typography.body2.fontSize,
                  my: theme => `${theme.spacing(6)} !important`
                }}
              >
                or
              </Divider>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton
                  href='/'
                  component={Link}
                  sx={{ color: '#497ce2' }}
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                >
                  <Icon icon='mdi:facebook' />
                </IconButton>
                <IconButton
                  href='/'
                  component={Link}
                  sx={{ color: '#1da1f2' }}
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                >
                  <Icon icon='mdi:twitter' />
                </IconButton>
                <IconButton
                  href='/'
                  component={Link}
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                  sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300') }}
                >
                  <Icon icon='mdi:github' />
                </IconButton>
                <IconButton
                  href='/'
                  component={Link}
                  sx={{ color: '#db4437' }}
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                >
                  <Icon icon='mdi:google' />
                </IconButton>
              </Box>
            </form>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true

export default LoginPage
