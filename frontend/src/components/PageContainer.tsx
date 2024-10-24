import { Box } from '@mui/material'
import { styled } from '@mui/system'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Header from './Header'
import Sidebar from './SideMenu/SideMenu'

export default function PageContainer() {
  const { isSideBarCollapsed } = useSelector(state => state?.layout)

  return (
    <>
      <Sidebar />
      <Content collapsed={isSideBarCollapsed}>
        <Header />
        <Box padding={2}>
          <Outlet />
        </Box>
      </Content>
    </>
  )
}

const Content = styled(Box)<{ collapsed: boolean }>(({ collapsed }) => ({
  flexGrow: 1,
  marginLeft: collapsed ? 80 : 240,
  transition: 'margin-left 0.3s ease-in-out',
  background: 'red'
}))
