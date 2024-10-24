import { PropsWithChildren, useState, useContext, createContext } from 'react'
import { ExpandLess, ExpandMore, Home } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import {
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  List
} from '@mui/material'

import { Link } from 'react-router-dom'

type MenuItemParentProps = {
  name: string
  to: string
  hasChildren: boolean
}

type MenuItemChildProps = {
  name: string
  to: string
}

type MenuItemProps = {
  name: string
  to: string
  onItemPress?: () => void
  isChildren?: boolean
  isCollapsable?: boolean
}

const MenuItemContext = createContext<{
  isSideBarCollapsed: boolean
  openSettings: boolean
}>({
  isSideBarCollapsed: false,
  openSettings: false
})

const MenuItemProvider = MenuItemContext.Provider

function useMenuItemContext() {
  return useContext(MenuItemContext)
}

function MenuItem({
  name,
  to,
  isChildren = false,
  onItemPress,
  isCollapsable
}: MenuItemProps) {
  const { isSideBarCollapsed, openSettings } = useMenuItemContext()

  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <ListItem sx={{ pl: isChildren ? 4 : 2 }} onClick={onItemPress}>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <Collapse in={!isSideBarCollapsed} timeout="auto" unmountOnExit>
          <ListItemText primary={name} />
        </Collapse>
        {isCollapsable && (openSettings ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
    </Link>
  )
}

function MenuItemChild({ name, to }: MenuItemChildProps) {
  const { isSideBarCollapsed, openSettings } = useMenuItemContext()

  return (
    <Collapse
      in={openSettings && !isSideBarCollapsed}
      timeout="auto"
      unmountOnExit
    >
      <List component="div" disablePadding>
        <MenuItem to={to} name={name} isChildren />
      </List>
    </Collapse>
  )
}

function MenuItemParent({
  to,
  name,
  hasChildren,
  children
}: PropsWithChildren<MenuItemParentProps>) {
  const { isSideBarCollapsed } = useSelector(state => state?.layout)

  console.log('to', to)

  const [openSettings, setOpenSettings] = useState(false)

  const handleSettingsClick = () => {
    if (!isSideBarCollapsed) {
      setOpenSettings(!openSettings)
    }
  }

  return (
    <MenuItemProvider value={{ isSideBarCollapsed, openSettings }}>
      <Tooltip title={!isSideBarCollapsed ? '' : name} placement="right">
        <MenuItem
          to={to}
          name={name}
          onItemPress={handleSettingsClick}
          isCollapsable={hasChildren}
        />
      </Tooltip>
      {children}
    </MenuItemProvider>
  )
}

export { MenuItemParent as MenuParent, MenuItemChild as MenuChild }
