// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomTextField from 'src/@core/components/mui/text-field'
import UserSuspendDialog from 'src/views/apps/user/view/UserSuspendDialog'
import UserSubscriptionDialog from 'src/views/apps/user/view/UserSubscriptionDialog'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { ClientsType } from 'src/types/apps/clientTypes'

interface ColorsType {
  [key: string]: ThemeColor
}

const data: ClientsType = {
  id: 1,
  clientTitle: 'Decision Inc.',
  clientOwner: 'Cameron Wells',
  clientIndustries: ['technology', 'generative ai'],
  clientOverallSentiment: 'positive',
  role: 'admin',
  status: 'active',
  username: 'gslixby0',
  avatarColor: 'primary',
  country: 'El Salvador',
  company: 'Yotz PVT LTD',
  billing: 'Manual - Cash',
  contact: '(479) 232-9151',
  currentPlan: 'enterprise',
  fullName: 'Decision Inc.',
  email: 'gslixby0@abc.net.au',
  avatar: '/images/avatars/14.png'
}

const roleColors: ColorsType = {
  admin: 'error',
  editor: 'info',
  author: 'warning',
  maintainer: 'success',
  subscriber: 'primary'
}

const statusColors: ColorsType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

const UserViewLeft = () => {
  // ** States
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState<boolean>(false)

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 13.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <Typography variant='h4' sx={{ mb: 3 }}>
                {data.fullName}
              </Typography>
              <CustomChip
                rounded
                skin='light'
                size='small'
                label={data.role}
                color={roleColors[data.role]}
                sx={{ textTransform: 'capitalize' }}
              />
            </CardContent>

            <Divider sx={{ my: '0 !important', mx: 6 }} />

            <CardContent sx={{ pb: 4 }}>
              <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                Companies
              </Typography>
              <Box sx={{ pt: 4 }}>
                <Box sx={{ display: 'flex' }}>
                  <CustomChip
                    rounded
                    skin='light'
                    size='small'
                    label='company'
                    sx={{ textTransform: 'capitalize', mr: 1 }}
                  />
                </Box>
              </Box>
            </CardContent>

            <CardContent sx={{ pb: 4 }}>
              <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                Regions
              </Typography>
              <Box sx={{ pt: 4 }}>
                <Box sx={{ display: 'flex' }}>
                  <CustomChip
                    rounded
                    skin='light'
                    size='small'
                    label='Australia'
                    sx={{ textTransform: 'capitalize', mr: 1 }}
                  />
                  <CustomChip
                    rounded
                    skin='light'
                    size='small'
                    label='New Zealand'
                    sx={{ textTransform: 'capitalize', mr: 1 }}
                  />
                </Box>
              </Box>
            </CardContent>

            <CardContent sx={{ pb: 4 }}>
              <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                Products
              </Typography>
              <Box sx={{ pt: 4 }}>
                <Box sx={{ display: 'flex' }}>
                  <CustomChip
                    rounded
                    skin='light'
                    size='small'
                    label='product'
                    sx={{ textTransform: 'capitalize', mr: 1 }}
                  />
                </Box>
              </Box>
            </CardContent>

            <CardContent sx={{ pb: 4 }}>
              <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                Spokepersons
              </Typography>
              <Box sx={{ pt: 4 }}>
                <Box sx={{ display: 'flex' }}>
                  <CustomChip
                    rounded
                    skin='light'
                    size='small'
                    label='person one'
                    sx={{ textTransform: 'capitalize', mr: 1 }}
                  />
                </Box>
              </Box>
            </CardContent>

            <CardContent sx={{ pb: 4 }}>
              <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                Competitors
              </Typography>
              <Box sx={{ pt: 4 }}>
                <Box sx={{ display: 'flex' }}>
                  <CustomChip
                    rounded
                    skin='light'
                    size='small'
                    label='competitor one'
                    sx={{ textTransform: 'capitalize', mr: 1 }}
                  />
                </Box>
              </Box>
            </CardContent>

            <CardContent sx={{ pb: 4 }}>
              <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                Competitors
              </Typography>
              <Box sx={{ pt: 4 }}>
                <Box sx={{ display: 'flex' }}>
                  <CustomChip
                    rounded
                    skin='light'
                    size='small'
                    label='competitor one'
                    sx={{ textTransform: 'capitalize', mr: 1 }}
                  />
                </Box>
              </Box>
            </CardContent>

            <CardContent sx={{ pb: 4 }}>
              <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                Industries
              </Typography>
              <Box sx={{ pt: 4 }}>
                <Box sx={{ display: 'flex' }}>
                  <CustomChip
                    rounded
                    skin='light'
                    size='small'
                    label='competitor one'
                    sx={{ textTransform: 'capitalize', mr: 1 }}
                  />
                </Box>
              </Box>
            </CardContent>

            <CardContent sx={{ pb: 4 }}>
              <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                Exclusions
              </Typography>
              <Box sx={{ pt: 4 }}>
                <Box sx={{ display: 'flex' }}>
                  <CustomChip
                    rounded
                    skin='light'
                    size='small'
                    label='.co.za'
                    sx={{ textTransform: 'lowercase', mr: 1 }}
                  />
                </Box>
              </Box>
            </CardContent>

            <Divider sx={{ my: '0 !important', mx: 6 }} />

            <CardContent sx={{ pb: 4 }}>
              <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                Details
              </Typography>
              <Box sx={{ pt: 4 }}>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Username:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>@{data.username}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Email:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{data.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Country:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{data.country}</Typography>
                </Box>
              </Box>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClickOpen}>
                Edit
              </Button>
              <Button color='error' variant='tonal' onClick={() => setSuspendDialogOpen(true)}>
                Suspend
              </Button>
            </CardActions>

            <Dialog
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby='user-view-edit'
              aria-describedby='user-view-edit-description'
              sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
            >
              <DialogTitle
                id='user-view-edit'
                sx={{
                  textAlign: 'center',
                  fontSize: '1.5rem !important',
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                Edit User Information
              </DialogTitle>
              <DialogContent
                sx={{
                  pb: theme => `${theme.spacing(8)} !important`,
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
                }}
              >
                <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
                  Updating user details will receive a privacy audit.
                </DialogContentText>
                <form>
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        fullWidth
                        label='Full Name'
                        placeholder='John Doe'
                        defaultValue={data.fullName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        fullWidth
                        label='Username'
                        placeholder='John.Doe'
                        defaultValue={data.username}
                        InputProps={{ startAdornment: <InputAdornment position='start'>@</InputAdornment> }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        fullWidth
                        type='email'
                        label='Billing Email'
                        defaultValue={data.email}
                        placeholder='john.doe@gmail.com'
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField select fullWidth label='Status' defaultValue={data.status}>
                        <MenuItem value='pending'>Pending</MenuItem>
                        <MenuItem value='active'>Active</MenuItem>
                        <MenuItem value='inactive'>Inactive</MenuItem>
                      </CustomTextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField fullWidth label='TAX ID' defaultValue='Tax-8894' placeholder='Tax-8894' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        fullWidth
                        label='Contact'
                        placeholder='723-348-2344'
                        defaultValue={`+1 ${data.contact}`}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField select fullWidth label='Language' defaultValue='English'>
                        <MenuItem value='English'>English</MenuItem>
                        <MenuItem value='Spanish'>Spanish</MenuItem>
                        <MenuItem value='Portuguese'>Portuguese</MenuItem>
                        <MenuItem value='Russian'>Russian</MenuItem>
                        <MenuItem value='French'>French</MenuItem>
                        <MenuItem value='German'>German</MenuItem>
                      </CustomTextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField select fullWidth label='Country' defaultValue='USA'>
                        <MenuItem value='USA'>USA</MenuItem>
                        <MenuItem value='UK'>UK</MenuItem>
                        <MenuItem value='Spain'>Spain</MenuItem>
                        <MenuItem value='Russia'>Russia</MenuItem>
                        <MenuItem value='France'>France</MenuItem>
                        <MenuItem value='Germany'>Germany</MenuItem>
                      </CustomTextField>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        label='Use as a billing address?'
                        control={<Switch defaultChecked />}
                        sx={{ '& .MuiTypography-root': { fontWeight: 500 } }}
                      />
                    </Grid>
                  </Grid>
                </form>
              </DialogContent>
              <DialogActions
                sx={{
                  justifyContent: 'center',
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClose}>
                  Submit
                </Button>
                <Button variant='tonal' color='secondary' onClick={handleEditClose}>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>

            <UserSuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} />
            <UserSubscriptionDialog open={subscriptionDialogOpen} setOpen={setSubscriptionDialogOpen} />
          </Card>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default UserViewLeft
