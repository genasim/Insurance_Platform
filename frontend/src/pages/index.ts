import React from 'react'
import Home from './Home'
import ClientDashboard from './client/Dashboard'
import Auth from './Auth'
import ExpertDashboard from './backoffice/Dashboard'
import ClaimSubmission from './client/ClaimSubmission'
import PoliciesPayment from './backoffice/PoliciesPayment'
import Claims from './backoffice/Claims'
import ClaimsPayment from './backoffice/ClaimsPayment'
import Policies from './backoffice/Policies'
import UserManager from './admin/UserManager'
import DocManager from './admin/DocManager'

interface Page {
  element: React.FC
  path: string
  title: string
}

export const unprotected = [
  { element: Home, path: '/', title: 'Home' },
  { element: Auth, path: '/auth', title: 'Auth' },
] as readonly Page[]

export const client = [
  { element: ClientDashboard, path: '/dashboard', title: 'Dashboard' },
  { element: PoliciesPayment, path: '/policies', title: 'Notifications' },
  { element: ClaimSubmission, path: '/claims', title: 'Claims' },
] as readonly Page[]

export const expert = [
  { element: ExpertDashboard, path: '/dashboard', title: 'Dashboard' },
  { element: Policies, path: '/policies', title: 'Policies' },
  { element: PoliciesPayment, path: '/policies/payments', title: 'Policy Payments' },
  { element: Claims, path: '/claims', title: 'Claims' },
  { element: ClaimsPayment, path: '/claims/payments', title: 'Claim Payments' },
] as readonly Page[]

export const admin = [
  { element: UserManager, path: '/user-management', title: 'Manage Users' },
  { element: DocManager, path: '/document-management', title: 'Manage Documents' },
  
] as readonly Page[]
