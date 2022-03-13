import styled from 'styled-components'
import colors from '../../../utils/styles/colors'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { StyledLink } from '../../../utils/styles/atomx.js'

const ContainerPost = styled.div`
  width: 80%;
  margin: auto;
  @media (max-width: 767px) {
    width: 100%;
    margin-top: 40px;
  }
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

const ModerationContent = styled.div`
  display: flex;
  justify-content: end;
  & button {
    padding: 5px;
    background: ${colors.secondary};
    color: white;
    border: none;
  }
`

let MainPost = () => {
  let [post, setPost] = useState([])
  let [profile, setProfile] = useState([])
  let [profileLog, setProfileLog] = useState([])
  const idUrl = useParams()
  const id = idUrl.id

  useEffect(() => {
    fetch(`http://localhost:8080/getOne/${id}`, {
      headers: {
        Authorization: localStorage.getItem('Token_Groupo'),
      },
    })
      .then((res) => res.json())
      .then((data) => setPost(data))
  }, [])

  useEffect(() => {
    fetch('http://localhost:8080/getUsers', {
      headers: {
        Authorization: localStorage.getItem('Token_Groupo'),
      },
    })
      .then((res) => res.json())
      .then((users) => setProfile(users))
  }, [])

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

  // Supprimer un élément !
  function deleteMessage() {
    fetch(`http://localhost:8080/deleteOne/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: localStorage.getItem('Token_Groupo'),
      },
    })
      .then((res) => res.text()) // or res.json()
      .then((res) => console.log(res))
    setTimeout(function () {
      window.location.href = 'http://localhost:3000/home'
    }, 500)
  }

  return (
    <>
      <ContainerPost key={post.id}>
        {/* En-tête ici ! */}
        {profile.map((user, index) => {
          return post.userId === user.id ? (
            <HeaderPost key={index}>
              <StyledLink to={`/profil/${post.userId}`}>
                <img src={user.profilImg} alt="Avatar profil" />
              </StyledLink>
              <h2>{user.username}</h2>
            </HeaderPost>
          ) : null
        })}
        {/* Corps du message ! */}
        <BodyPost>
          {post.youtube !== 'null' ? (
            <MultiMediaContent>
              <iframe
                width="100%"
                height="280"
                src={post.youtube}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </MultiMediaContent>
          ) : null}

          {post.contentImg ? (
            <MultiMediaContent>
              <img src={post.contentImg} alt="Element multumedia" />
            </MultiMediaContent>
          ) : null}

          <p>{post.contentText}</p>
        </BodyPost>
        {/* Footer du message ! */}
        <div>
          {profileLog.id === post.userId || profileLog.levelAccount === 1 ? (
            <ModerationContent>
              <button onClick={deleteMessage}>Supprimer</button>
            </ModerationContent>
          ) : null}
        </div>
      </ContainerPost>
    </>
  )
}

export default MainPost
