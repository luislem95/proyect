import React, { Component } from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import{faUser, faLock} from '@fortawesome/free-solid-svg-icons';



const baseUrl="http://localhost:3001/usuario";
const cookies = new Cookies();

class Login extends Component {
    state={
        form:{
            email: '',
            password: ''
        }
    }

    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    iniciarSesion=async()=>{
        await axios.get(baseUrl, {params: {email: this.state.form.email, password: md5(this.state.form.password)}})
        .then(response=>{
            return response.data;
        })
        .then(response=>{
            if(response.length>0){
                var respuesta=response[0];
                cookies.set('id', respuesta.id, {path: "/"});
                cookies.set('apellido_paterno', respuesta.apellido_paterno, {path: "/"});
                cookies.set('apellido_materno', respuesta.apellido_materno, {path: "/"});
                cookies.set('nombre', respuesta.nombre, {path: "/"});
                cookies.set('username', respuesta.username, {path: "/"});
                cookies.set('email', respuesta.email, {path: "/"});
                alert(`Bienvenid@ ${respuesta.nombre} ${respuesta.apellido_paterno}`);
                window.location.href="./menu";
            }else{
                alert('El correo o la contraseña no son correctos');
            }
        })
        .catch(error=>{
            console.log(error);
        })

    }

    componentDidMount() {
        if(cookies.get('username')){
            window.location.href="./menu";
        }
    }
    

    render() {
        return (
    <div className="containerPrincipal">
        <div className="containerSecundario">
           <div className='head'>
           <img src='https://media.licdn.com/dms/image/C4E0BAQGGESVvh2W6UQ/company-logo_200_200/0/1677254599089?e=2147483647&v=beta&t=p8wAdebj05QPGGBjwSgHmSSw_e5Fr8AF4ThmK0felnQ' alt="Descripción de la imagen" className='img'/>
             <h3 className='title'>Login</h3>
           </div>
          <div className="form-group">
            <br />
            <div className='input'> 
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder='Email@ejemplo.com'
              onChange={this.handleChange}
              pattern=".+@email\.com"
              required
            />
            <FontAwesomeIcon className='icon' icon={faUser} />
            </div>
            <br />
            <br />
           <div className='input'> 
             <input
               type="password"
               className="form-control"
               name="password"
               placeholder='Password'
               onChange={this.handleChange}
               required
             />
             <FontAwesomeIcon className='icon' icon={faLock} />
           </div>
            <br />
            <button className="boton" onClick={()=> this.iniciarSesion()}>entrar</button>
          </div>
        </div>
      </div>
        );
    }
}

export default Login;