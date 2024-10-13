import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export const EditarEmpleado = () => {
    const urlBase="http://localhost:8080/rh/empleados"
    const navigate=useNavigate()
    const {id}=useParams()
    const [empleado, setEmpleado] = useState({
      nombre: "",
      departamento: "",
      sueldo: "",
    });
    useEffect(()=>{
        buscarEmpleado(id)
    },[])
    const buscarEmpleado=async(id)=>{
        const resultado=await axios.get(urlBase+"/"+id)
        setEmpleado(resultado.data);
    }
    
    const onSubmit=async(e)=>{
      e.preventDefault();
      const data={
        idEmpleado: id,
        nombre: empleado.nombre,
        departamento: empleado.departamento,
        sueldo: empleado.sueldo
      }
      const resultado = await axios.post(urlBase,data)
        if(resultado.data!= null){
          Swal.fire({
            title: "Usuario actualizado!",
            icon: "success"
          });
          navigate("/")
        }
      }
    return (
      <div
        className="container"
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <div className="container text-center" style={{ margin: "30px" }}>
          <h3>Editar Empleado</h3>
        </div>
        <form style={{ width: "50vw" }} onSubmit={(e)=>onSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              required={true}
              id="nombre"
              name="nombre"
              value={empleado.nombre}
              onChange={(e) =>
                  setEmpleado({ ...empleado, [e.target.name]: e.target.value })
                }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Departamento
            </label>
            <input
              type="text"
              className="form-control"
              required={true}
              id="departamento"
              name="departamento"
              value={empleado.departamento}
              onChange={(e) =>
                setEmpleado({ ...empleado, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Sueldo
            </label>
            <input
              type="number"
              className="form-control"
              required={true}
              id="sueldo"
              step="any"
              name="sueldo"
              value={empleado.sueldo}
              onChange={(e) =>
                  setEmpleado({ ...empleado, [e.target.name]: e.target.value })
                }
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary me-2">
              Actualizar
            </button>
            <Link type="submit" className="btn btn-danger ms-2" to={"/"}>
              Regresar
            </Link>
          </div>
        </form>
      </div>
    );
}
