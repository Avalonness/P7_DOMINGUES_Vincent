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

function Signup() {
  function sendUser() {
    fetch('http://localhost:8080/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: document.querySelector('#pseudo').value,
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Container>
      <Banner>S'inscrire</Banner>
      <Formulaire>
        <li>
          <div>Pseudo</div>
          <form>
            <InputForm
              type="text"
              id="pseudo"
              name="pseudo"
              required
              placeholder="Pseudo ..."
            />
          </form>
        </li>
        <li>
          <div>Email</div>
          <form>
            <InputForm
              type="text"
              id="email"
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
              id="password"
              name="password"
              required
              placeholder="Password ..."
            />
          </form>
        </li>
      </Formulaire>
      <ButtonValidation onClick={() => sendUser()}>Valider</ButtonValidation>
    </Container>
  )
}

export default Signup
