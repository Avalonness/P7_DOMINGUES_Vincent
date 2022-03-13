import styled from 'styled-components'
import { useState, useEffect } from 'react'
import logo from '../../assets/logo/icon-left-font-monochrome-white.svg'
import colors from '../../utils/styles/colors'
import menu from '../../assets/icon/menu.png'
import { StyledLink } from '../../utils/styles/atomx.js'

const HeaderContainer = styled.div`
  width: 100%;
  background: ${colors.primary};
  padding: 15px;
  text-align: center;
  position: relative;
  & .menu_open {
    width: 50px;
    background: none;
    border: none;
    position: absolute;
    bottom: 0px;
    right: 0px;
  }
`

const HeaderLogo = styled.img`
  height: 40px;
`

const MenuContent = styled.div`
  position: absolute;
  right: 5px;
  top: 90px;
  background: ${colors.primary};
  color: white;
  width: 10%;
  padding: 10px;
  @media (max-width: 767px) {
    width: 50%;
    position: sticky;
    margin: auto;
  }
  & img {
    border-radius: 50%;
    border: 1px solid ${colors.secondary};
    margin-top: 20px;
    height: 100px;
  }
  & .menu_list {
    margin-top: 25px;
    & button {
      border: none;
      width: 70%;
      background: #071834;
      margin-bottom: 15px;
      color: white;
      padding: 3px;
    }
    & .button_logout {
      background: ${colors.secondary};
    }
  }
`

function Header() {
  let [menuOpen, isMenuOpen] = useState(null)
  let [profileLog, setProfileLog] = useState([])

  //Récupérer le profil utilisateur
  useEffect(() => {
    fetch('http://localhost:8080/getUserOne', {
      headers: {
        Authorization: localStorage.getItem('Token_Groupo'),
      },
    })
      .then((res) => res.json())
      .then((data) => setProfileLog(data))
  }, [])

  function open() {
    isMenuOpen(true)
  }

  function close() {
    isMenuOpen(null)
  }

  function logout() {
    localStorage.removeItem('Token_Groupo')
    window.location.href = 'http://localhost:3000'
  }

  return (
    <header>
      <HeaderContainer>
        <HeaderLogo src={logo} alt="Groupomania" />
        {menuOpen === null ? (
          <button className="menu_open" onClick={open}>
            <img src={menu} alt="Menu Navigation" />
          </button>
        ) : (
          <>
            <button className="menu_open" onClick={close}>
              <img src={menu} alt="Menu Navigation" />
            </button>
            {/* Contenu du menu */}
            <MenuContent>
              <div>
                {profileLog.profilImg ? (
                  <img src={profileLog.profilImg} alt="Profil Connecté" />
                ) : null}
              </div>
              <div className="menu_list">
                <ul>
                  <li>
                    <StyledLink to={`/home`}>
                      <button>Accueil</button>
                    </StyledLink>
                  </li>
                  <li>
                    <StyledLink to={`/profil/${profileLog.id}`}>
                      <button>Profil</button>
                    </StyledLink>
                  </li>
                  <li>
                    <button className="button_logout" onClick={logout}>
                      Déconnexion
                    </button>
                  </li>
                </ul>
              </div>
            </MenuContent>
          </>
        )}
      </HeaderContainer>
    </header>
  )
}

export default Header
