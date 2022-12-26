import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components'
import { Home, Coin } from './containers'

export default function App() {
  return (
    <>
    
      <Navbar/>

      <Routes>

        <Route path='/' element={<Home/>}/>

        <Route path='/:id' element={<Coin/>}/>

      </Routes>
    
    </>
  )
}