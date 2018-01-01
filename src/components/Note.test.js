import React from 'react'
import { shallow } from 'enzyme'
import Note from './Note'

describe('<Note />', () => {
  it('renders content', () => {
    const note = {
      content: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      important: true
    }

    const noteComponent = shallow(<Note note={note} />)
    const contentDiv = noteComponent.find('.content')

    expect(contentDiv.text()).toContain(note.content)
  })

  it('clicking the button calls event handler once', () => {
    const note = {
      content: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      important: true
    }

    const mockHandler = jest.fn()

    const noteComponent = shallow(
      <Note
        note={note}
        toggleImportance={mockHandler}
      />
    )

    const button = noteComponent.find('button')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(1)
  })
})
