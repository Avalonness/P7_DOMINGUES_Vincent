import styled from 'styled-components'
import Signup from './Main_Components/signup/index'
import Login from './Main_Components/login/index'
import { useState } from 'react'
import colors from '../../../utils/styles/colors'
import HeaderLog from './Main_Components/header/index'
const MainContainer = styled.div`
  width: 50%;
  margin: 0 auto;
  background: white;
  position: relative;
  @media (max-width: 767px) {
    width: 100%;
  }
`

const ModeSelect = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  padding: 15px;
  top: 100px;
  left: 80px;
  @media (max-width: 767px) {
    top: 500px;
    left: 95px;
  }
`

const SelectButton = styled.button`
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  background: ${colors.primary};
  color: white;
  width: 150%;
`

const SelectButtonActive = styled.button`
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  background: ${colors.secondary};
  color: white;
  width: 150%;
`

function Main() {
  const [isLog, setIsLog] = useState(null)

  function onClickSign() {
    setIsLog(true)
  }

  function onClickLog() {
    setIsLog(null)
  }

  return (
    <>
      <HeaderLog />
      <main>
        <ModeSelect>
          {isLog === null ? (
            <SelectButtonActive onClick={() => onClickLog()}>
              Connexion
            </SelectButtonActive>
          ) : (
            <SelectButton onClick={() => onClickLog()}>Connexion</SelectButton>
          )}
          {isLog === null ? (
            <SelectButton onClick={() => onClickSign()}>
              S'enregistrer
            </SelectButton>
          ) : (
            <SelectButtonActive onClick={() => onClickSign()}>
              S'enregistrer
            </SelectButtonActive>
          )}
        </ModeSelect>

        <MainContainer>{isLog === null ? <Login /> : <Signup />}</MainContainer>
      </main>
    </>
  )
}

export default Main
