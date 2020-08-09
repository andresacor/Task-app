import React from 'react';
import { declaredPredicate } from '@babel/types';
import shortid from 'shortid'
import { ConsoleWriter } from 'istanbul-lib-report';


function App() {

  const [tarea, setTarea] = React.useState("")
  const [tareas, setTareas] = React.useState([])
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [id, setId] = React.useState('')
  const [error, setError] = React.useState(null)

  const agregarTarea = (e) => {
    e.preventDefault()

    if (!tarea.trim()) {
      setError('Recuerda que debes agregar una tarea')
      return
    }

    console.log(tarea)

    setTarea("")
    setError(null)

    setTareas([
      ...tareas,
      { id: shortid.generate(), nombreTarea: tarea }
    ])

  }

  const eliminarTarea = id => {

    const arrayFiltrado = tareas.filter(item => item.id !== id)
    setTareas(arrayFiltrado)
  }

  // Editar tarea
  const editar = item => {
    console.log(item)
    setModoEdicion(true)
    setTarea(item.nombreTarea)
    setId(item.id)
  }


  const editarTarea = (e) => {
    e.preventDefault()
    if (!tarea.trim()) {
      return
    }

    const arrayEditado = tareas.map(
      item => item.id === id ? { id: id, nombreTarea: tarea } : item)

    setTareas(arrayEditado)
    setModoEdicion(false)
    setTarea("")
    setId("")
    setError(null)
  }




  return (
    <div className="container mt-5">

      <h1 className="title text-left">
        <i class="far fa-coffee-togo pr-2"></i>
        TaskCreator
      </h1>
      <p className="title-slogan"> Organizar tus tareas nunca fue tan fácil.</p>
      <hr />
      <div className="row">
        <div className="col-12 col-md-8 mt-4">
          <h4 className="task-title text-left font-weight-bold">Lista de tareas</h4>
          <ul className="list-group">
            {
              tareas.length === 0 ? (
                <li class="task list-group-item ">No hay tareas</li>
              ) : (
                  tareas.map(item => (
                    <li className=" list-group-item" key={item.id}>
                      <span className="task lead my-3 d-block d-md-inline"> {item.nombreTarea} </span>
                      <button
                        className="btn btn-danger btn-sm float-left float-md-right mr-2 mx-md-2 "
                        onClick={() => eliminarTarea(item.id)}>
                        <i class="fal fa-trash-alt px-2"></i>
                        Eliminar
                    </button>

                      <button className="btn btn-warning btn-sm float-left float-md-right px-2"
                        onClick={() => editar(item)}>
                        <i class="fal fa-edit px-2"></i>
                        Editar
                    </button>
                    </li>
                  ))
                )

            }
          </ul>
        </div>
        <div className="col-12 col-md-4 mt-4">
          <h4 className="task-title text-left font-weight-bold">
            {
              modoEdicion ? 'Editar tarea' : 'Agregar tarea'
            }
          </h4>

          <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>

            <input type="text"
              className="task form-control mb-2 d-block py-4"
              placeholder="Ingrese la tarea"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />
            {
              modoEdicion ? (
                <button className=" btn btn-warning btn-block d-block" type="submit">Editar</button>
              ) : (

                  <button className="main btn btn-block border-0 font-weight-bold text-uppercase text-white py-2  " type="submit">Agregar</button>
                )
            }
          </form>

          {/* Si el usuario no ingresa ninguna tarea, sale una alerta indicando que el elemento esta vacio */}
          {
            error ? <span className="task-mistake w-100 alert alert-danger mt-3 float-right" role="alert">&#128512; {error}</span> : null
          }

        </div>
      </div>

    </div >
  );
}

export default App;
