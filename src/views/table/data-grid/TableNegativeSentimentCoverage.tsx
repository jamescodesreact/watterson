// ** React Imports
import { ChangeEvent, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { NegativeSentimentCoverage } from 'src/@fake-db/types'

// ** Data Import
import { rows } from 'src/@fake-db/watterson/table/negative-sentiment'

interface StatusObj {
  [key: number]: {
    title: string
    color: ThemeColor
  }
}

const statusObj: StatusObj = {
  1: { title: 'Positive', color: 'success' },
  2: { title: 'Negative', color: 'error' },
  3: { title: 'Neutral', color: 'warning' }
}

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const columns: GridColDef[] = [
  {
    flex: 0.1,
    minWidth: 100,
    field: 'client',
    headerName: 'Client',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.client}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'client_company',
    headerName: 'Company',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.client}
      </Typography>
    )
  },
  {
    flex: 0.6,
    minWidth: 300,
    field: 'post_title',
    headerName: 'Title',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.post_title}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 80,
    field: 'post_author',
    headerName: 'Author',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.post_author}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'post_date',
    headerName: 'Post Date',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.post_date}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 140,
    field: 'sentiment',
    headerName: 'Sentiment',
    renderCell: (params: GridRenderCellParams) => {
      const status = statusObj[params.row.sentiment]

      return (
        <CustomChip
          rounded
          size='small'
          skin='light'
          color={status.color}
          label={status.title}
          sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
        />
      )
    }
  }
]

const TableNegativeSentimentCoverage = () => {
  // ** States
  const [data] = useState<NegativeSentimentCoverage[]>(rows)
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<NegativeSentimentCoverage[]>([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        // @ts-ignore
        return searchRegex.test(row[field].toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  return (
    <Card>
      <CardHeader title='Negative Sentiment Coverage' />
      <DataGrid
        autoHeight
        columns={columns}
        pageSizeOptions={[7, 10, 25, 50]}
        paginationModel={paginationModel}
        slots={{ toolbar: QuickSearchToolbar }}
        onPaginationModelChange={setPaginationModel}
        rows={filteredData.length ? filteredData : data}
        sx={{
          '& .MuiSvgIcon-root': {
            fontSize: '1.125rem'
          }
        }}
        slotProps={{
          baseButton: {
            size: 'medium',
            variant: 'outlined'
          },
          toolbar: {
            value: searchText,
            clearSearch: () => handleSearch(''),
            onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
          }
        }}
      />
    </Card>
  )
}

export default TableNegativeSentimentCoverage
