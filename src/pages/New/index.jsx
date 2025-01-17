import { useState } from "react"

import { useNavigate } from "react-router-dom"

import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { Textarea } from "../../components/Textarea"
import { NoteItem } from "../../components/NoteItem"
import { Section } from "../../components/Section"
import { Button } from "../../components/Button"
import { ButtonText } from "../../components/ButtonText"

import { api } from "../../services/api"

import { Container, Form } from "./styles"

export function New(){
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [links, setLinks] = useState([])
  const [newLink, setNewLink] = useState("")

  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState("")

  function handleAddLink(){
    setLinks(prevState => [...prevState, newLink])
    setNewLink("")
  }

  function handleRemoveLink(linkToRemove){
    setLinks(prevState => prevState.filter(link => link !== linkToRemove))
  }

  function handleAddTag(){
    setTags(prevState => [...prevState, newTag])
    setNewTag("")
  }

  function handleRemoveTag(tagToRemove){
    setTags(prevState => prevState.filter(tag => tag !== tagToRemove))
  }

  async function handleNewNote(){
    if(!title){
      return alert("Título da nota em falta!")
    }

    if(newLink){
      return alert("Você deixou um link no campo para adicionar, mas não clicou em adicionar. Clique para adicionar ou deixe o campo vazio.")
    }

    if(newTag){
      return alert("Você deixou uma tag no campo para adicionar, mas não clicou em adicionar. Clique para adicionar ou deixe o campo vazio.")
    }

    await api.post("/notes", {
      title,
      description,
      tags,
      links
    })

    alert("Nota criada com sucesso!")
    navigate(-1)
  }

  function handleBack(){
    navigate(-1)
  }

  return(
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText 
              title="voltar"
              onClick={handleBack}
            />
          </header>

    	    <Input 
            placeholder="Título" 
            value={title}  
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea 
            placeholder="Observações" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Section title="Links Úteis">
            {
              links.map((link, index) => (
                <NoteItem 
                  key={String(index)} 
                  value={link}
                  onClick={() => handleRemoveLink(link)}
                />
              ))
            }
            <NoteItem 
              isNew 
              placeholder="Novo link" 
              value={newLink} 
              onChange={(e) => setNewLink(e.target.value)} 
              onClick={handleAddLink}
            />
          </Section>

          <Section title="Marcadores">
            <div className="tags">
              {
                tags.map((tag, index) => (
                  <NoteItem
                    key={String(index)}
                    value={tag}
                    onClick={() => handleRemoveTag(tag)}
                  />
                ))
              }
              <NoteItem 
                isNew
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onClick={handleAddTag}
                placeholder="Nova tag"
              />
            </div>
          </Section>

          <Button 
            title="Guardar" 
            onClick={handleNewNote} 
          />
        </Form>
      </main>
    </Container>
  )
}