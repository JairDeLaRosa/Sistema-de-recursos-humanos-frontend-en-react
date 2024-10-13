import { useState } from 'react'
import { ListadoEmpleados } from './empleados/ListadoEmpleados'
import { Nav } from './plantilla/Nav'
import { Route, Routes } from 'react-router-dom'
import { AgregarEmpleado } from './empleados/AgregarEmpleado'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Nav/>
    <Routes>
      <Route path='/' element={<ListadoEmpleados/>}/>
      <Route path='/agregar' element={<AgregarEmpleado/>}/>
    </Routes>
    </>
  )
}

export default App
