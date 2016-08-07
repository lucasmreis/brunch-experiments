import startupReducer, { startBasket } from './startup-reducer'

//
// Código para rodar no load da Basket
//

// Cart id + infos (opn, epar, dos cookies)
// |> override infos da query string
// |> create / update cart
// |> inserir lines + services
// |> dispatch do cart completo

export { startupReducer, startBasket }