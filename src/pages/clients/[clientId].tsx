// pages/clients/[clientId].tsx
import { useDispatch } from 'react-redux'
import { fetchData } from 'src/store/apps/client'
import { AppDispatch } from 'src/store'
import ClientDetails from './ClientDetails'
import { GetStaticPaths, GetStaticProps } from 'next/types'

const ClientDetailsPage = () => {
  // Fetch data for the client details page
  const dispatch = useDispatch<AppDispatch>()
  dispatch(fetchData({ q: '', role: '', status: '', currentPlan: '', sentiment: '', industry: '' }))

  return <ClientDetails />
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch the list of client IDs from your data source
  const clientIds = /* Fetch client IDs from your data source */ [1, 2, 3]

  // Generate paths based on the client IDs
  const paths = clientIds.map(clientId => ({ params: { clientId: clientId.toString() } }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async () => {
  // Fetch any additional data needed for the client details page
  // Replace with actual data
  const additionalData = {}

  return {
    props: {
      additionalData
    }
  }
}

export default ClientDetailsPage
