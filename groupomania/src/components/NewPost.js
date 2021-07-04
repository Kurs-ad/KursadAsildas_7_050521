import { useState } from 'react'
import PostRequest from './PostRequest';
import axios from 'axios'

function NewPost({usersId, refresh, setRefresh}){
    const [newPost, setNewPost] = useState(false);
    const [reqBody, setReqBody] = useState([]);

    function axiosNewPost(e){
        e.preventDefault();
        let form = document.getElementById("newPostForm");
        let formData = new FormData();
        formData.append("text", form.text.value);
        formData.append("imageUrl", form.imageUrl.value);
        formData.append("userId", usersId);
        // let newPostBody = {}
        // console.log(...formData)
        // for (let [key, value] of formData.entries()){
        //     newPostBody[key] = value;
        // }
        // console.log(newPostBody)
        axios({
            method: "POST",
            url: "http://localhost:3000/api/posts/" + usersId,
            data: formData
        })
        .then(res => {
            console.log(res);
            setReqBody(res);
            console.log(reqBody)
        })
        .catch(error => console.log(error))
        if(reqBody.status === 201){
            alert("Votre post a été créé");
            setNewPost(false);
            setRefresh(refresh + 1);
        }
    }
        return newPost ? <div>
            <form id="newPostForm" onSubmit={axiosNewPost}>
                <img src="" alt="" />
                <textarea id="postInput" name="text" type="text" placeholder="Partagez vos pensées" rows="10"></textarea>
                <label>Ajouter une image<br/>
                    <input type="file" name="imageUrl" accept="image/png, image/jpg, image/jpeg" />
                </label>
                <button className="boutons" onClick={() => setNewPost(false)}>
                    Annuler
                </button>
                <button className="boutons" type="submit" onSubmit={(e)=>{<PostRequest />}}>
                    Publier
                </button>
            </form>
        </div>
        : <div>
            <img src="" alt="" />
            <input onClick={() => setNewPost(true)} id="postInput" type="text" placeholder="Partagez vos pensées" />
        </div>
}

export default NewPost