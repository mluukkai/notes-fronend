import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Note from './components/Note'
jest.mock('./services/notes')
import noteService from './services/notes'

describe('<App />', () => {
  let app
  beforeAll(() => {
    app = mount(<App />)
  })

  it('renders all notes it gets from backend', () => {
    app.update()
    const noteComponents = app.find(Note)
    expect(noteComponents.length).toEqual(noteService.notes.length)
  })
})