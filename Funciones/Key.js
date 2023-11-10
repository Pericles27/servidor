import axios from 'axios';
import qs from 'qs';
import dotenv from 'dotenv';

dotenv.config();

let cachedKey = null;

const { REACT_APP_API_MAIL, REACT_APP_API_PASS, REACT_APP_COOKIE } = process.env;

const getKey = async () => {
    if (!cachedKey) {
        try {
            let data = qs.stringify({
                'username': REACT_APP_API_MAIL,
                'password': REACT_APP_API_PASS,
                'grant_type': 'password'
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://api.invertironline.com/token',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': REACT_APP_COOKIE || '1ea65=1698664240331-916473707; visid_incap_2793377=Pm+PEt/BQneMK0ENtuIPWPyAUWQAAAAAQUIPAAAAAABuY45P1tLPWTo/6YYtpO8y'
                },
                data: data
            };

            const response = await axios.request(config);

            if (!response.data || !response.data.access_token) {
                throw new Error('Invalid response format or missing access_token');
            }

            cachedKey = response.data.access_token;

            setTimeout(() => {
                cachedKey = null;
            }, 840000);

            return cachedKey;
        } catch (error) {
            console.error('Error fetching access token:', error);
            throw error;
        }
    } else {
        return cachedKey;
    }
};

export default getKey;
