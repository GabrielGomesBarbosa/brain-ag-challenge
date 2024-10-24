import React, { useState } from 'react'
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Link,
  Box,
  Collapse,
  Typography,
  Popover
} from '@mui/material'
import {
  Home,
  Settings,
  Info,
  ExpandLess,
  ExpandMore
} from '@mui/icons-material'
import { styled } from '@mui/system'
import { useSelector } from 'react-redux'

import Logo from '../assets/logo.png'

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

  const [openSettings, setOpenSettings] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleSettingsClick = () => {
    if (!isSideBarCollapsed) {
      setOpenSettings(!openSettings)
    }
  }

  const handleSettingsHover = (event: React.MouseEvent<HTMLElement>) => {
    if (isSideBarCollapsed) {
      setAnchorEl(event.currentTarget)
    }
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const isPopoverOpen = Boolean(anchorEl)

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

        <List>
          <Tooltip title={!isSideBarCollapsed ? '' : 'Home'} placement="right">
            <ListItem component={Link}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <Collapse in={!isSideBarCollapsed} timeout="auto" unmountOnExit>
                <ListItemText primary="Home" />
              </Collapse>
            </ListItem>
          </Tooltip>

          <Tooltip
            title={!isSideBarCollapsed ? '' : 'Settings'}
            placement="right"
          >
            <ListItem
              onClick={handleSettingsClick}
              onMouseEnter={handleSettingsHover}
              onMouseLeave={handlePopoverClose}
            >
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <Collapse in={!isSideBarCollapsed} timeout="auto" unmountOnExit>
                <ListItemText primary="Settings" />
              </Collapse>
              {!isSideBarCollapsed &&
                (openSettings ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>
          </Tooltip>

          <Collapse
            in={openSettings && !isSideBarCollapsed}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              <ListItem sx={{ pl: 4 }} component={Link}>
                <ListItemIcon>
                  <Info />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem sx={{ pl: 4 }} component={Link}>
                <ListItemIcon>
                  <Info />
                </ListItemIcon>
                <ListItemText primary="Account" />
              </ListItem>
            </List>
          </Collapse>

          <Popover
            open={isPopoverOpen}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            disableRestoreFocus
          >
            <List component="div" disablePadding>
              <ListItem sx={{ pl: 2 }} component={Link}>
                <ListItemIcon>
                  <Info />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem sx={{ pl: 2 }} component={Link}>
                <ListItemIcon>
                  <Info />
                </ListItemIcon>
                <ListItemText primary="Account" />
              </ListItem>
            </List>
          </Popover>

          <Tooltip title={!isSideBarCollapsed ? '' : 'About'} placement="right">
            <ListItem component={Link}>
              <ListItemIcon>
                <Info />
              </ListItemIcon>
              <Collapse in={!isSideBarCollapsed} timeout="auto" unmountOnExit>
                <ListItemText primary="About" />
              </Collapse>
            </ListItem>
          </Tooltip>
        </List>
      </CustomDrawer>
    </Box>
  )
}

export default Sidebar
