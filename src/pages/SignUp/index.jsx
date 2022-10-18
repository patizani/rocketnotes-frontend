import { useState } from "react"; // Hook para criar estados para pegar a informação digitada pelo usuário de forma dinâmica.
import { FiMail, FiLock, FiUser  } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import { api } from '../../services/api';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { Container, Form, Background } from './styles.js';


export function SignUp() {
  const [name, setName] = useState(""); // informar o valor inicial. No vetor é entregue o estado para acessar o valor atual do estado e a função para atualizar o estado.
  const  [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSignUp(){ 
    if(!name || !email || !password){
      return alert("Preencha todos os campos!");
    } 
    
    api.post("/users",{ name, email, password })
    .then(() => {
      alert("Usuário cadastrado com sucesso!");
      navigate(-1);
    })
    .catch(error => {
      if(error.response){
        debugger
        alert(error.response.data.message); //buscar a mensagem tratada no backend.
      }
      else {
        alert("Não foi possível cadastrar!");
      }
    });
  }

  return (
    <Container>
      <Background/>
      <Form>
        <h1>Rocket Notes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis.</p>

        <h2>Crie sua conta</h2>

        <Input 
          placeholder="Nome"
          type="text"
          icon={FiUser}
          onChange={e => setName(e.target.value)} 
          //função que dispara um evento toda vez que o valor do input muda.
        />

        <Input 
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          onChange={e => setEmail(e.target.value)}
        />

        <Input 
          placeholder="Senha"
          type="password"
          icon={FiLock}
          onChange={e => setPassword(e.target.value)}
        />

        <Button title="Cadastrar" onClick={handleSignUp} />

        <Link to="/">
          Voltar para o Login
        </Link>
      </Form>
    </Container>
  );
}