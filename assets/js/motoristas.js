const ordeneDisponible = () => {
    document.querySelector('#infoOrdenesDisponible').style.display = "block";
    document.querySelector('#infoOrdenesTomadas').style.display = "none";
    document.querySelector('#infoOrdenesEntregada').style.display = "none";
    document.querySelector('#btnOrdenDisponibles').style.display = "none";
    document.querySelector('#btnOrdenTomada').style.display = "none";
    document.querySelector('#btnOrdenEntregada').style.display = "none";
    document.querySelector('#Regresar').style.display = "block"
   
  } 


  const ordenTomada = () => {
    document.querySelector('#infoOrdenesDisponible').style.display = "none";
    document.querySelector('#infoOrdenesTomadas').style.display = "block";
    document.querySelector('#infoOrdenesEntregada').style.display = "none";
    document.querySelector('#btnOrdenDisponibles').style.display = "none";
    document.querySelector('#btnOrdenTomada').style.display = "none";
    document.querySelector('#btnOrdenEntregada').style.display = "none";
    document.querySelector('#Regresar').style.display = "block"
   
  }

  const ordeneEntregada = () => {
    document.querySelector('#infoOrdenesDisponible').style.display = "none";
    document.querySelector('#infoOrdenesTomadas').style.display = "none";
    document.querySelector('#infoOrdenesEntregada').style.display = "block";
    document.querySelector('#btnOrdenDisponibles').style.display = "none";
    document.querySelector('#btnOrdenTomada').style.display = "none";
    document.querySelector('#btnOrdenEntregada').style.display = "none";
    document.querySelector('#Regresar').style.display = "block"
   
  }

  const regresar = () => {
    document.querySelector('#infoOrdenesDisponible').style.display = "none";
    document.querySelector('#infoOrdenesTomadas').style.display = "none";
    document.querySelector('#infoOrdenesEntregada').style.display = "none";
    document.querySelector('#btnOrdenDisponibles').style.display = "flex";
    document.querySelector('#btnOrdenTomada').style.display = "flex";
    document.querySelector('#btnOrdenEntregada').style.display = "flex";
    document.querySelector('#Regresar').style.display = "block"
   
  }

  let motoristaActual;
  let idMotoristaActual = window.localStorage.getItem('idMotorista');
  let ordenesP = [];
  let ordenesProcesadas = [];
  let ordenesEntregadas = [];


  
  const obtenerMotorista = (id) => {
    fetch(`http://localhost:3050/motoristas/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .then(res => {
      motoristaActual = res;
      window.localStorage.setItem('motoristaNube',JSON.stringify(res));
      
      document.getElementById('encabezadoMoto').innerHTML = 
      `¡Hola, ${motoristaActual.nombre}!`

      console.log("MM", motoristaActual);
    })
  }

  obtenerMotorista(idMotoristaActual);

  // Ordenes pendientes
const obtenerOrdenesPendiente = () => {
  fetch(`http://localhost:3050/ordenes/estad/Pendiente`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  }).then(res => res.json())
  .then(res => {
    ordenesP = res;
    renderizarOrdenesPendientes();
    
  })
}

const renderizarOrdenesPendientes = () => {
  document.getElementById('seccion-orden-targeta').innerHTML = " ";
  console.log(ordenesP);
  ordenesP.forEach(orden => {
    let total = orden.cantidad * orden.precio;
    document.getElementById('seccion-orden-targeta').innerHTML +=
    `
      <div class="tarjeta-usuario-ordenes"> 
                    
      <div class="imagen">	
      <img id="imgMotorista" src="assets/img/McDonals.png">
      </div>
      <div class="detalle">
      
          <div>
            <span>
          Producto: ${orden.nombre}
            </span>
          </div>
          <div>
            <span>
            Cantidad: ${orden.cantidad}
            </span>
          </div>
      

      <div class="">
          <span id="ocupation">
          Total a pagar: ${total} LPS
          </span>
          </div>

          <div class="">
            <span id="ocupation">
            Ubicacion: ${orden.ubicacion}
            </span>
            </div>
      </div>
      </div>
      <div id="botones">
      <button onclick="tomarOrden('${orden._id}')" class="boton-tomar" >Tomar</button>
      </div>
    `
  })
}

// ordenes procesadas
const obtenerOrdenesProcesadas = () => {
  fetch(`http://localhost:3050/ordenes/estad/Procesada`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  }).then(res => res.json())
  .then(res => {
    ordenesProcesadas = res;
    renderizarOrdenesProcesadas();
    console.log('procesada', ordenesProcesadas);
  })
}

const renderizarOrdenesProcesadas = () => {
  document.getElementById('seccion-ordenes-tomadas').innerHTML = " ";
  ordenesProcesadas.forEach(orden => {
    let total = orden.cantidad * orden.precio;
    document.getElementById('seccion-ordenes-tomadas').innerHTML +=
    `
      <div class="tarjeta-usuario-ordenes"> 
                
      <div class="imagen">	
      <img id="imgMotorista" src="assets/img/logo-perfil.png">
      </div>
      <div class="detalle">
      
          <div>
            <span>
          Prodcuto: ${orden.nombre}
            </span>
          </div>
          <div>
            <span>
            Cantidad: ${orden.cantidad}
            </span>
          </div>
      

      <div class="">
          <span id="ocupation">
          Total a pagar: ${total} LPS
          </span>
          </div>

          <div class="">
            <span id="ocupation">
            Ubicacion: ${orden.ubicacion}
            </span>
            </div>

            <div class="">
                </div>
          
                <div class="">      
                  </div>
                  <div class="">
                      <span id="ocupation">
                      Estado: ${orden.estado}
                      </span>
                  </div>
                  <div>
                  <button onclick="entregarOrden('${orden._id}'); modalEntrega()" class="boton-tomar" >Entregar orden</button>
                  </div>
          </div>
      </div>
    `
  })
}


// ordenes Entregadas
const obtenerOrdenesEntregadas = () => {
  fetch(`http://localhost:3050/ordenes/estad/Entregada`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  }).then(res => res.json())
  .then(res => {
    ordenesEntregadas = res;
    renderizarOrdenesEntregadas();
    console.log('Entregadas', ordenesEntregadas);
  })
}

const renderizarOrdenesEntregadas = () => {
  document.getElementById('seccion-orden-entregada').innerHTML = " ";
  
  ordenesEntregadas.forEach(orden => {
    let total = orden.cantidad * orden.precio;
    document.getElementById('seccion-orden-entregada').innerHTML +=
    `
      <div class="tarjeta-usuario-ordenes"> 
                
      <div class="imagen">	
      <img id="imgMotorista" src="assets/img/${orden.logoEmpresa}">
      </div>
      <div class="detalle">
      
          <div>
            <span>
          Producto: ${orden.nombre}
            </span>
          </div>
          <div>
            <span>
            Cantidad: ${orden.cantidad}
            </span>
          </div>
      

      <div class="">
          <span id="ocupation">
          Total: ${total} LPS
          </span>
          </div>

          <div class="">
            <span id="ocupation">
            Ubicacion: ${orden.ubicacion}
            </span>
            </div>

            <div class=" div-vacio">
            
                </div>

            <div class="">
                <span id="ordenEntregada">
                ${orden.estado}
                </span>
                </div>
          </div>      
      </div>
    `
  })

}


const tomarOrden = (id) => {
  let data = {
    "estado": "Procesada",
    "idMotorista": idMotoristaActual
  }

  fetch(`http://localhost:3050/ordenes/${id}`,
    {  
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => {
      console.log("Estado cambiado con exito",res);
      document.getElementById('ordenTomada').showModal();
      regresar();
    })
    .catch(error => {
      console.log("error", error);
    })
}

const entregarOrden = (id) => {
  let data = {
    "estado": "Entregada",
    "idMotorista": idMotoristaActual
  }

  fetch(`http://localhost:3050/ordenes/${id}`,
    {  
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => {
      
      console.log("Estado cambiado con exito",res);
      regresar();
    })
    .catch(error => {
      console.log("error", error);
    })
}

const cerrarModal = (id) => {
  document.getElementById(id).close();
}

const modalEntrega = () => {
  document.getElementById('ordenEntregada').showModal();
}