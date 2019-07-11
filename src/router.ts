import { Routes } from 'nest-router'
import { AdminUserModule } from './admin/admin-user/admin-user.module'
import { UserModule } from './user/user.module'

export const routes: Routes = [
  {
    path: '/',
    children: [
      UserModule,
    ]
  },
  {
    path: '/admin',
    children: [
      AdminUserModule,
    ]
  },
]
