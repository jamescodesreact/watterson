import React from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { ClientsType } from 'src/types/apps/clientTypes'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const ClientDetails = () => {
  const router = useRouter()
  const { clientId } = router.query
  const clients = useSelector((state: RootState) => state.client.data)

  // Find the client with the matching ID
  const selectedClient: ClientsType | undefined = clients.find(client => client.id === Number(clientId))

  if (!selectedClient) {
    return <div>Loading...</div>
  }

  return (
    <Grid container spacing={6}>
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
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <p>hi</p>
      </Grid>
    </Grid>
  )
}

export default ClientDetails
