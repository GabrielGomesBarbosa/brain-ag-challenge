import * as Menu from './MenuItem'
import { styled } from '@mui/system'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Box, List, Drawer, Typography } from '@mui/material'

import Logo from '../../assets/logo.png'

import MENU_ITEMS from '../../constants/menuItems'

const drawerWidth = 240
const collapsedWidth = 80

const CustomDrawer = styled(Drawer, {
  shouldForwardProp: prop => prop !== 'collapsed'
})<{ collapsed: boolean }>(({ collapsed }) => ({
  width: collapsed ? collapsedWidth : drawerWidth,
  transition: 'width 0.3s ease-in-out',
  '& .MuiDrawer-paper': {
    width: collapsed ? collapsedWidth : drawerWidth,
    overflowX: 'hidden',
    transition: 'width 0.3s ease-in-out'
  }
}))

const Sidebar: React.FC = () => {
  const { isSideBarCollapsed } = useSelector(state => state?.layout)

  const menuItems = useMemo(() => {
    return (
      <List>
        {MENU_ITEMS.map(menu => {
          return (
            <Menu.MenuParent
              key={menu.key}
              name={menu.name}
              to={menu.path}
              hasChildren={!!menu.children}
            >
              {menu.children?.map(child => (
                <Menu.MenuChild
                  key={child.key}
                  name={child.name}
                  to={child.path}
                />
              ))}
            </Menu.MenuParent>
          )
        })}
      </List>
    )
  }, [])

  return (
    <Box display="flex">
      <CustomDrawer variant="permanent" collapsed={isSideBarCollapsed}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: isSideBarCollapsed ? 'center' : 'flex-start',
            alignItems: 'center',
            p: isSideBarCollapsed ? '10px 0' : '10px 16px',
            bgcolor: 'primary.main',
            color: 'white',
            height: '64px',
            gap: '20px'
          }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{
              width: 40,
              height: 40
            }}
          />

          {!isSideBarCollapsed && (
            <Typography variant="h5" fontWeight={600}>
              Farmer
            </Typography>
          )}
        </Box>

        {menuItems}
      </CustomDrawer>
    </Box>
  )
}

export default Sidebar
