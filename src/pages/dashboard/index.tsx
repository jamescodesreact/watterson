// ** MUI Imports
import Grid from '@mui/material/Grid'
import TableLatestCoverage from '../../views/table/data-grid/TableLatestCoverage'
import TableNegativeSentimentCoverage from '../../views/table/data-grid/TableNegativeSentimentCoverage'

const Dashboard = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <h2>Welcome back, Leigh.</h2>
      </Grid>
      <Grid item xs={12}>
        <TableLatestCoverage />
      </Grid>
      <Grid item xs={12}>
        <TableNegativeSentimentCoverage />
      </Grid>
    </Grid>
  )
}

export default Dashboard
