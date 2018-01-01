import React from 'react'
import { shallow, mount } from 'enzyme'
import NoteForm from './NoteForm'

class Wrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formInput: ''
    }
  }
  onChange = (e) => {
    this.setState({ formInput: e.target.value })
  }
  render() {
    return (
      <NoteForm 
        value={this.state.value} 
        onSubmit={this.props.onSubmit}
        handleChange={this.onChange}
      />
  )}
}

it('renders content', () => {
  const onSubmit = jest.fn()

  const wrapper = mount(
    <Wrapper onSubmit={onSubmit} />
  )

  const input = wrapper.find('input')
  const button = wrapper.find('button')

  input.simulate('change', { target: { value: 'lomakkeiden testaus on hankalaa' } })
  //form.simulate('submit')
  button.simulate('submit')

  expect(wrapper.state().formInput).toBe('lomakkeiden testaus on hankalaa')
  expect(onSubmit.mock.calls.length).toBe(1)
})
