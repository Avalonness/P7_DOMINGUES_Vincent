import styled from 'styled-components'
import logo from '../../../../../assets/logo/icon-left-font-monochrome-white.svg'
import colors from '../../../../../utils/styles/colors'

const HeaderContainer = styled.div`
  width: 100%;
  background: ${colors.primary};
  padding: 15px;
  text-align: center;
`

const HeaderLogo = styled.img`
  height: 40px;
`

function HeaderLog() {
  return (
    <header>
      <HeaderContainer>
        <HeaderLogo src={logo} alt="Groupomania" />
      </HeaderContainer>
    </header>
  )
}

export default HeaderLog
