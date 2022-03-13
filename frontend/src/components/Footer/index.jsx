import styled from 'styled-components'
import colors from '../../utils/styles/colors'

const FooterContainer = styled.footer`
  background: ${colors.primary};
  width: 100%;
  padding: 20px;
  color: white;
  text-align: center;
  position: fixed;
  bottom: 0;
`

let Footer = () => {
  return (
    <footer>
      <FooterContainer>
        <p>@Groupomania - 2022</p>
      </FooterContainer>
    </footer>
  )
}

export default Footer
