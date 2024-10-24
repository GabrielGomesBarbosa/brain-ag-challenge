import { Provider } from 'react-redux'
import { PropsWithChildren } from 'react'

import { store } from './store/redux/store'

export default function LayoutProvider({ children }: PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>
}
