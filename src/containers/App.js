import React from 'react'
import Header from '../components/Header'
import Body from '../components/Body'
import { ThemeProvider, Container } from 'theme-ui'
import theme from '../components/theme/theme'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Container>
          <div
            sx={{
              width: ['100%', '50%', '25%'],
            }}>
            <Header />
            <Body />
          </div>
        </Container>
      </>
    </ThemeProvider>
  )
}

export default App
