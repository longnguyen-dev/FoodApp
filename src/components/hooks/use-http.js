import { useState } from "react";

const useHttp = (url) => {
    const [dataFetch, setDataFetch] = useState();

    const sendResquest = async (method, data) => {
        const paramPostRequest = {
            hearder: method ? { 'Content-Type': 'application/json' } : null,
            body: method ? JSON.stringify(data) : null,
            method: method ? 'POST' : 'GET'
        }

        try {
            const responce = await fetch(url, paramPostRequest);

            if (!responce.ok) throw new Error('Something wrong here');

            const data = await responce.json();

            setDataFetch(data)

        } catch (error) {
            console.log(error.message);
        }
    }

    return {
        value: dataFetch,
        sendResquest,
    }

}

export default useHttp;