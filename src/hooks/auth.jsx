import { createContext, useContext, useState, useEffect } from 'react';

import { api } from '../services/api';

export const AuthContext = createContext({}); //passar valor default.

function AuthProvider({ children }) {
  const [data, setData] = useState({}); // os dados do usuário autenticados são guardados num estado. Se o usuário der um reload, o estado é recarregado e fica vazio. Por isso, guardar os dados do usuário no localStorage.
  
  async function signIn({ email, password }) { //função de autenticação
    try{
      const response = await api.post("/sessions", { email, password });
      const { user, token } = response.data;

      localStorage.setItem("@rocketnotes:user", JSON.stringify(user)); //converter o objeto user num texto para guardar no localStorage.
      localStorage.setItem("@rocketnotes:token", JSON.stringify(token));

      // api.defaults.headers.authorization = `Bearer ${token}`; //inserido o token do tipo bearer de autorização no cabeçalho por padrão de todas as requisições do usuário. Guardar as informações num estado.
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setData({token, user});

    } catch (error) {
      if(error.response){
        alert(error.response.data.message);
      } else {
        alert("Não foi possível entrar.");
      }
    }
  }
    //Pegar os dados do usuário que foram armazenados no navegador no formato de texto e transformar para objeto no formato json.

  function signOut(){
    localStorage.removeItem("@rocketnotes:token");
    localStorage.removeItem("@rocketnotes:user");

    setData({}); //voltar o objeto como vazio para refletir nas rotas, mudando o estado.
  }

  async function updateProfile({user, avatarFile}){
    try {

      if(avatarFile){//se existe um arquivo selecionado.
        const fileUploadForm = new FormData();//Você pode usar FormData para incluir dados adicionais em um formulário existente antes de enviá-lo.
        fileUploadForm.append("avatar", avatarFile);

        const response = await api.patch("/users/avatar", fileUploadForm);
        user.avatar = response.data.avatar;
      }

      await api.put("/users", user);
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user)); //Coloca a chave no localStorage e Tb serve para substituir o conteúdo.

      setData({ user, token: data.token });
      alert("Perfil Atualizado!");

    }catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível atualizar o perfil.");
      }
    }
  }

  useEffect(() => {
      const token = localStorage.getItem("@rocketnotes:token");
      const user = localStorage.getItem("@rocketnotes:user");
  
      if(token && user) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
        setData({
          token,
          user: JSON.parse(user)
        });
      }
    }, []); //vetor [] significa que o vetor será carregado uma vez após a renderização do componente.

  return (
    //O contexto de autenticação está sendo provido para todas as rotas.
    <AuthContext.Provider value={{ 
      signIn, 
      signOut,
      updateProfile,
      user: data.user
    }}>  
      {children}
    </AuthContext.Provider> 
  )
}

function useAuth(){
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };