import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandSpock } from '@fortawesome/free-solid-svg-icons'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import axios from 'axios'


function GetAllPosts({refresh, usersId}){
    const handSpock = <FontAwesomeIcon icon={faHandSpock} />
    const commentsIcon = <FontAwesomeIcon icon={faComments} />
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState([]);
    const [commentClosed, setComment] = useState(true);
    const [postComments, setPostComments] = useState([]);
    const [reaction, setReaction] = useState("");

console.log(posts)
    // Remarque : le tableau vide de dépendances [] indique
    // que useEffect ne s’exécutera qu’une fois, un peu comme
    // componentDidMount()
    useEffect(() => {
        fetch("http://localhost:3000/api/posts/")
            .then(res => res.json())
            .then(
                (posts) => {
                setIsLoaded(true);
                setPosts(posts);
                },
            // Remarque : il faut gérer les erreurs ici plutôt que dans
            // un bloc catch() afin que nous n’avalions pas les exceptions
            // dues à de véritables bugs dans les composants.
                (error) => {
                setIsLoaded(true);
                setError(error);
                }
            )
    }, []);
    //axios.get("http://localhost:3000/api/posts/").then(resp=>console.log(resp))
    //axios.get("http://localhost:3000/api/postId/comments").then(res => console.log(res))

    function comments(whichPost, comments, postId){
        let postComments = document.getElementById(whichPost);
        let form = document.createElement("form");
        form.setAttribute("id", "commentForm");
        let input = document.createElement('input');
        input.setAttribute("type", "text");
        input.setAttribute("id", "postInput");
        input.setAttribute("placeholder", "Commenter");
        input.setAttribute("onchange", ()=>{console.log(input.value)})
        let submit = document.createElement("button");
        submit.setAttribute("type", "submit");
        submit.setAttribute("class", "boutons");
        form.appendChild(input);
        form.appendChild(submit);
        if(postComments.innerHTML === ""){
            postComments.appendChild(form);
            let commentForm = document.getElementById("commentForm");
            commentForm.addEventListener("submit", (e)=>{
                console.log(1)
                e.preventDefault();
                axios({
                    method: "POST",
                    url: "",
                    data: {
                        postId: postId,
                        userId: usersId,
                        comment: input.value
                    }
                })
            })
            for(let i = 0; i < comments.length; i++) {
                let comment = document.createElement("div");
                comment.id = "commentNumber" + i;
                comment.textContent = comments[i];
            };
        } else {
            postComments.innerHTML = ""
        }
    }

    function react(whichHandSpock, postId){
        let handSpock = document.getElementById(whichHandSpock);
        if(handSpock.style.color === ""){
            axios({
                method: "POST",
                url: "http://localhost:3000/api/posts/" + usersId + "/" + postId + "/react",
            }).then(res => {
                setReaction(res);
                console.log("reussite")
            }).catch(error => console.log(error));
            console.log("Réaction créée");
            handSpock.style.color = "red";
        } else {
            axios({
                method: "DELETE",
                url: "http://localhost:3000/api/posts/" + usersId + "/" + postId + "/reaction",
            }).then(res => {
                setReaction(res);
                //handSpock.style.color = "";
            }).catch(error => console.log(error));
            console.log("Réaction supprimée");
            handSpock.style.color = "";
        }
    }

    function handSpockColor(whichHandSpock, reactions){
        let handSpock = document.getElementById(whichHandSpock);
        console.log(reactions, "ici")
        for(let j=0; reactions.length; j++){
            if(reactions[j].userId === usersId){
                console.log(reactions[j].userId)
                handSpock.style.color = "red";
                console.log("usersId = reaction.userId")
            }
        }
    }

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else {
        console.log(posts)
        return commentClosed ?
            <div className='allPosts'>
                {posts.map((post, index) => (
                    <div key={`post-${index}`} onLoad={()=>handSpockColor(`handSpock-${index}`, `${post.reactions}`)} className='post'>
                        <div className='postHeader'>
                            <div className='infosUtilisateur'>
                                <img className='photoUtilisateur' src={post.user.photo} alt="photo de l'utilisateur"/>
                                {post.user.pseudo}
                            </div>
                            <div className='datePost'>
                                {post.createdAt}
                            </div>
                        </div>
                        <div className='postMain'>
                            <div className='textMain'>
                                {post.text}
                            </div>
                            <div>
                                <img className='photoMain' src={post.imageUrl} alt="image contenu" onError=""/>
                            </div>
                        </div>
                        <div className='postFooter'>
                            <div className="footerFix">
                                <div className="handSpock" onClick={()=>react(`handSpock-${index}`, `${post.id}`)} id={`handSpock-${index}`}>
                                    {handSpock} {post.reactions.length}
                                </div>
                                <div onClick={() => comments("postComments"+index, post.Comments, post.id)} id={`commentsPost-${index}`} >
                                    {commentsIcon} {post.Comments.length} Commentaires
                                </div>
                            </div>
                            <div id={"postComments"+index} >
                                {post.Comments.map(comment =>
                                    <div className="oneComment">
                                        {comment}
                                    </div>)}
                            </div>
                        </div>
                    </div>
                ))}       
            </div>
        : <div className='allPosts'>
            {posts.map(post => (
                <div className='post'>
                    <div className='postHeader'>
                        <div className='infosUtilisateur'>
                            <img className='photoUtilisateur' src={post.imageUrl} alt="photo de l'utilisateur"/>
                            {post.pseudo}
                        </div>
                        <div className='datePost'>
                            {post.createdAt}
                        </div>
                    </div>
                    <div className='postMain'>
                        <div className='textMain'>
                            {post.text}
                        </div>
                        <div>
                            <img className='photoMain' src={post.imageUrl} alt="image contenu"/>
                        </div>
                    </div>
                    <div className='postFooter'>
                        <div className="footerFix">
                            <div>
                                {handSpock}
                            </div>
                            <div className='showComments'>
                                {commentsIcon} Commentaires
                            </div>
                        </div>
                        <button className="stopComment boutons" onClick={() => setComment(true)}>X</button>
                        <div className="footerVariable">
                            <div className="postComments">
                                <input id="postInput" type="text" placeholder="Partagez vos pensées" />
                            </div>
                        </div>
                    </div>
                    
                </div>
            ))}       
        </div>;
    }
}

export default GetAllPosts