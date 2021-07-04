import axios from "axios"

function ShowComments(){
    axios.get("http://localhost:3000/comments").then(res => {console.log(res)})
}

export default ShowComments