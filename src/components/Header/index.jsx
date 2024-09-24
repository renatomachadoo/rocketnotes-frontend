import { useNavigate } from "react-router-dom";
import { RiShutDownLine } from "react-icons/ri"
import { Container, Profile, Logout } from "./styles";
import { useAuth } from "../../hooks/auth";

import { api } from "../../services/api";

import avatarPlaceholder from "../../assets/avatar_placeholder.svg"

export function Header(){
  const navigate = useNavigate("/")
  const { signOut, user } = useAuth()

  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder

  function handleLogout(){
    navigate("/")
    signOut()
  }

  return(
    <Container>
      <Profile to="/profile">
        <img 
          src={avatarUrl}
          alt={user.name} 
        />

        <div>
          <span>Bem-vindo</span>
          <strong>{user.name}</strong>
        </div>
      </Profile>

      <Logout onClick={handleLogout}>
        <RiShutDownLine/>
      </Logout>
    </Container>
  )
}