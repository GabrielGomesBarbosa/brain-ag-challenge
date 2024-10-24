import Routes from './routes/Routes'
import LayoutProvider from './LayoutProvider'

function App() {
  return (
    <LayoutProvider>
      <Routes />
    </LayoutProvider>
  )
}

export default App
