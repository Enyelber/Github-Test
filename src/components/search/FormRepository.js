import React from 'react'
import { useState, useEffect } from 'react'
import { Label, Input, Box, Button, Spinner, Text } from 'theme-ui'
import GridRepository from './GridRepository'

/* import API from './datos.json'
const initialState = API */

export default function FormRepository() {
  const [valores, setValores] = useState({})
  const [dataToSearch, setdataToSearch] = useState({})
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [infoRepos, setInfoRepos] = useState([])
  const [repoType, setRepoType] = useState(true)
  const [isSummit, setIsSummit] = useState(0)

  useEffect(() => {
    getDataRepository(dataToSearch)
  }, [dataToSearch])

  const handleChange = (e) => {
    const { name, value } = e.target
    setValores({
      ...valores,
      [name]: value,
    })
    setErrors({})
    setRepoType(false)
    setInfoRepos([])
    setdataToSearch([])
  }
  function ValidateInfoSearch(values) {
    let errors = {}

    values.validado = true

    if (!values.search) {
      errors.search = 'Please enter the user and repository to search.'
      values.validado = false
    }
    if (!values.search.includes('/')) {
      errors.search = 'Please enter the name of repository to search.'
      values.validado = false
    }

    return errors
  }
  const getDataRepository = async (dataToSearch) => {
    if (dataToSearch.length > 0) {
      if (dataToSearch.includes('/')) {
        setIsSummit(1)
        const [user, repo] = dataToSearch.split('/')
        const response = await fetch(
          `https://api.github.com/repos/${user}/${repo}/issues`,
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
            },
          }
        )
        const data = await response.json()
        setInfoRepos(data)
        setRepoType(true)
        setIsSummit(0)
        setIsSubmitting(false)
      }
      /*  setInfoRepos(initialState) */
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors(ValidateInfoSearch(valores))

    if (isSubmitting === false) {
      if (valores.validado === true) {
        setIsSubmitting(true)
        setdataToSearch(valores.search)
      }
    }
  }

  return (
    <div
      sx={{
        maxWidth: 768,
        mx: 'auto',
        px: 3,
        py: 4,
      }}>
      <div>
        <Box as='form' sx={{ minWidth: 500 }} onSubmit={handleSubmit}>
          <Label htmlFor='username' mb={3}>
            Username/Repository
          </Label>
          <Input
            id='search'
            name='search'
            mb={3}
            placeholder='Search'
            onChange={handleChange}
          />

          <Button sx={{ width: '100%', cursor: 'pointer' }}>Submit</Button>
          <span className='errorSpan' type='invalid'>
            {errors.search && <p>{errors.search}</p>}
          </span>
          <Spinner sx={{ opacity: isSummit }} />
        </Box>
        <div>
          <Text
            sx={{
              fontSize: 4,
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'center',
            }}>
            RESPOITORIES
          </Text>
        </div>
      </div>
      <div
        sx={{
          maxWidth: 768,
          mx: 'auto',
          px: 3,
          py: 4,
        }}>
        <GridRepository repoType={repoType} infoRepos={infoRepos} />
      </div>
    </div>
  )
}
