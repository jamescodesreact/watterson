import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { ClientsType } from 'src/types/apps/clientTypes'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Icon from '../../@core/components/icon'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'

interface Props {
  tab: string
}

// ** Styled Tab component
const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1.5)
  }
}))

const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
  borderBottom: '0 !important',
  '&, & .MuiTabs-scroller': {
    boxSizing: 'content-box',
    padding: theme.spacing(1.25, 1.25, 2),
    margin: `${theme.spacing(-1.25, -1.25, -2)} !important`
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      color: theme.palette.primary.main
    }
  }
}))

const ClientDetails = ({ tab }: Props) => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<string>('latest-coverage') // Set the initial activeTab to 'latest-coverage'
  const [isLoading, setIsLoading] = useState<boolean>(false) // Set isLoading to false initially
  const { clientId } = router.query
  const clients = useSelector((state: RootState) => state.client.data)

  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  // Find the client with the matching ID
  const selectedClient: ClientsType | undefined = clients.find(client => client.id === Number(clientId))

  if (!selectedClient) {
    return <div>Loading...</div>
  }

  const handleChange = (event: SyntheticEvent, value: string) => {
    setIsLoading(false)
    setActiveTab(value)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <h2>Welcome back, Leigh.</h2>
      </Grid>
      <Grid item xs={6} textAlign={'right'}>
        <h2>Welcome back, Leigh.</h2>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ pt: 13.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Typography variant='h4' sx={{ mb: 3 }}>
                  {selectedClient.clientTitle}
                </Typography>
                <Typography variant='h4' sx={{ mb: 3 }}>
                  {selectedClient.clientOwner.name}
                </Typography>
                {/* Add other client details here */}
              </CardContent>

              <Divider sx={{ my: '0 !important', mx: 6 }} />
              <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant='contained' sx={{ mr: 2 }}>
                  Edit
                </Button>
                <Button color='error' variant='tonal'>
                  Suspend
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <TabContext value={activeTab}>
          {/* Tab Heading buttons here */}
          <TabList
            variant='scrollable'
            scrollButtons='auto'
            onChange={handleChange}
            aria-label='forced scroll tabs example'
            sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
          >
            <Tab
              value='latest-coverage'
              label='Latest Coverage'
              icon={<Icon fontSize='1.125rem' icon='tabler:user-check' />}
            />
            <Tab value='blank-tab' label='Blank Tab' icon={<Icon fontSize='1.125rem' icon='tabler:user-check' />} />
          </TabList>
          <Box sx={{ mt: 4 }}>
            {isLoading ? (
              <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <CircularProgress sx={{ mb: 4 }} />
                <Typography>Loading...</Typography>
              </Box>
            ) : (
              <>
                <TabPanel sx={{ p: 0 }} value='latest-coverage'>
                  <p>tab 1</p>
                </TabPanel>
                <TabPanel sx={{ p: 0 }} value='blank-tab'>
                  <p>tab 2</p>
                </TabPanel>
              </>
            )}
          </Box>
        </TabContext>
      </Grid>
    </Grid>
  )
}

export default ClientDetails
