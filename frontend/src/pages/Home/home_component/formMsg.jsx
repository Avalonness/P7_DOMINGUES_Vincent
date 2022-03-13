import styled from 'styled-components'
import colors from '../../../utils/styles/colors'
import { useState, useEffect } from 'react'
import iconYoutube from '../../../assets/icon/youtube.svg'
import iconImage from '../../../assets/icon/image.svg'

/*****************************************************************************************
 *********************** GESTION DU CSS AVEC SCOPE STYLE COMPONENTS***********************
 *****************************************************************************************/
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 40px auto;
  & .avatarLog {
    border-radius: 50%;
    border: 4px solid ${colors.backgroundLight};
    position: absolute;
    left: 40px;
    top: 20px;
    width: 100px;
    @media (max-width: 767px) {
      top: -20px;
      left: 120px;
    }
  }
  & textarea {
    border: 1px solid ${colors.backgroundLight};
    padding: 10px;
    margin-top: 75px;
    @media (max-width: 767px) {
      width: 100%;
    }
  }
`

const OptionContainer = styled.div`
  width: 100%;
  & button {
    width: 50%;
    height: 25px;
    border: 1px solid black;
    background: ${colors.secondary};
    & img {
      height: 20px;
    }
    &:active {
      background: ${colors.primary};
    }
  }
`

const MediaOpen = styled.div`
  background: ${colors.backgroundLight};
  width: 100%;
  padding: 5px;
  border: black solid 1px;
  border-bottom: none;
  text-align: center;
  & input {
    width: 60%;
    padding: 5px;
  }
`

const Submit = styled.button`
  margin-top: 15px;
  width: 20%;
  border: 1px solid black;
  background: ${colors.primary};
  color: white;
  padding: 5px;
`

/*****************************************************************************************
 ***************************** ELEMENT RETOURNE EN REACT**********************************
 *****************************************************************************************/

function FormMsg() {
  let [profilLog, setprofilLog] = useState([])
  let [isYoutube, setIsYoutube] = useState(null)
  let [isImage, setIsImage] = useState(null)
  let [isContentSave, setIsContentSave] = useState(null)
  let [isYoutubeSave, setIsYoutubeSave] = useState(null)
  let [file, setFile] = useState(null)

  //Récupérer le profil utilisateur
  useEffect(() => {
    fetch('http://localhost:8080/getUserOne', {
      headers: {
        Authorization: localStorage.getItem('Token_Groupo'),
      },
    })
      .then((res) => res.json())
      .then((data) => setprofilLog(data))
  }, [])

  // Gérer l'option youtube
  function openYoutube(e) {
    e.preventDefault()
    setIsImage(null)
    setFile(null)
    setIsYoutube(true)
  }

  //gérer l'option Upload
  function openImage(e) {
    e.preventDefault()
    setIsYoutube(null)
    setIsYoutubeSave(null)
    setIsImage(true)
  }

  // Gestion de l'upload image
  const onInputChange = (e) => {
    console.log(e.target.files)
    setFile(e.target.files[0])
  }

  //Envoyer un post au back
  function sendPost(e) {
    e.preventDefault()

    const data = new FormData()
    console.log(file)
    if (file) {
      data.append('image', file)
    }
    data.append('youtube', isYoutubeSave)
    data.append('contentText', isContentSave)

    console.log(isContentSave)
    console.log(isYoutubeSave)
    console.log(data)

    fetch('http://localhost:8080/createOne', {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('Token_Groupo'),
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err)
      })
    setTimeout(function () {
      window.location.href = 'http://localhost:3000/home'
    }, 500)
  }

  return (
    <FormContainer>
      <img
        className="avatarLog"
        src={profilLog.profilImg}
        alt="Avatar profil log"
      />
      <form>
        <textarea
          rows="7"
          cols="70"
          id="contentText"
          placeholder="Post Ici !"
          onChange={(event) => setIsContentSave(event.target.value)}
        ></textarea>
        {isYoutube === true ? (
          <MediaOpen>
            <form>
              <input
                id="lienYoutube"
                placeholder="Lien de la vidéo ici !"
                onChange={(event) => setIsYoutubeSave(event.target.value)}
              ></input>
            </form>
          </MediaOpen>
        ) : null}
        {isImage === true ? (
          <MediaOpen>
            <form id="myForm">
              <input type="file" name="image" onChange={onInputChange}></input>
            </form>
          </MediaOpen>
        ) : null}
        <OptionContainer>
          <button onClick={openYoutube}>
            <img src={iconYoutube} alt="youtube" />
          </button>
          <button onClick={openImage}>
            <img src={iconImage} alt="youtube" />
          </button>
        </OptionContainer>
      </form>

      <Submit onClick={sendPost}> Envoyer</Submit>
    </FormContainer>
  )
}

export default FormMsg
