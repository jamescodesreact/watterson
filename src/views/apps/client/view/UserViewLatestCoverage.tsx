// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

const UserViewLatestCoverage = () => {
  return (
    <Card>
      <CardHeader title='Latest Coverage' sx={{ pb: 1.5 }} />

      <CardContent>
        <Typography sx={{ mb: 6, color: 'text.secondary' }}>This is the latest coverage tab.</Typography>
      </CardContent>

      <CardActions>
        <Button variant='contained' sx={{ mr: 2 }}>
          Save Changes
        </Button>
        <Button color='secondary' variant='tonal'>
          Discard
        </Button>
      </CardActions>
    </Card>
  )
}

export default UserViewLatestCoverage
