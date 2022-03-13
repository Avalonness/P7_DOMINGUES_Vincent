import styled from 'styled-components'
import colors from '../../../utils/styles/colors'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ContainerPost = styled.div`
  width: 80%;
  margin: 60px auto;
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

const ProfilContainer = styled.div`
  width: 50%;
  margin: auto;
  background: white;
  padding: 10px;
  @media (max-width: 767px) {
    width: 100%;
  }
`

const BodyProfil = styled.div`
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
  & ul {
    display: flex;
    flex-direction: column;
    width: 80%;
    @media (max-width: 767px) {
      width: 100%;
    }
  }
  & li {
    display: flex;
    margin-bottom: 10px;
    align-items: center;
  }
  & .categorie_profil {
    background: ${colors.primary};
    color: white;
    padding: 4px;
    margin-right: 10px;
    width: 15%;
    text-align: center;
    @media (max-width: 767px) {
      width: 50%;
    }
  }
`

const ButtonSuppr = styled.div`
  display: flex;
  justify-content: end;
  & button {
    padding: 5px;
    background: ${colors.secondary};
    border: none;
    color: white;
  }
  & .editButton {
    background: ${colors.primary};
    margin-right: 10px;
  }
`

const InputForm = styled.input`
  height: 100%;
`

function ProfilView() {
  let [profil, setProfil] = useState([])
  let [profileLog, setProfileLog] = useState([])
  let [editMode, setEditMode] = useState(null)
  let [isUsernameSave, setIsUsernameSave] = useState(null)
  let [file, setFile] = useState(null)
  const idUrl = useParams()
  const id = idUrl.id

  useEffect(() => {
    fetch('http://localhost:8080/getUsers', {
      headers: {
        Authorization: localStorage.getItem('Token_Groupo'),
      },
    })
      .then((res) => res.json())
      .then((users) => setProfil(users))
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

  function editionMode() {
    setEditMode(true)
  }

  function editionMode2() {
    setEditMode(null)
  }

  // Gestion de l'upload image
  const onInputChange = (e) => {
    console.log(e.target.files)
    setFile(e.target.files[0])
  }

  function deleteAccount() {
    fetch(`http://localhost:8080/deleteUser/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: localStorage.getItem('Token_Groupo'),
      },
    })
      .then((res) => res.text()) // or res.json()
      .then((res) => console.log(res))
    localStorage.removeItem('Token_Groupo')
    setTimeout(function () {
      window.location.href = 'http://localhost:3000/'
    }, 500)
  }

  function update() {
    const data = new FormData()
    console.log(file)
    if (file) {
      data.append('image', file)
    }
    if (isUsernameSave !== null) {
      data.append('username', isUsernameSave)
    }

    console.log(isUsernameSave)
    console.log(data)

    fetch(`http://localhost:8080/editUser/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: localStorage.getItem('Token_Groupo'),
      },
      body: data,
    })
      .then((res) => res.json()) // or res.json()
      .then((res) => console.log(res))

    setTimeout(function () {
      window.location.href = `http://localhost:3000/profil/${id}`
    }, 500)
  }

  return (
    <>
      {editMode === null ? (
        <ProfilContainer>
          {profil.map((user) => {
            return user.id == id ? (
              <ContainerPost>
                <HeaderPost key={user.id}>
                  <img src={user.profilImg} alt="Avatar profil" />
                  <h2>{user.username}</h2>
                </HeaderPost>
                <BodyProfil>
                  <ul>
                    <li>
                      <div className="categorie_profil">Rang </div>
                      {user.levelAccount == 1 ? (
                        <p>Adminsitrateur</p>
                      ) : (
                        <p>Membre</p>
                      )}
                    </li>
                    <li>
                      <div className="categorie_profil">Username </div>
                      <p>{user.username}</p>
                    </li>
                    <li>
                      <div className="categorie_profil">Inscription </div>
                      <p>{user.createdAt}</p>
                    </li>
                  </ul>
                </BodyProfil>
                {profileLog.levelAccount == 1 || user.id == profileLog.id ? (
                  <ButtonSuppr>
                    <button className="editButton" onClick={editionMode}>
                      Editer
                    </button>
                    <button onClick={deleteAccount}>Suppression Compte</button>
                  </ButtonSuppr>
                ) : null}
              </ContainerPost>
            ) : null
          })}
        </ProfilContainer>
      ) : (
        <ProfilContainer>
          {profil.map((user) => {
            return user.id == id ? (
              <ContainerPost>
                <HeaderPost key={user.id}>
                  <img src={user.profilImg} alt="Avatar profil" />
                  <h2>{user.username}</h2>
                </HeaderPost>
                <BodyProfil>
                  <ul>
                    <li>
                      <div className="categorie_profil">Rang </div>
                      {user.levelAccount === 1 ? (
                        <p>Adminsitrateur</p>
                      ) : (
                        <p>Membre</p>
                      )}
                    </li>
                    <li>
                      <div className="categorie_profil">Username </div>
                      <form>
                        <InputForm
                          type="text"
                          id="editUser"
                          name="username"
                          required
                          placeholder={user.username}
                          onChange={(event) =>
                            setIsUsernameSave(event.target.value)
                          }
                        />
                      </form>
                    </li>
                    <li>
                      <div className="categorie_profil">Inscription </div>
                      <p>{user.createdAt}</p>
                    </li>
                    <li className="fileUpload">
                      <div className="categorie_profil">Avatar</div>
                      <form id="myForm">
                        <input
                          type="file"
                          name="image"
                          onChange={onInputChange}
                        ></input>
                      </form>
                    </li>
                  </ul>
                </BodyProfil>
                {profileLog.levelAccount === 1 || user.id === profileLog.id ? (
                  <ButtonSuppr>
                    <button className="editButton" onClick={update}>
                      Valider
                    </button>
                    <button onClick={editionMode2}>Annuler</button>
                  </ButtonSuppr>
                ) : null}
              </ContainerPost>
            ) : null
          })}
        </ProfilContainer>
      )}
    </>
  )
}

export default ProfilView
