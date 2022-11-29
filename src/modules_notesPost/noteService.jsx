
const axios = require ("axios");
const baseUrl = '/'


const getAll = () => {    
    const request = axios.get(`${baseUrl}notes`)
    return request.then(response => response.data)
  }
  
  const create = (newObject) => {
    const request = axios.post(`${baseUrl}notes`, newObject)
    return request.then(response => response.data)
  }
  
  const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}notes/:${id}`, newObject)
    return request.then(response =>{return response.data})
  }

  // const deleting = (id) => {
  //   const request = axios.delete(`${baseUrl}notes/:${id}`)
  //   return request.then(response =>{ return response.data})
  // }
  
  const noteService = { 
    getAll, 
    create, 
    update 
  }

  module.exports = noteService

 
 