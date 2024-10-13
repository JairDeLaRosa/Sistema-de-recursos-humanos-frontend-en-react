import axios from "axios";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

export const ListadoEmpleados = () => {
    const urlbase="http://localhost:8080/rh/empleados";
    const [empleados,setEmpleados]=useState([]);
    useEffect(()=>{
        cargarEmpleados();
        console.log(empleados);
    },[])
    const cargarEmpleados=async()=>{
        const resultado = await axios.get(urlbase)
        setEmpleados(resultado.data);
    }

  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3>Sistema de recursos humanos</h3>
      </div>
      <table className="table table-striped table-hover aling-middle">
        <thead className="table-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Empleado</th>
            <th scope="col">Departamento</th>
            <th scope="col">Sueldo</th>
          </tr>
        </thead>
        <tbody style={{cursor: "pointer"}}>
          {empleados.map((empleado,indice)=>
          <tr key={indice}>
          <th scope="row">{empleado.idEmpleado}</th>
          <td>{empleado.nombre}</td>
          <td>{empleado.departamento}</td>
          <td><NumericFormat value={empleado.sueldo} displayType="text" thousandSeparator="," prefix="$" decimalScale={2} fixedDecimalScale/>
            </td>
        </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
