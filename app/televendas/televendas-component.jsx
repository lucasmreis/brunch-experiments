import React from 'react'

const Televendas = ({ startNewSession }) => (
  <div>
    <p>
      Televendas Container <a
        href='#'
        onClick={e => {
          e.preventDefault()
          startNewSession()
        }}>Novo Atendimento</a>
    </p>
  </div>
)

export default Televendas