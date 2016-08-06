import React from 'react'

const Televendas = ({ startNewSession, sessionStatus }) => (
  <div>
    <p>Televendas Container</p>
    <p>Status: {sessionStatus}</p>
    <p><a href='#' onClick={e => {
          e.preventDefault()
          startNewSession()
        }}>Novo Atendimento</a></p>
    <hr />
  </div>
)

export default Televendas