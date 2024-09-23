import { useState } from "react"
import { Link } from "react-router-dom"

import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { Textarea } from "../../components/Textarea"
import { NoteItem } from "../../components/NoteItem"
import { Section } from "../../components/Section"
import { Button } from "../../components/Button"

import { Container, Form } from "./styles"

export function New(){
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

  return(
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <Link to="/">Voltar</Link>
          </header>

    	    <Input placeholder="Título" />
          <Textarea placeholder="Observações" />

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

          <Button title="Guardar" />
        </Form>
      </main>
    </Container>
  )
}