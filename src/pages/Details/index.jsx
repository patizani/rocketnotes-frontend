import { useState, useEffect } from 'react';
import { Container, Links, Content } from "./styles";
import { useParams, useNavigate } from "react-router-dom";

import { api } from "../../services/api";

import { Tag } from "../../components/Tags";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { Section } from "../../components/Section";
import { RiWindow2Line } from 'react-icons/ri';


export function Details(title){
  const [data, setData] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  function HandleBack(){
    // navigate("/");//registra no histórico da navegação.
    navigate(-1);//volta para a rota anterior.
  }

  async function HandleRemove(){
    const confirm = window.confirm("Deseja realmente remover a nota?");

    if(confirm){
      await api.delete(`/notes/${params.id}`); //pega o id do usuário pelo parâmetro da rota.
      navigate(-1);
    }
  }

  useEffect(() => {
    async function fetchNote(){
      const response = await api.get(`/notes/${params.id}`);
      setData(response.data);
    }
    fetchNote();
  }, []);

  // const [data, setData] = 
  return( //onde tem o conteúdo da interface.
      <Container>
        <Header />
        {
          data && 
          <main>
          <Content>
            <ButtonText 
              title="Excluir a nota"  
              onClick={HandleRemove}
            />

            <h1>
              {data.title}
            </h1>

            <p>
              {data.description}
            </p>

            { 
              data.links &&
              <Section title = "Links úteis">
                <Links>
                  {
                    data.links.map(link => (
                      <li key={String(link.id)}>
                        <a href={link.url} target="_blank">
                          {link.url}
                        </a>
                      </li>
                    ))  
                  }
                </Links>
              </Section>
            }

            {
              data.tags &&
              <Section title = "Marcadores">
                { 
                  data.tags.map(tag => (
                    <Tag 
                      key={String(tag.id)}
                      title = {tag.name} 
                    />
                  ))
                }
              </Section>
            }
            

          {/* <Button title = "Login" loading/> */}
           <Button 
            title = "Voltar"
            onClick ={HandleBack}
          />
          </Content>
          </main>
        }
      </Container> 
  )
}
