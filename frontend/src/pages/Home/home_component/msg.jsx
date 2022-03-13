import styled from 'styled-components'
import colors from '../../../utils/styles/colors'
import { useState, useEffect } from 'react'
import { StyledLink } from '../../../utils/styles/atomx.js'

/*****************************************************************************************
 *********************** GESTION DU CSS AVEC SCOPE STYLE COMPONENTS***********************
 *****************************************************************************************/

const ContainerPost = styled.div`
  width: 80%;
  margin: auto auto 80px auto;
  @media (max-width: 767px) {
    width: 100%;
    margin-top: 80px;
`

const HeaderPost = styled.div`
  display: flex;
  background: ${colors.secondary};
  position: relative;
  height: 60px;
  & img {
    border: ${colors.secondary} 2px solid;
    position: absolute;
    left: 15px;
    top: 20px;
    width: 100px;
    height: 100px;
    @media (max-width: 767px) {
      top: -30px;
    }
  }
  & h2 {
    font-size: 20px;
    line-height: 3;
    text-align: left;
    color: white;
    margin-left: 130px;
  }
`

const BodyPost = styled.div`
  background: ${colors.backgroundLight};
  min-height: 80px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  & p {
    width: 83%;
    text-align: justify;
  }
`

const MultiMediaContent = styled.div`
  margin: auto;
  @media (max-width: 767px) {
    width: 100%;
    text-align: center;
  }
  & img {
    max-width: 450px;
    text-align: center;
    @media (max-width: 767px) {
      width: 50%;
    }
  }
  &:after {
    content: ' ';
    border: ${colors.secondary} 2px solid;
    display: flex;
    width: 50%;
    margin: 15px auto 15px auto;
  }
`

/*****************************************************************************************
 ***************************** ELEMENT RETOURNE EN REACT**********************************
 *****************************************************************************************/
function Msg() {
  let [message, setMessage] = useState([])
  let [profil, setProfil] = useState([])
  let [profileLog, setProfileLog] = useState([])

  useEffect(() => {
    let isMounted = true

    fetch('http://localhost:8080/', {
      headers: {
        Authorization: localStorage.getItem('Token_Groupo'),
      },
    })
      .then((res) => res.json())
      .then((data) => (isMounted === true ? setMessage(data.reverse()) : null))
    return () => {
      isMounted = false
    }
  }, [])

  console.log(message)

  useEffect(() => {
    fetch('http://localhost:8080/getUsers', {
      headers: {
        Authorization: localStorage.getItem('Token_Groupo'),
      },
    })
      .then((res) => res.json())
      .then((users) => setProfil(users))
  }, [])

  return (
    <div>
      <main>
        {message.map((el) => {
          return (
            <StyledLink to={`/post/${el.id}`}>
              <ContainerPost key={el.id}>
                {/* En-tête ici ! */}
                {profil.map((user, index) => {
                  return el.userId === user.id ? (
                    <HeaderPost key={index}>
                      <img src={user.profilImg} alt="Avatar profil" />
                      <h2>{user.username}</h2>
                    </HeaderPost>
                  ) : null
                })}
                {/* Corps du message ! */}
                <BodyPost>
                  {el.youtube !== 'null' ? (
                    <MultiMediaContent>
                      <iframe
                        width="100%"
                        height="280"
                        src={el.youtube}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </MultiMediaContent>
                  ) : null}

                  {el.contentImg ? (
                    <MultiMediaContent>
                      <img src={el.contentImg} alt="Element multumedia" />
                    </MultiMediaContent>
                  ) : null}

                  <p>{el.contentText}</p>
                </BodyPost>
                {/* Footer du message ! */}
                <div></div>
              </ContainerPost>
            </StyledLink>
          )
        })}
      </main>
    </div>
  )
}

export default Msg
