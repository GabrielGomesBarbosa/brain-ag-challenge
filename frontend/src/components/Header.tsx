import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import { useDispatch } from 'react-redux'
import Toolbar from '@mui/material/Toolbar'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { toggleCollapseSideBar } from '../store/redux/slice/layoutSlice'

export default function Header() {
  const dispatch = useDispatch()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => dispatch(toggleCollapseSideBar())}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Test Challenge
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
