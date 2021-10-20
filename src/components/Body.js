import React from 'react'
import { Box, Flex } from 'theme-ui'
import FormRepository from './search/FormRepository'

export default function Body() {
  return (
    <Box p={4} bg='light'>
      <Flex
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FormRepository />
      </Flex>
    </Box>
  )
}
