// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type ClientsType = {
  id: number
  clientTitle: string
  clientOwner: string
  clientIndustries: string[]
  clientOverallSentiment: 'positive' | 'negative'
  role: string
  email: string
  status: string
  avatar: string
  billing: string
  company: string
  country: string
  contact: string
  fullName: string
  username: string
  currentPlan: string
  avatarColor?: ThemeColor
}

export type ProjectListDataType = {
  id: number
  img: string
  hours: string
  totalTask: string
  projectType: string
  projectTitle: string
  progressValue: number
  progressColor: ThemeColor
}
