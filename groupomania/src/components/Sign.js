import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import AjaxRequestPost from './AjaxRequestPost'
import { BrowserRouter, Link } from 'react-router-dom'
import axios from 'axios'

function Sign({setPage, setUsersMail, setUsersId}){
    const [inputValue, setInputValue] = useState(0)
    const [isOpen, setIsOpen] = useState(true)
    const userPlus = <FontAwesomeIcon icon={faUserPlus} />
    const userCircle = <FontAwesomeIcon icon={faUserCircle} />
    const [reqBody, setReqBody] = useState([]);
    
    function axiosSignup(e){
        e.preventDefault();
        let form = document.getElementById("signupForm");
        let formData = new FormData();
        formData.append("email", form.email.value);
        formData.append("password", form.password.value);
        formData.append("pseudo", form.pseudo.value);
        formData.append("photo", form.photo.files[0], "photo_de_" + form.pseudo.value);
        let signupBody = {};
        for (let [key, value] of formData.entries()){
            signupBody[key] = value;
        }
        console.log(form.photo.files[0],signupBody)
        axios({
            method: "POST",
            url: "http://localhost:3000/api/users/signup",
            data: formData
        })
        .then(res => {
            console.log(res);
            setReqBody(res);
            axios.get("http://localhost:3000/api/users/oneUser/" + form.email.value)
                .then(res => setReqBody(res.data)).catch(error => console.log(error));
            setUsersMail(signupBody.email);
            setPage("mainPage");
            console.log(signupBody.id)
            setUsersId(signupBody.id);
        })
        .catch(error => console.log(error))
        if(reqBody.status === 201){
            axios.get("http://localhost:3000/api/users/" + form.email.value).then(res => setReqBody(res.data));
            setUsersMail(signupBody.email);
            setPage("mainPage");
            setUsersId(signupBody.id);
        } else {
            console.log(reqBody);
        }
    }

    function axiosLogin(e){
        e.preventDefault();
        let form = document.getElementById("loginForm");
        let formData = new FormData();
        formData.append("email", form.email.value);
        formData.append("password", form.password.value);
        let loginBody = {};
        for (let [key, value] of formData.entries()){
            loginBody[key] = value;
        }
        axios({
            method: "POST",
            url: "http://localhost:3000/api/users/login",
            data: loginBody
        })
        .then(res => {
            console.log(res.data);
            reqBody.push(res.data);
            console.log(reqBody);
            setUsersMail(loginBody.email);
            console.log(reqBody[0].id);
            setUsersId(reqBody[0].id);
            setPage("mainPage");})
        .catch(error => console.log(error))
        // if(reqBody.status === 200){
        //     console.log(reqBody);
        //     setUsersMail(loginBody.email);
        //     setPage("mainPage");
        //     console.log(reqBody.data.id);
        //     setUsersId(reqBody.data.id);
        // }
    }

    function emailValidation(){
        let emailInput = document.getElementById("email");
        let emailWarning = document.getElementById("emailWarning")
        let regex = /.+@.+\..+/;
        if (!regex.test(emailInput.value)){
            emailInput.style.border = "3px solid red";
            emailWarning.textContent =  "Doit être une adresse mail valide";
        } else {
            emailInput.style.border = "";
            emailWarning.textContent = "";
        }
    }

    function passwordValidation(){
        let passwordInput = document.getElementById("password");
        let passwordWarning = document.getElementById("passwordWarning")
        let regex = /\d[A-Z].+/;
        if(passwordInput.value.length <8){
            passwordInput.style.border = "3px solid red";
            passwordWarning.textContent =  "Au moins 8 caractères";
        } else if (!regex.test(passwordInput.value)){
            passwordInput.style.border = "3px solid red";
            passwordWarning.textContent =  "Au moins 1 majuscule, 1 minuscule et 8 caractères";
        } else {
            passwordInput.style.border = "";
            passwordWarning.textContent = "";
        }
    }

    return  isOpen ?    
        <div>
            <form id="loginForm" name="form" onSubmit={axiosLogin}>
                <button className='boutons' disabled="true" >
                    {userCircle}<br/>Authentification
                </button>  
                <button className='boutons' onClick={() => setIsOpen(false)}>
                    {userPlus}<br/>Inscription
                </button><br/>
                <label for="email">
                    Courriel<br/><input type="text" name="email" id="email" onChange={()=>emailValidation()}/>
                    <div id="emailWarning">
                    </div>
                </label><br/>
                <label for="password">
                    Mot de passe<br/><input type="password" name="password" id="password" onChange={()=>passwordValidation()}/>
                    <div id="passwordWarning">
                    </div>
                </label><br/>
                <button className='boutons' type="submit">
                    Accéder au réseau
                </button>
            </form>
            
        </div>
    : <div>
        <form id="signupForm" name="form" onSubmit={axiosSignup} encType="multipart/form-data">
            <button className='boutons' onClick={() => setIsOpen(true)}>
                {userCircle}<br/>Authentification
            </button>
            <button className='boutons' disabled="true" >
                {userPlus}<br/>Inscription
            </button><br/>
            <label for="email">
                Courriel<br/><input type="text" name="email" id="mail"  onBlur={(e) => setInputValue(e.target.value)}/>
                <div id="emailWarning">
                </div>
            </label><br/>
            <label for="password">
                Mot de passe<br/><input type="password" name="password" id="password" />
                <div id="passwordWarning">
                </div>
            </label><br/>
            <label for="pseudo">
                Pseudo<br/><input type="text" name="pseudo" id="pseudo" />
            </label><br/>
            <label for="photo">
                Photo<br/><input type="file" accept="image/png, image/jpg, image/jpeg" name="photo" id="photo" />
            </label><br/>
            <button className='boutons' type="submit" >
                S'inscrire au réseau
            </button>
        </form>
        
    </div>
}

export default Sign