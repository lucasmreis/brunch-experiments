import { connect } from 'react-redux'

import { startNewSession } from './televendas-reducer'
import Televendas from './televendas-component'

const mapStateToProps = state => ({
  sessionStatus: state.televendas.session
})

const mapDispatchToProps = dispatch => ({
  startNewSession: () => dispatch(startNewSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(Televendas)