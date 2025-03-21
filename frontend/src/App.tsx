import { ThemeProvider } from './components/theme-provider'
import Layout from './Layout'
import MainPage from './MainPage'
import SettingsPage from './components/pages/SettingsPage'
import GenerateMVPs from './components/pages/GenerateMVPs'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import { LoaderCircle } from 'lucide-react'
import GenerateIdeas from './components/pages/GenerateIdeas'

// <div className="flex flex-col items-center justify-center min-h-svh">

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/generate/mvps" element={<GenerateMVPs />} />
            <Route path="/generate/ideas" element={<GenerateIdeas />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </Router>
  )
}

export default App
