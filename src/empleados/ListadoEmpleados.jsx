import axios from "axios";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const ListadoEmpleados = () => {
  const navigate = useNavigate();
  const urlbase = "http://localhost:8080/rh/empleados";
  const [empleados, setEmpleados] = useState([]);
  useEffect(() => {
    cargarEmpleados();
    console.log(empleados);
  }, []);
  const cargarEmpleados = async () => {
    const resultado = await axios.get(urlbase);
    setEmpleados(resultado.data);
  };
  const eliminar=async(id)=>{
    const resultado =await axios.delete(urlbase+"/"+id)
    Swal.fire({
      title: "Eliminado.",
      text: "Usuario "+resultado.data.nombre+" ha sido eliminado correctamente.",
      icon: "success"
    });
    cargarEmpleados()
  }
  const eliminarEmpleado=(empleado)=>{
      Swal.fire({
      title: "¿Estas seguro?",
      text: "No podrás revertir esta desición.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        eliminar(empleado.idEmpleado)
      }
    });     
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
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody style={{ cursor: "pointer" }}>
          {empleados.map((empleado, indice) => (
            <tr key={indice}>
              <th scope="row">{empleado.idEmpleado}</th>
              <td>{empleado.nombre}</td>
              <td>{empleado.departamento}</td>
              <td>
                <NumericFormat
                  value={empleado.sueldo}
                  displayType="text"
                  thousandSeparator=","
                  prefix="$"
                  decimalScale={2}
                  fixedDecimalScale
                />
              </td>
              <td >
                <div style={{ display: "flex", justifyContent: "center"}}><Link
                    type="submit"
                    className="btn btn-primary ms-2"
                    to={"/editar/" + empleado.idEmpleado}
                  >
                    Editar
                  </Link>
                  <button type="button" className="btn btn-danger ms-2" onClick={()=>eliminarEmpleado(empleado)}>
                    Eliminar
                  </button></div>
                  
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
