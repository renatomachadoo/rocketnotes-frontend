import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { FiPlus } from "react-icons/fi"
import { Container, Brand, Menu, Search, Content, NewNote } from "./styles"

import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { Section } from "../../components/Section"
import { Note } from "../../components/Note"
import { ButtonText } from "../../components/ButtonText"

import { api } from "../../services/api"

export function Home(){
  const [search, setSearch] = useState("")
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [notes, setNotes] = useState([])

  const navigate = useNavigate()

  function handleSelectTag(tagName){
    if(tagName === "all"){
      return setSelectedTags([])
    }

    const alreadySelected = selectedTags.includes(tagName)

    if(alreadySelected){
      const filteredTags = selectedTags.filter(tag => tag !== tagName)
      setSelectedTags(filteredTags)
    }else{
      setSelectedTags(prevState => [...prevState, tagName])
    }
  }

  function handleDetails(noteId){
    navigate(`/details/${noteId}`)
  }

  useEffect(() => {
    async function fetchTags(){
      const response = await api.get("/tags")
      setTags(response.data)
    }
    fetchTags()
  }, [])

  useEffect(() => {
    async function fetchNotes(){
      const response = await api.get(`/notes?title=${search}&tags=${selectedTags}`)
      setNotes(response.data)
    }
    fetchNotes()
  }, [selectedTags, search])

  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header/>

      <Menu>
        <li>
          <ButtonText 
            title="Todos" 
            isActive={selectedTags.length === 0}
            onClick={() => handleSelectTag("all")}
          />
        </li>
        {
          tags && tags.map(( tag ) => (
            <li key={String(tag.id)}>
              <ButtonText
                title={tag.name}
                onClick={() => handleSelectTag(tag.name)}
                isActive={selectedTags.includes(tag.name)}
              />
            </li>
          ))
        }
      </Menu>

      <Search>
        <Input 
          placeholder="Perquisar pelo título"
          onChange={(e) => setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title="Minhas Notas">
          {
            notes && notes.map( note  => (
              <Note
                key={note.id}
                data={note}
                onClick={() => handleDetails(note.id)}
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