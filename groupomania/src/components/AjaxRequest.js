import { useState, useEffect } from 'react'

function AjaxRequest(props){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);

    // Remarque : le tableau vide de dépendances [] indique
    // que useEffect ne s’exécutera qu’une fois, un peu comme
    // componentDidMount()
    useEffect(() => {
        fetch(props.url, {
            method: props.method,
            body: props.toSend
            })
            .then(res => res.json())
            .then(
                (data) => {
                setIsLoaded(true);
                setData(data);
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

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else {
        let myResponse = {}
        for(let i=0; i<data.length; i++){
            let myResponse_i = data.i;
            console.log(myResponse_i)
            return myResponse_i
        }
    }
}

export default AjaxRequest