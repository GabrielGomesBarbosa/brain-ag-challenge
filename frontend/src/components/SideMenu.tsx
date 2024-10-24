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
  const [collapsed, setCollapsed] = useState(false)
  const [openSettings, setOpenSettings] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  // const handleToggleCollapse = () => {
  //   setCollapsed(!collapsed)
  // }

  const handleSettingsClick = () => {
    if (!collapsed) {
      setOpenSettings(!openSettings)
    }
  }

  const handleSettingsHover = (event: React.MouseEvent<HTMLElement>) => {
    if (collapsed) {
      setAnchorEl(event.currentTarget)
    }
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const isPopoverOpen = Boolean(anchorEl)

  return (
    <Box display="flex">
      <CustomDrawer variant="permanent" collapsed={collapsed}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: collapsed ? 'center' : 'flex-start',
            alignItems: 'center',
            p: collapsed ? '10px 0' : '10px 16px',
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

          {!collapsed && (
            <Typography variant="h5" fontWeight={600}>
              Farmer
            </Typography>
          )}
        </Box>

        <List>
          <Tooltip title={!collapsed ? '' : 'Home'} placement="right">
            <ListItem component={Link}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <Collapse in={!collapsed} timeout="auto" unmountOnExit>
                <ListItemText primary="Home" />
              </Collapse>
            </ListItem>
          </Tooltip>

          <Tooltip title={!collapsed ? '' : 'Settings'} placement="right">
            <ListItem
              onClick={handleSettingsClick}
              onMouseEnter={handleSettingsHover}
              onMouseLeave={handlePopoverClose}
            >
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <Collapse in={!collapsed} timeout="auto" unmountOnExit>
                <ListItemText primary="Settings" />
              </Collapse>
              {!collapsed && (openSettings ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>
          </Tooltip>

          <Collapse
            in={openSettings && !collapsed}
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

          <Tooltip title={!collapsed ? '' : 'About'} placement="right">
            <ListItem component={Link}>
              <ListItemIcon>
                <Info />
              </ListItemIcon>
              <Collapse in={!collapsed} timeout="auto" unmountOnExit>
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
