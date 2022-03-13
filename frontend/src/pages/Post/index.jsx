import styled from 'styled-components'
import MainPost from './mainpost/index.jsx'
import Comment from './comment/index.jsx'
import Header from '../../components/Header'

const PostContainer = styled.div`
  width: 50%;
  margin: auto;
  background: white;
  padding: 10px;
  @media (max-width: 767px) {
    width: 100%;
  }
`

function Post() {
  return (
    <>
      <Header />
      <PostContainer>
        <MainPost />
        <Comment />
      </PostContainer>
    </>
  )
}

export default Post
