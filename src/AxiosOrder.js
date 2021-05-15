import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://react-my-burger-a81a4-default-rtdb.europe-west1.firebasedatabase.app/'
})

export default instance;