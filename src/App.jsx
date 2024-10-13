import { useState } from 'react'
import { ListadoEmpleados } from './empleados/ListadoEmpleados'
import { Nav } from './plantilla/Nav'
import { Route, Routes } from 'react-router-dom'
import { AgregarEmpleado } from './empleados/AgregarEmpleado'
import { EditarEmpleado } from './empleados/EditarEmpleado'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Nav/>
    <Routes>
      <Route path='/' element={<ListadoEmpleados/>}/>
      <Route path='/agregar' element={<AgregarEmpleado/>}/>
      <Route path='/editar/:id' element={<EditarEmpleado/>}/>
    </Routes>
    </>
  )
}

export default App
