import { useState } from "react";

const useHttp = () => {
    // const initialValue = [
    //     {
    //         id: 'm1',
    //         name: 'Sushi',
    //         description: 'Finest fish and veggies',
    //         price: 22.99,
    //     },
    //     {
    //         id: 'm2',
    //         name: 'Schnitzel',
    //         description: 'A german specialty!',
    //         price: 16.5,
    //     },
    //     {
    //         id: 'm3',
    //         name: 'Barbecue Burger',
    //         description: 'American, raw, meaty',
    //         price: 12.99,
    //     },
    //     {
    //         id: 'm4',
    //         name: 'Green Bowl',
    //         description: 'Healthy...and green...',
    //         price: 18.99,
    //     },
    // ];

    const [dataFetch, setDataFetch] = useState();

    const sendResquest = async (method, data) => {
        const paramPostRequest = {
            hearder: method ? { 'Content-Type': 'application/json' } : null,
            body: method ? JSON.stringify(data) : null,
            method: method ? 'POST' : 'GET'
        }

        try {
            const responce = await fetch('https://react-http-request-5b4de-default-rtdb.asia-southeast1.firebasedatabase.app/food.json', paramPostRequest);

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