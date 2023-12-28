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
import TableLatestCoverage from '../../views/table/data-grid/TableLatestCoverage'
import CustomChip from '../../@core/components/mui/chip'

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
  const clients: ClientsType[] = useSelector((state: RootState) => state.client.data)

  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  // Find the client with the matching ID
  const selectedClient = clients.find(client => client.id === Number(clientId))

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
        <Typography variant='h2'>{selectedClient?.clientTitle}</Typography>
        <Typography variant='body1'>Owner: {selectedClient?.clientOwner?.name}</Typography>
      </Grid>
      <Grid item xs={6} textAlign={'right'}>
        <Button variant='contained' sx={{ mr: 2 }}>
          Add Cover
        </Button>
        <Button variant='contained' sx={{ mr: 2 }}>
          Add Client
        </Button>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ pb: 4 }}>
                <Grid item xs={12} direction={'column'}>
                  <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                    Keywords
                  </Typography>
                </Grid>
                <Box sx={{ pt: 4 }}>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>total keywords: 50</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Button variant='contained' sx={{ mr: 2 }}>
                      Edit
                    </Button>
                  </Box>
                </Box>
              </CardContent>
              <Divider sx={{ my: '0 !important', mx: 6 }} />

              <CardContent sx={{ pb: 4 }}>
                {/* Map through clientKeywords and render chips for each keyword group */}
                {selectedClient?.clientKeywords.map((keywordGroup, index) => (
                  <div key={index}>
                    <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                      {keywordGroup.title}
                    </Typography>
                    <Box sx={{ pt: 4 }}>
                      <Box sx={{ display: 'flex', mb: 4 }}>
                        {/* Map through keywords in the current keyword group and render a CustomChip for each one */}
                        {keywordGroup.keywords.map(keyword => (
                          <CustomChip
                            key={keyword.id}
                            rounded
                            skin='light'
                            size='small'
                            label={keyword.name}
                            sx={{ textTransform: 'capitalize', mr: 1 }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </div>
                ))}
              </CardContent>

              <Divider sx={{ my: '0 !important', mx: 6 }} />
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
                  <TableLatestCoverage />
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
