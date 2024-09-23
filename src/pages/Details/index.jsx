import { Container, Links, Content } from "./styles"

import { Tag } from "../../components/Tag"
import { Button } from "../../components/Button"
import { ButtonText } from "../../components/ButtonText"
import { Header } from "../../components/Header"
import { Section } from "../../components/Section"

export function Details(){
  return(
    <Container>
      <Header/>

      <main>
        <Content>
          <ButtonText title="Excluir nota" />

          <h1>
            Introdução ao React
          </h1>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque dolorum molestiae dolores repellendus, necessitatibus ipsam in soluta suscipit temporibus eum totam atque, minus consequuntur animi officia sunt tenetur, ipsum est?
          </p>

          <Section title="Links úteis">
            <Links>
              <li>
                <a href="https://www.rocketseat.com.br/">
                  https://www.rocketseat.com.br/
                </a>
              </li>
              <li>
                <a href="https://www.rocketseat.com.br/">
                  https://www.rocketseat.com.br/
                </a>
              </li>
            </Links>
          </Section>

          <Section title="Marcadores">
            <Tag title="express"/>
            <Tag title="nodejs"/>
          </Section>

          <Button title="Voltar"/> 
        </Content>
      </main>
    </Container>
  )
}