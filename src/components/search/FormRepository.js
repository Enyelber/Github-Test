import React from 'react'
import { useState, useEffect } from 'react'
import {
  Label,
  Input,
  Select,
  Textarea,
  Radio,
  Checkbox,
  Slider,
  Flex,
  Box,
  Button,
  Text,
  Card,
  Heading,
  Badge,
  Image,
  Paragraph,
  Alert,
  Close,
  Message,
} from 'theme-ui'

import imgIssues from '../../assets/img/issue.png'
import imgPullRequest from '../../assets/img/pull-request.png'
import { Spinner } from 'theme-ui'
//import GridRepository from './GridRepository'

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
          //`https://api.github.com/repos/${user}/${repo}`
          `https://api.github.com/repos/${user}/${repo}/issues`,
          //`https://api.github.com/repos/${user}/${repo}/pulls`,
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
        <Box as='form' onSubmit={handleSubmit}>
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
          <span type='invalid'>{errors.search && <p>{errors.search}</p>}</span>
          <Spinner sx={{ opacity: isSummit }} />
        </Box>
        <div>
          <h1>GridRepository</h1>
        </div>
      </div>
      <div
        sx={{
          maxWidth: 768,
          mx: 'auto',
          px: 3,
          py: 4,
        }}>
        <Box>
          <Box p={0}>
            <div
              sx={{
                display: 'grid',
                gridGap: 3,
              }}>
              {repoType === true ? (
                <ul className='repository'>
                  {console.log(infoRepos)}
                  {infoRepos.message === 'Not Found' ? (
                    <Message>Repository does not exist</Message>
                  ) : (
                    infoRepos.map((item) => (
                      <li key={item.id}>
                        <a className='repository__link' href=''>
                          <Card
                            className='repository__card'
                            sx={{
                              mt: '3',
                              borderRadius: '3',
                              display: 'grid',
                              gridTemplateColumns: '1fr 2fr',
                              borderColor: 'border',
                              boxShadow:
                                'box-shadow: 7px 8px 5px 0px rgba(176,167,167,0.34)',
                              maxWidth: 500,
                            }}>
                            {!item.pull_request ? (
                              <Image
                                src={imgIssues}
                                sx={{
                                  objectFit: 'cover',
                                  borderTopLeftRadius: '3',
                                  borderBottomLeftRadius: '3',
                                }}
                              />
                            ) : (
                              <Image
                                src={imgPullRequest}
                                sx={{
                                  objectFit: 'cover',
                                  borderTopLeftRadius: '3',
                                  borderBottomLeftRadius: '3',
                                }}
                              />
                            )}

                            <Box sx={{ p: '3' }}>
                              <Heading as='h2' mb={2}>
                                {item.title}
                              </Heading>
                              <Paragraph sx={{ fontSize: 1 }} mb={3}>
                                {item.body}
                              </Paragraph>
                              <Flex>
                                <span className='repository__autor'>
                                  Autor:{' '}
                                </span>
                                <span className='repository__autor--normal'>
                                  {' '}
                                  {item.user.login}
                                </span>
                              </Flex>
                              <Flex>
                                <span className='repository__autor'>
                                  Create:{' '}
                                </span>
                                <span className='repository__autor--normal'>
                                  {' '}
                                  {item.created_at}
                                </span>
                              </Flex>
                              <Flex>
                                <span className='repository__autor'>
                                  Comments:{' '}
                                </span>
                                <span className='repository__autor--normal'>
                                  {' '}
                                  <Badge mr={1}>{item.comments}</Badge>
                                </span>
                              </Flex>

                              <Flex>
                                {item.labels.map((item) => (
                                  <Badge key={item.id} mr={1}>
                                    {item.name}
                                  </Badge>
                                ))}
                              </Flex>
                              {!item.pull_request ? (
                                <Box
                                  p={1}
                                  sx={{ fontWeight: 'Bold', fontSize: 1 }}>
                                  Issues
                                </Box>
                              ) : (
                                <Box
                                  p={1}
                                  sx={{ fontWeight: 'Bold', fontSize: 1 }}>
                                  Pull Request
                                </Box>
                              )}
                            </Box>
                          </Card>
                        </a>
                      </li>
                    ))
                  )}
                </ul>
              ) : (
                <></>
              )}
            </div>
          </Box>
        </Box>
      </div>
    </div>
  )
}
