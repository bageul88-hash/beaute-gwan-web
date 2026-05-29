import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GNB from './components/layout/GNB'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'

export default function App() {
  return (
    <BrowserRouter>
      <GNB />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
