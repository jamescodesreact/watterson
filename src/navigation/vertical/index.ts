// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      sectionTitle: 'Start here'
    },
    {
      title: 'Home',
      path: '/home',
      icon: 'tabler:smart-home'
    },
    {
      sectionTitle: 'Clients & Reports'
    },
    {
      title: 'Clients',
      path: '/clients/list/',
      icon: 'tabler:mail'
    },
    {
      title: 'Users App',
      path: '/apps/user/list/',
      icon: 'tabler:mail'
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      title: 'Access Control',
      icon: 'tabler:shield'
    }
  ]
}

export default navigation