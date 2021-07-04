import { useState, useEffect } from 'react'

function AjaxRequestPost(url){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);

    let form = document.getElementById('form');
    let formData = new FormData(form);

    // Remarque : le tableau vide de dépendances [] indique
    // que useEffect ne s’exécutera qu’une fois, un peu comme
    // componentDidMount()
    useEffect(() => {
        fetch(url, {
            method: "post",
            body: JSON.stringify(formData)
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
        console.log("requête envoyée")
    }
}

export default AjaxRequestPost