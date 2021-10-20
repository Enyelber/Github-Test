import React from 'react'
import { useState, useEffect } from 'react'
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
  }
  function ValidateInfoSearch(values) {
    let errors = {}

    values.validado = true

    if (!values.search) {
      errors.search = 'Please enter the user and repository to search.'
      values.validado = false
    }

    return errors
  }
  const getDataRepository = async (dataToSearch) => {
    if (dataToSearch.length > 0) {
      if (dataToSearch.includes('/')) {
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
      } else {
        const data = await fetch(
          `https://api.github.com/users/${dataToSearch}/repos`
        )
        const users = await data.json()
        setInfoRepos(users)
        setRepoType(false)
      }
      /* setInfoRepos(initialState) */
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          id='search'
          name='search'
          placeholder='Search'
          onChange={handleChange}
        />
        <button>Search</button>
        <span type='invalid'>{errors.search && <p>{errors.search}</p>}</span>
      </form>
      <div>
        <h1>GridRepository</h1>
      </div>
      <div>
        <ul>
          {repoType === true
            ? //console.log(infoRepos)
              infoRepos.map((item) => (
                <li key={item.id}>
                  {item.title} - {item.user.login} - {item.state} -{' '}
                  {item.created_at} - {item.comments} -{' '}
                  {item.labels.map((item) => (
                    <span key={item.id}>{item.name}</span>
                  ))}{' '}
                  - {!item.pull_request ? 'Issues' : 'Pull Request'}
                </li>
              ))
            : //<li key={infoRepos.id}>{infoRepos.full_name}</li>
              infoRepos.map((item) => <li key={item.id}>{item.full_name}</li>)}
        </ul>
      </div>
      {/* <GridRepository data={infoRepos} /> */}
    </div>
  )
}
