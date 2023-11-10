import axios from 'axios';
import getKey from '../Funciones/Key.js';

let cachedData = null;

const ADRs = async () => {
    if (!cachedData) {
        try {
            const Clave = await getKey(); // Wait for the getKey Promise to resolve

            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `https://api.invertironline.com/api/Cotizaciones/aDRs/argentina/estados_unidos?panelCotizacion.instrumento=aDRs&panelCotizacion.panel=argentina&panelCotizacion.pais=estados_Unidos&api_key=${Clave}`,
                headers: { 
                    'Authorization': `Bearer ${Clave} `, 
                    'Cookie': '1ea65=1699446783999-565811726; 1ea603=lDZatDcZwl+zWuPwgReZXAG+pQ5zIwwi2RUSXo84L8Le999+QmTQIpG4U/wa3ZQPdSFE/oM6q6Ucz9Y5iGPCk5VT4+Y7CzjFutAW0KFjRO4WL9CRugU1gku/YWP2IW9jMtoY7e5N4zhN6MDyAfX1EGrr4WxKrlrDo1luX6lSOyf9JmOt'
                }
            };

            const response = await axios.request(config);
            cachedData = (response.data);

            setTimeout(() => {
                cachedData = null; 
            }, 840000); 

            return cachedData;
        } catch (error) {
            throw error;
        }
    } else {
        return cachedData;
    }
};

export default ADRs;