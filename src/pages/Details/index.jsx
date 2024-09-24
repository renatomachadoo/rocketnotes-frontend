import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container, Links, Content } from "./styles"

import { Tag } from "../../components/Tag"
import { Button } from "../../components/Button"
import { ButtonText } from "../../components/ButtonText"
import { Header } from "../../components/Header"
import { Section } from "../../components/Section"

import { api } from "../../services/api"

export function Details(){
  const [data, setData] = useState(null)

  const params = useParams()
  const navigate = useNavigate()

  function handleBack(){
    navigate("/")
  }

  useEffect(() => {
    async function fetchNote(){
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data)
    }

    fetchNote()
  }, [])

  return(
    <Container>
      <Header/>

      {
        data && 
        <main>
          <Content>
            <ButtonText title="Excluir nota" />

            <h1>
              {data.title}
            </h1>

            <p>
              {data.description}
            </p>

            <Section title="Links úteis">
              <Links>
                {
                  data.links && data.links.map(link => (
                    <li key={String(link.id)}>
                      <a href={link.url} target="_blank">
                        {link.url}
                      </a>
                    </li>
                  ))
                }
              </Links>
            </Section>

            <Section title="Marcadores">
              {
                data.tags && data.tags.map(tag => (
                  <Tag 
                    key={String(tag.id)}
                    title={tag.name} 
                  />
                ))
              }
            </Section>

            <Button 
              title="Voltar"
              onClick={handleBack}
            /> 
          </Content>
        </main>
      }
      
    </Container>
  )
}