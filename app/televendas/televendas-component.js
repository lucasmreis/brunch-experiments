import React from 'react'
import classNames from 'classnames'

const Televendas = ({ startNewSession, sessionStatus }) => (
  <div className={classNames('main')}>
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