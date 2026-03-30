import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { ScrollToTop } from './components/ScrollToTop'
import { FadeInObserver } from './components/FadeInObserver'
import { HomePage } from './pages/HomePage'
// import { AboutPage } from './pages/AboutPage'
import { ServicesPage } from './pages/ServicesPage'
import { EventDetailPage } from './pages/EventDetailPage'
import { ContactPage } from './pages/ContactPage'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <FadeInObserver />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/about" element={<AboutPage />} /> */}
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/gatherings/:eventId" element={<EventDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
