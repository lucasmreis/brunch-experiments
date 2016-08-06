import { connect } from 'react-redux'

import { doSomethingAsync } from './televendas-reducer'
import Televendas from './televendas-component'

const mapStateToProps = state => ({
  sessionStatus: state.televendas.session
})

const mapDispatchToProps = dispatch => ({
  startNewSession: () => dispatch(doSomethingAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(Televendas)