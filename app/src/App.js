import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MenuAppBar from './Components/MenuAppBar'
import { ThemeProvider } from '@mui/material'
import theme from './Components/Theme'
import Home from './Pages/Home'
import Team from './Pages/Team'
import Aboutus from './Pages/AboutUs'
import Menufooter from './Components/MenuFooter'
import PrivacyPolicy from './Pages/PrivacyPolicy'

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <MenuAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/about-us" element={<Aboutus />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
        </Routes>
        <Menufooter />
      </ThemeProvider>
    </>
  )
}

export default App
