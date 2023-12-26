// ** Mock Adapter
import mock from 'src/@fake-db/mock'

// ** Types Imports
import { LatestCoverage } from 'src/@fake-db/types'

const data: LatestCoverage[] = [
  {
    id: 1,
    client: 'Decision Inc.',
    client_company: 'Smart Company',
    post_title: 'Is your generative AI approach stifling employee innovation?',
    post_author: 'Aiden Heke',
    post_date: '09/27/2018',
    sentiment: 1
  }
]

mock.onGet('/api/table/data').reply(config => {
  const { q = '', column = '', sort = '' } = config.params
  const queryLowered = q.toLowerCase()

  // @ts-ignore
  const dataAsc = data.sort((a, b) => (a[column] < b[column] ? -1 : 1))

  const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()

  const filteredData = dataToFilter.filter(
    (item: LatestCoverage) =>
      item.id.toString().toLowerCase().includes(queryLowered) ||
      item.client.toLowerCase().includes(queryLowered) ||
      item.client_company.toLowerCase().includes(queryLowered) ||
      item.post_title.toLowerCase().includes(queryLowered) ||
      item.post_author.toLowerCase().includes(queryLowered) ||
      item.post_date.toString().toLowerCase().includes(queryLowered) ||
      item.sentiment.toString().includes(queryLowered)
  )

  return [
    200,
    {
      allData: data,
      total: filteredData.length,
      data: filteredData
    }
  ]
})
