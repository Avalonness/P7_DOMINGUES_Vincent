import styled from 'styled-components'
import colors from '../../../../../utils/styles/colors'

const Container = styled.div`
  padding: 25px;
`

const Banner = styled.div`
  background: ${colors.secondary};
  margin: 30px auto;
  padding: 15px;
  font-size: 22px;
  width: 35%;
  text-align: center;
  color: white;
  @media (max-width: 767px) {
    width: 80%;
  }
`

const Formulaire = styled.ul`
  text-align: center;
  & li {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
    & div {
      width: 10%;
      background: ${colors.primary};
      padding: 5px;
      color: white;
      margin-right: 10px;
      @media (max-width: 767px) {
        width: 30%;
      }
    }
    & textarea {
      height: 100%;
    }
  }
`

const InputForm = styled.input`
  height: 100%;
`

const ButtonValidation = styled.button`
  display: flex;
  justify-content: center;
  border: none;
  background: ${colors.secondary};
  font-size: 18px;
  width: 15%;
  color: white;
  margin: 25px auto;
  &:active {
    background: ${colors.primary};
  }
  @media (max-width: 767px) {
    width: 30%;
  }
`
const AuthContent = styled.div`
  text-align: center;
  color: green;
  font-size: 18px;
  & button {
    background: ${colors.primary};
    border: none;
    padding: 5px;
    color: white;
    border-radius: 5px;
    margin-top: 10px;
    font-size: 15px;
  }
`

function Login() {
  const token = localStorage.getItem('Token_Groupo')

  async function logUser() {
    const data = {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, /',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: document.querySelector('#logemail').value,
        password: document.querySelector('#logpassword').value,
      }),
    }
    const response = await fetch('http://localhost:8080/login', data);
    if(response.status === 200)
    {
      const datas = await response.json();
      console.log(datas)
      localStorage.setItem('Token_Groupo', "Bearer " + datas.accessToken)
      redirect()

    }

  }

  function redirect() {
    setTimeout(function () {
      window.location.href = 'http://localhost:3000/home'
    }, 2500)
  }

  return (
    <Container>
      <Banner>Connexion</Banner>
      {token ? (
        <AuthContent>
          <p>Vous êtes authentifié !</p>
          <button onClick={() => redirect()}>Page d'Accueil</button>
        </AuthContent>
      ) : (
        <Formulaire>
          <li>
            <div>Email</div>
            <form>
              <InputForm
                type="text"
                id="logemail"
                name="email"
                required
                placeholder="Email ..."
              />
            </form>
          </li>
          <li>
            <div>Password</div>
            <form>
              <InputForm
                type="password"
                id="logpassword"
                name="password"
                required
                placeholder="Password ..."
              />
            </form>
          </li>
        </Formulaire>
      )}
      {token ? null : (
        <ButtonValidation onClick={() => logUser()}>Valider</ButtonValidation>
      )}
    </Container>
  )
}

export default Login
