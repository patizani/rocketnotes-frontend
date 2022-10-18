import axios from "axios";

export const api = axios.create({
    //baseURL: "http://localhost:3333"//propriedade que pode incluir a parte do endereço da API que se repete em todas as requisições.
    baseURL: 'https://rocketnotes-api-pz.herokuapp.com'
});
