const axios = require ("axios");

const url = 'http://localhost:3001/notes'

const getting = () => {
    const axiosBase = axios.get(url)
    return axiosBase.then(resolve=> resolve.data)
}

const posting = (objectBase) => {
    const axiosBase = axios.post(url, objectBase)
    return axiosBase.then(resolve => resolve.data)
}

const deleting = (id) => {
    const axiosBase = axios.delete(`${url}${id}`)
    return axiosBase
}

const putting = (id, cambio) => {
    const axiosBase = axios.put(`${url}${id}`, cambio)
    return axiosBase
}
const notesPhonebook = { getting, posting, deleting, putting }

export default notesPhonebook