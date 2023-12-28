// ** Mock
import mock from 'src/@fake-db/mock'

// ** Types
import { ClientsType, CoverType, ProjectListDataType } from 'src/types/apps/clientTypes'

const data: { clients: ClientsType[]; covers: CoverType[] } = {
  clients: [
    {
      id: 1,
      clientTitle: 'Decision Inc.',
      clientOwner: { id: 1, name: 'Cameron Wells' },
      clientIndustries: [
        { id: 1, title: 'technology' },
        { id: 2, title: 'generative ai' }
      ],
      clientOverallSentiment: 'positive',
      clientKeywords: [
        {
          id: 1,
          title: 'companies',
          keywords: [
            { id: 1, name: 'barclays' },
            { id: 2, name: 'ascension ai' }
          ]
        },
        {
          id: 2,
          title: 'regions',
          keywords: [
            { id: 1, name: 'art' },
            { id: 2, name: 'communication' }
          ]
        }
      ],
      billing: 'Auto Debit',
      fullName: 'Galen Slixby',
      company: 'Yotz PVT LTD',
      role: 'maintainer',
      username: 'gslixby0',
      country: 'El Salvador',
      contact: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      currentPlan: 'enterprise',
      status: 'inactive',
      avatar: '',
      avatarColor: 'primary'
    },
    {
      id: 2,
      clientTitle: 'Ogilvy & Mather',
      clientOwner: { id: 2, name: 'Pete Case' },
      clientIndustries: [{ id: 3, title: 'research' }],
      clientOverallSentiment: 'negative',
      clientKeywords: [
        {
          id: 3,
          title: 'marketing',
          keywords: [
            { id: 3, name: 'digital' },
            { id: 4, name: 'advertising' }
          ]
        },
        {
          id: 3,
          title: 'IT',
          keywords: [
            { id: 3, name: 'development' },
            { id: 4, name: 'application' }
          ]
        }
      ],
      billing: 'Auto Debit',
      fullName: 'Galen Slixby',
      company: 'Yotz PVT LTD',
      role: 'editor',
      username: 'gslixby0',
      country: 'El Salvador',
      contact: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      currentPlan: 'enterprise',
      status: 'inactive',
      avatar: '',
      avatarColor: 'primary'
    }
  ],
  covers: [
    {
      id: 1,
      title: 'Cover Title 1',
      clientId: 1,
      publication: { id: 1, title: 'Publication 1' }, // Object array with id and title
      author: { id: 1, title: 'Author 1' }, // Object array with id and title
      link: 'Link 1',
      type: 'Type 1',
      sentimentRating: 'Positive',
      sentimentSummary: 'Positive summary',
      articleSummary: 'Article summary 1',
      relevance: true
    },
    {
      id: 2,
      title: 'Cover Title 2',
      clientId: 2,
      publication: { id: 2, title: 'Publication 2' }, // Object array with id and title
      author: { id: 2, title: 'Author 2' }, // Object array with id and title
      link: 'Link 2',
      type: 'Type 2',
      sentimentRating: 'Negative',
      sentimentSummary: 'Negative summary',
      articleSummary: 'Article summary 2',
      relevance: false
    }
  ]
}

const projectListData: ProjectListDataType[] = [
  {
    id: 1,
    hours: '18:42',
    progressValue: 78,
    totalTask: '122/240',
    progressColor: 'success',
    projectType: 'React Project',
    projectTitle: 'BGC eCommerce App',
    img: '/images/icons/project-icons/react.png'
  },
  {
    id: 2,
    hours: '20:42',
    progressValue: 18,
    totalTask: '9/56',
    progressColor: 'error',
    projectType: 'Figma Project',
    projectTitle: 'Falcon Logo Design',
    img: '/images/icons/project-icons/figma.png'
  },
  {
    id: 3,
    hours: '120:87',
    progressValue: 62,
    totalTask: '290/320',
    progressColor: 'primary',
    projectType: 'VueJs Project',
    projectTitle: 'Dashboard Design',
    img: '/images/icons/project-icons/vue.png'
  }
]

// POST: Add new user
mock.onPost('/apps/users/add-user').reply(config => {
  // Get event from post data
  const user = JSON.parse(config.data).data

  const lastId = Math.max(...data.clients.map(u => u.id), 0)

  user.id = lastId + 1

  data.clients.unshift({ ...user, avatar: '', avatarColor: 'primary', status: 'active' })

  return [201, { user }]
})

// GET: DATA
mock.onGet('/apps/users/list').reply(config => {
  const {
    q = '',
    role = null,
    status = null,
    currentPlan = null,
    sentiment = null,
    industry = null
  } = config.params ?? ''

  const queryLowered = q.toLowerCase()

  const filteredData = data.clients.filter(
    client =>
      (client.username.toLowerCase().includes(queryLowered) ||
        client.fullName.toLowerCase().includes(queryLowered) ||
        client.role.toLowerCase().includes(queryLowered) ||
        (client.email.toLowerCase().includes(queryLowered) &&
          client.currentPlan.toLowerCase().includes(queryLowered) &&
          client.status.toLowerCase().includes(queryLowered))) &&
      client.role === (role || client.role) &&
      client.currentPlan === (currentPlan || client.currentPlan) &&
      client.status === (status || client.status) &&
      client.clientOverallSentiment === (sentiment || client.clientOverallSentiment) &&
      (industry ? client.clientIndustries.includes(industry) : true)
  )

  return [
    200,
    {
      allData: data.clients,
      users: filteredData,
      params: config.params,
      total: filteredData.length
    }
  ]
})

// DELETE: Deletes User
mock.onDelete('/apps/users/delete').reply(config => {
  // Get user id from URL
  const userId = config.data

  const userIndex = data.clients.findIndex(t => t.id === userId)
  data.clients.splice(userIndex, 1)

  return [200]
})

// GET: DATA
mock.onGet('/apps/users/project-list').reply(config => {
  const { q = '' } = config.params ?? ''

  const queryLowered = q.toLowerCase()

  const filteredData = projectListData.filter(
    user =>
      user.projectTitle.toLowerCase().includes(queryLowered) ||
      user.projectType.toLowerCase().includes(queryLowered) ||
      user.totalTask.toLowerCase().includes(queryLowered) ||
      user.hours.toLowerCase().includes(queryLowered) ||
      String(user.progressValue).toLowerCase().includes(queryLowered)
  )

  return [200, filteredData]
})
