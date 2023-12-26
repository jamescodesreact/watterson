// ** React Imports
import { useState, useEffect, MouseEvent, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'
import { GetStaticProps } from 'next/types'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData, deleteUser } from 'src/store/apps/client'

// ** Third Party Components
import axios from 'axios'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { CardStatsType } from 'src/@fake-db/types'
import { ThemeColor } from 'src/@core/layouts/types'
import { ClientsType, OverallSentiment } from 'src/types/apps/clientTypes'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/client/list/TableHeader'
import AddUserDrawer from 'src/views/apps/client/list/AddUserDrawer'

interface UserStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: ClientsType
}

// ** renders client column
const clientOverallSentimentObj: UserStatusType = {
  positive: 'success',
  negative: 'warning'
}

// ** renders client column
const renderClient = (row: ClientsType) => {
  if (row.avatar.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor}
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
      >
        {getInitials(row.clientTitle ? row.clientTitle : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const RowOptions = ({ id }: { id: number | string }) => {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    dispatch(deleteUser(id))
    handleRowOptionsClose()
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='tabler:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          href='/clients/view/latest-coverage'
          onClick={handleRowOptionsClose}
        >
          <Icon icon='tabler:eye' fontSize={20} />
          View
        </MenuItem>
        <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:edit' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:trash' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

const columns: GridColDef[] = [
  {
    flex: 0.2,
    minWidth: 200,
    field: 'clientDetails',
    headerName: 'Client | Owner',
    renderCell: ({ row }: CellType) => {
      const { clientTitle, clientOwner } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography
              noWrap
              component={Link}
              href='/clients/view/latest-coverage'
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {clientTitle}
            </Typography>
            <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
              Owner: {clientOwner}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'clientIndustries',
    headerName: 'Industries',
    renderCell: ({ row }: CellType) => {
      return (
        <Box>
          {row.clientIndustries.map((industry, index) => (
            <CustomChip
              key={index}
              rounded
              skin='light'
              size='small'
              label={industry}
              sx={{ textTransform: 'capitalize', mr: 1 }}
            />
          ))}
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 160,
    field: 'clientOverallSentiment',
    headerName: 'Overall Sentiment',
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          rounded
          skin='light'
          size='small'
          label={row.clientOverallSentiment}
          color={clientOverallSentimentObj[row.clientOverallSentiment]}
          sx={{ textTransform: 'capitalize' }}
        />
      )
    }
  },
  {
    flex: 0.07,
    minWidth: 70,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    align: 'right',
    renderCell: ({ row }: CellType) => <RowOptions id={row.id} />
  }
]

const UserList = () => {
  // ** State
  const [role, setRole] = useState<string>('')
  const [plan, setPlan] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [sentiment, setSentiment] = useState<string>('')
  const [industry, setIndustry] = useState<string>('')
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.client)

  useEffect(() => {
    dispatch(
      fetchData({
        role,
        status,
        q: value,
        currentPlan: plan,
        sentiment,
        industry
      })
    )
  }, [dispatch, plan, role, status, value, sentiment, industry])

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleRoleChange = useCallback((e: SelectChangeEvent<unknown>) => {
    setRole(e.target.value as string)
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePlanChange = useCallback((e: SelectChangeEvent<unknown>) => {
    setPlan(e.target.value as string)
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleStatusChange = useCallback((e: SelectChangeEvent<unknown>) => {
    setStatus(e.target.value as string)
  }, [])

  const handleSentimentChange = useCallback((e: SelectChangeEvent<unknown>) => {
    setSentiment(e.target.value as OverallSentiment)
  }, [])

  const handleIndustryChange = useCallback((e: SelectChangeEvent<unknown>) => {
    setIndustry(e.target.value as string)
  }, [])

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Clients' />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue='Filter by Industry'
                  SelectProps={{
                    value: industry,
                    displayEmpty: true,
                    onChange: e => handleIndustryChange(e)
                  }}
                >
                  <MenuItem value=''>Select Industry</MenuItem>
                  <MenuItem value='technology'>Technology</MenuItem>
                  <MenuItem value='generative ai'>Generative AI</MenuItem>
                  <MenuItem value='research'>Research</MenuItem>
                  <MenuItem value='other'>Other</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item sm={4} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue='Filter by Sentiment'
                  SelectProps={{
                    value: sentiment,
                    displayEmpty: true,
                    onChange: e => handleSentimentChange(e)
                  }}
                >
                  <MenuItem value=''>Select Sentiment</MenuItem>
                  <MenuItem value='positive'>Positive</MenuItem>
                  <MenuItem value='negative'>Negative</MenuItem>
                </CustomTextField>
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={store.data}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>

      <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
    </Grid>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get('/cards/statistics')
  const apiData: CardStatsType = res.data

  return {
    props: {
      apiData
    }
  }
}

export default UserList
