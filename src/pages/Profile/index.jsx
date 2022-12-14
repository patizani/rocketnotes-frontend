import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import { api } from '../../services/api';

import avatarPlaceHolder from '../../assets/avatar_placeholder.svg';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { Container, Form, Avatar } from './styles.js';

export function Profile() {
  const { user, updateProfile } = useAuth();
  
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew, setPasswordNew] = useState("");

  const avatarURL = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceHolder;

  const [avatar, setAvatar] = useState(avatarURL); 
  const [avatarFile, setAvatarFile] = useState(null); //para carregar a nova imagem selecionada pelo usuário.

  const navigate = useNavigate();

  function HandleBack(){
    navigate(-1);
  }

  async function handleUpdate(){
    const userUpdated  = {
      name,
      email, 
      password: passwordNew,
      old_password: passwordOld,
    };

    const userAssigned = Object.assign(user, userUpdated);

    await updateProfile({user: userAssigned, avatarFile});
  }

  function handleChangeAvatar(event){
    const file = event.target.files[0]; //Pegar a 1a posição.
    setAvatarFile(file) //colocar o arquivo que o usuário acabou de selecionar.

    const imagePreview = URL.createObjectURL(file); 
    setAvatar(imagePreview);
  }

  return(
    <Container>
      <header>
        {/* <Link to="/">
          <FiArrowLeft />
        </Link> */}
        <button type="button" onClick={HandleBack}>
          <FiArrowLeft size={24}/>
        </button>
      </header>

      <Form>
        <Avatar>
          <img 
            src={avatar}
            alt="Foto do Usuário"
          /> 

          <label htmlFor="avatar">  
            <FiCamera />

            <input 
              id="avatar"
              type="file"
              onChange={handleChangeAvatar}
            />

          </label>
        </Avatar>
        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Input
          placeholder="Senha Atual"
          type="password"
          icon={FiLock}
          onChange={e => setPasswordOld(e.target.value)}
        />

        <Input
          placeholder="Nova Senha"
          type="password"
          icon={FiLock}
          onChange={e => setPasswordNew(e.target.value)}
        />

        <Button title="Salvar" onClick={handleUpdate}/>

      </Form>
    </Container>
  );
}