import axios from "axios"
import { useEffect, useState } from "react"
import clientAxios from '../server/clientAxios'

// GET METHODS
export const getUserProfile = () => {


    const [ data, setData] = useState(null);


    useEffect(() => {
            const fetchData = async () => {
                const { data } = await clientAxios.get('/users');
                setData(data);
        };

        fetchData();

    },[])

    return {data};

}

// POST METHODS
export const postAxios = (url) => {


    const [ data, setData] = useState(null)


    useEffect(() => {
        const fetchData = async (nombre, email, password) => {
            try{
                const { data } = await clientAxios.post(
                    url,
                    { 
                        nombre,
                        email,
                        password
                    });
                setData(data);
            }
            catch (error){
                console.log(error)
            }
                
        };

        fetchData();

    },[])
    return { data }
    
}

// PUT METHODS
export const putAxios = (url) => {


    const [ data, setData] = useState(null)


    useEffect(() => {
        const fetchData = async (id, userId, title, body) => {
            try{
                const { data } = await clientAxios.put(
                    url,
                    { 
                        id,
                        userId,
                        body,
                        title
                    });
                setData(data);
            }
            catch (error){
                console.log(error)
            }
                
        };

        fetchData(
            1,
            1,
            'Loncha',
            'Loncha description'
        );

    },[])

    return { data }
    
}

// DELETE METHODS
export const deleteAxios = (url) => {

    const [ data, setData] = useState(null)

    useEffect(() => {
        const fetchData = async() => {
            try{ 
                const { data } = await clientAxios.delete(url);
                setData(data);
            }
            catch (error){
                console.log(error)
            }
                
        };

        fetchData(285);

    },[])

    return { data }
    
}

