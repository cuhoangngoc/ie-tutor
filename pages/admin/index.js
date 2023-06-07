import React, { useState, useEffect } from 'react'
import AdminLayout from '../../components/AdminLayout/AdminLayout'
import Statictical from '../../components/Admin/Statictical'
import ChartRevenue from '../../components/Admin/ChartRevenue'
import ChartPlan from '../../components/Admin/ChartPlan'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

const index = ({ user }) => {
  return (
    <AdminLayout>
      <Statictical></Statictical>
      <ChartRevenue></ChartRevenue>
      <ChartPlan></ChartPlan>
    </AdminLayout>
  )
}

export default withPageAuthRequired(index)