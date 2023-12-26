// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      sectionTitle: 'Start here'
    },
    {
      title: 'Dashboard',
      path: '/dashboard',
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
      title: 'Cover',
      path: '/cover/list/',
      icon: 'tabler:mail'
    },
    {
      title: 'Users App',
      path: '/apps/user/list/',
      icon: 'tabler:mail'
    },
    {
      sectionTitle: 'Reports'
    },
    {
      title: 'Reports',
      path: '/reports',
      icon: 'tabler:mail'
    },
    {
      sectionTitle: 'Settings & More'
    },
    {
      title: 'Settings',
      path: '/settings',
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
