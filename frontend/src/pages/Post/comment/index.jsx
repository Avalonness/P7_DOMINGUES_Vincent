import styled from 'styled-components'
import colors from '../../../utils/styles/colors'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'

const ButtonContent = styled.div`
  width: 10%;
  padding: 10px;
  background: ${colors.backgroundLight};
  display: flex;
  justify-content: space-between;
  margin: 20px auto auto auto;
  @media (max-width: 767px) {
    width: 40%;
  }
  & button {
    border: none;
    background: none;
    color: ${colors.secondary};
    font-size: 18px;
    &:active {
      color: ${colors.primary};
    }
  }
`

const BoxLink = styled.div`
  background: ${colors.backgroundLight};
  border: 2px solid ${colors.primary};
  width: 50%;
  padding: 10px;
  margin: 15px auto auto auto;
  @media (max-width: 767px) {
    width: 90%;
  }
  & .link_content {
    background: white;
    padding: 5px;
    text-align: center;
    font-size: 18px;
  }
`

const CommentBox = styled.div`
  margin-bottom: 60px;
  @media (max-width: 767px) {
    margin-top: 60px;
  }
`

const CommentContainer = styled.div`
  display: flex;
  background: ${colors.backgroundLight};
  padding: 5px;
  margin: 20px auto auto auto;
  width: 70%;
  @media (max-width: 767px) {
    width: 100%;
  }
  & img {
    border: 1px solid ${colors.primary};
    width: 100px;
  }
  & .comment_username {
    background: ${colors.primary};
    color: white;
    padding: 2px;
    width: 150px;
    margin-left: 5px;
    text-align: center;
  }
  & .comment_message {
    padding: 5px;
    width: 100%;
  }
`

const BoxCommentPost = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  & button {
    width: 15%;
    padding: 5px;
    border: none;
    color: white;
    background: ${colors.primary};
  }
`

const CommentPost = styled.div`
  display: flex;
  width: 80%;
  margin: 45px auto auto auto;
  position: relative;
  justify-content: center;
  & img {
    border-radius: 50%;
    border: 1px solid ${colors.secondary};
    position: absolute;
    top: -60px;
    left: 10px;
    width: 100px;
    @media (max-width: 767px) {
      top: -90px;
      left: 85px;
    }
  }
  & textarea {
    border: 1px solid ${colors.secondary};
    padding: 20px;
    @media (max-width: 767px) {
      width: 100%;
    }
  }
`

function Comment() {
  let [comment, setComment] = useState([])
  let [linkOpen, isLinkOpen] = useState(null)
  let [commentOpen, isCommentOpen] = useState(null)
  let [profiles, setProfiles] = useState([])
  let [profileLog, setProfileLog] = useState([])
  let [newComment, setNewComment] = useState(null)
  const idUrl = useParams()
  const id = idUrl.id

  useEffect(() => {
    fetch(`http://localhost:8080/${id}/comment`, {
      headers: {
        Authorization: localStorage.getItem('Token_Groupo'),
      },
    })
      .then((res) => res.json())
      .then((data) => setComment(data))
  }, [])

  useEffect(() => {
    fetch('http://localhost:8080/getUsers', {
      headers: {
        Authorization: localStorage.getItem('Token_Groupo'),
      },
    })
      .then((res) => res.json())
      .then((users) => setProfiles(users))
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

  function openLink() {
    isCommentOpen(null)
    isLinkOpen(true)
  }

  function openComment() {
    isLinkOpen(null)
    isCommentOpen(true)
  }

  // Envoyer un commentaire
  function sendComment(e) {
    e.preventDefault()

    fetch(`http://localhost:8080/${id}/postComment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Token_Groupo'),
      },
      body: JSON.stringify({
        content: newComment,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data), (window.location = `/post/${id}`))
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      {/* Menu Button */}
      <ButtonContent>
        <button onClick={openComment}>
          <FontAwesomeIcon icon={faMessage} />
        </button>
        <div>•</div>
        <button onClick={openLink}>
          <FontAwesomeIcon icon={faLink} />
        </button>
      </ButtonContent>

      {/* Box de lien à partager */}
      {linkOpen !== null ? (
        <BoxLink>
          <div className="link_content">
            <p>http://localhost:3000/post/{id}</p>
          </div>
        </BoxLink>
      ) : null}

      {/* Box des commentaires */}
      <CommentBox>
        {/* Envoyer un commentaire */}
        {commentOpen !== null ? (
          <BoxCommentPost>
            <CommentPost>
              <img src={profileLog.profilImg} alt="Avatar Connecté" />
              <div>
                <textarea
                  id="commentarea"
                  rows="7"
                  cols="70"
                  placeholder="Ecrivez votre commentaire ici !"
                  onChange={(event) => setNewComment(event.target.value)}
                ></textarea>
              </div>
            </CommentPost>
            <button onClick={sendComment}>Poster</button>
          </BoxCommentPost>
        ) : null}
        {comment.map((message) => {
          return commentOpen !== null ? (
            <>
              <CommentContainer>
                {/* Récupération des commentaires */}
                <div>
                  {profiles.map((profil) => {
                    return profil.id === message.userId ? (
                      <img src={profil.profilImg} alt="Avatar profil" />
                    ) : null
                  })}
                </div>
                <div>
                  <div>
                    {profiles.map((profile) => {
                      return profile.id === message.userId ? (
                        <div className="comment_username">
                          {profile.username}
                        </div>
                      ) : null
                    })}
                  </div>
                  <div className="comment_message">{message.content}</div>
                </div>
              </CommentContainer>
            </>
          ) : null
        })}
      </CommentBox>
    </>
  )
}

export default Comment
