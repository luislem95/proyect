import React, { Component } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Menu extends Component {
    cerrarSesion=()=>{
        cookies.remove('id', {path: "/"});
        cookies.remove('apellido_paterno', {path: "/"});
        cookies.remove('apellido_materno', {path: "/"});
        cookies.remove('nombre', {path: "/"});
        cookies.remove('username', {path: "/"});
        window.location.href='./';
    }

    componentDidMount() {
        if(!cookies.get('username')){
            window.location.href="./";
        }
    }

    render() {
        console.log('id: '+ cookies.get('id'));
        console.log('apellido_paterno: '+cookies.get('apellido_paterno'));
        console.log('apellido_materno: '+cookies.get('apellido_materno'));
        console.log('nombre: '+cookies.get('nombre'));
        console.log('username: '+cookies.get('username'));
        return (
            <div>
                          <div className="container-fluid bg-light" style={{"marginTop":"100px"}} >
            <div className="row ">


            
            <div className="col m-5 " >
            
     <div className="card-body">
       <h5 className="card-title">Bienvenid@ {cookies.get('nombre')} {cookies.get('apellido_paterno')}</h5>
       <p className="card-text">Usuario : {cookies.get('username')}</p>
     </div>
 </div>

    
</div>
</div>

                <br />
                <button className='btn btn-danger ml-5' onClick={()=>this.cerrarSesion()}>Cerrar Sesión</button>
            </div>
        );
    }
}

export default Menu;