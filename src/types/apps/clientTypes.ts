// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type OverallSentiment = 'positive' | 'negative' | 'neutral'

export type ClientsType = {
  id: number
  clientTitle: string
  clientOwner: ClientOwnerType
  clientIndustries: ClientIndustryType[]
  clientOverallSentiment: OverallSentiment
  clientKeywords: ClientKeywordType[]
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

export type CoverType = {
  id: number
  title: string
  clientId: number // Link to the id of the user
  publication: { id: number; title: string } // Object array with id and title
  author: { id: number; title: string } // Object array with id and title
  link: string
  type: string
  sentimentRating: string
  sentimentSummary: string
  articleSummary: string
  relevance: boolean
}

export type Data = {
  users: ClientsType[]
  covers: CoverType[]
}

export type ClientIndustryType = {
  id: number
  title: string
}

export type ClientOwnerType = {
  id: number
  name: string
}

export type ClientKeywordType = {
  id: number
  title: string
  keywords: KeywordType[]
}

export type KeywordType = {
  id: number
  name: string
}

// Ignore from here lol
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

export type InvoiceStatus = 'Paid' | string

export type InvoiceLayoutProps = {
  id: string | undefined
}

export type InvoiceClientType = {
  name: string
  address: string
  company: string
  country: string
  contact: string
  companyEmail: string
}

export type InvoiceType = {
  id: number
  name: string
  total: number
  avatar: string
  service: string
  dueDate: string
  address: string
  company: string
  country: string
  contact: string
  avatarColor?: string
  issuedDate: string
  companyEmail: string
  balance: string | number
  invoiceStatus: InvoiceStatus
}

export type InvoicePaymentType = {
  iban: string
  totalDue: string
  bankName: string
  country: string
  swiftCode: string
}

export type SingleInvoiceType = {
  invoice: InvoiceType
  paymentDetails: InvoicePaymentType
}
