import AjaxRequestPost from "./AjaxRequestPost";

function PostRequest(event){
    event.preventDefault();
    let myForm = document.getElementById("myForm");
    myForm.addEventListener("submit", (e) =>{
        e.preventDefault();
        let formData = new FormData(this);
        <AjaxRequestPost url="http://localhost:3000/api/posts" method="post" body={formData}/>
    })
}

export default PostRequest