/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import {
  Flex,
  Box,
  Card,
  Heading,
  Badge,
  Image,
  Paragraph,
  Message,
  Text,
  Divider,
} from 'theme-ui'
import imgIssues from '../../assets/img/issue.png'
import imgPullRequest from '../../assets/img/pull-request.png'
import Modal from '../utils/Modal'

export default function GridRepository(props) {
  const [modalIsOpen, setIsOpen] = useState(false)
  //const [infoComments, setInfoComments] = useState([])
  const [infoComments, setInfoComments] = useState([])

  const [info, setInfo] = useState({
    title: '',
    body: '',
    comments_url: '',
  })

  function getInfo(title, body, comments_url) {
    setIsOpen(!modalIsOpen)
    const comments = getDatacomments(comments_url)
    setInfo({ ...info, title: title, body: body, comments_url: comments })
  }
  const getDatacomments = (comments_url) => {
    fetch(comments_url)
      .then((response) => response.json())
      .then((data) => setInfoComments(data))
  }
  return (
    <>
      <Modal
        state={modalIsOpen}
        changeState={setIsOpen}
        title='Information'
        showHeader={true}
        showOverlay={true}
        positionModal={'center'}
        padding={'20px'}>
        <div>
          <Text
            sx={{
              fontSize: 4,
              fontWeight: 'bold',
            }}>
            {info.title}
          </Text>
          <p>{info.body}</p>
          <p>{info.comments_url}</p>

          <ul className='repository'>
            {infoComments.map((item) => (
              <li key={item.body}>
                <Flex sx={{ flexDirection: 'column' }}>
                  <span className='repository__autor'>Comment:</span>
                  <span className='repository__autor--normal'>
                    {' '}
                    {item.body}
                  </span>
                  <span className='repository__autor'>Create:</span>
                  <span className='repository__autor--normal'>
                    {' '}
                    {Date(item.created_at)}{' '}
                  </span>
                  <span className='repository__autor'>Create:</span>
                  <span className='repository__autor--normal'>
                    {item.author_association}
                  </span>
                </Flex>
                <Divider />
              </li>
            ))}
          </ul>
        </div>
      </Modal>
      <Box>
        <Box p={0}>
          <div
            sx={{
              display: 'grid',
              gridGap: 3,
            }}>
            {props.repoType === true ? (
              <ul className='repository'>
                {props.infoRepos.message === 'Not Found' ? (
                  <Message>Repository does not exist</Message>
                ) : (
                  props.infoRepos.map((item) => (
                    <li key={item.id}>
                      <a
                        className='repository__link'
                        href='#'
                        onClick={() =>
                          getInfo(item.title, item.body, item.comments_url)
                        }>
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
                              <span className='repository__autor'>Autor: </span>
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
                                {Date(item.created_at).toLocaleString()}
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
    </>
  )
}
