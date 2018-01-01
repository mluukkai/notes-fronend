import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

let savedItem

const localStorageMock = {
  getItem: (item) => {
    savedItem = item
  },
  setItem: () => savedItem,
  clear: jest.fn()
}

window.localStorage = localStorageMock