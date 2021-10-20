import React from 'react'
import { useState } from 'react'

export default function GridRepository(props) {
  // eslint-disable-next-line react/prop-types
  const [dataRepository, setDataRepository] = useState(props.data)
  console.log('props', props)
  return (
    <>
      <div>
        <h1>GridRepository</h1>
      </div>
      <div>
        <ul>
          {dataRepository.map((item) => (
            <li key={item.data.id}>{item.data.name}</li>
          ))}
        </ul>
      </div>
    </>
  )
}
