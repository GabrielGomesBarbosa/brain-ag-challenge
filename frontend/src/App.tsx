import { Button } from '@mui/material'
import ButtonAppBar from './components/AppBar'
import Sidebar from './components/SideMenu'

function App() {
  return (
    <>
      <Sidebar />
      <ButtonAppBar />
      <h1>Test Challenge</h1>
      <Button>My Button</Button>
    </>
  )
}

export default App
