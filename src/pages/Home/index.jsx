import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiSearch } from 'react-icons/fi';

import { api } from '../../services/api';

import { Container, Brand, Menu, Search, Content, NewNote } from './styles';

import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Note } from '../../components/Note';
import { Section } from '../../components/Section';
import { ButtonText } from '../../components/ButtonText';

export function Home() {
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();
  
  function HandleTagSelected(tagName) {

    if(tagName === "all"){
      return setTagsSelected([]);
    }

    const alreadySelected = tagsSelected.includes(tagName); //tag selecionada

    if(alreadySelected){ //Se tag já selecionada
      const filteredTags = tagsSelected.filter(tag => tag !== tagName);
      setTagsSelected(filteredTags);
    } else{
      setTagsSelected(prevState => [...prevState, tagName]); //Selecionar mais de uma tag.
    }
  }

  function HandleDetails(id){
    navigate(`/details/${id}`); 
  }

  useEffect(() => {
    async function fetchTags(){
      const response = await api.get("/tags");
      setTags(response.data);
    }

    fetchTags();
  },[]);

  useEffect(() => {
    async function fetchNotes(){
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
      setNotes(response.data);
    }

    fetchNotes();

  },[tagsSelected, search]); //quando o usuário selecionar uma tag nova, a pesquisa recarregue com o filtro que o usuário está aplicando. E quando o usuário for digitando no campo search, a pesquisa seja recarregada.

  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header />
      <Menu>
      <li>
        <ButtonText 
          title="Todos" 
          onClick={() => HandleTagSelected("all")}
          isActive={tagsSelected.length === 0}
        />
      </li>
      {
        tags && tags.map(tag => (
          <li key={String(tag.id)}>
            <ButtonText 
              title={tag.name}
              onClick={() => HandleTagSelected(tag.name)} 
              isActive={tagsSelected.includes(tag.name)}
            />
          </li>
        ))
      }
      </Menu>

      <Search>
        <Input 
          placeholder="Pesquisar pelo título" 
          icon={FiSearch} 
          onChange={(e) => setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title="Minhas Notas">
          {
            notes.map(note => (
              <Note 
                key={String(note.id)}
                data= {note}
                onClick={() =>HandleDetails(note.id)}
              />
            ))
          }
        </Section>
      </Content>

      <NewNote to="/new">
        <FiPlus/>
          Criar nota
      </NewNote>

    </Container>
  )
}