const initialState = {
  scores: {},
  faceRectangle: {},
  mood: 0,
  time: 0,
  emotion: ''
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_STATE':
      state.time += 5
      if (action.data.emotion == 'neutral') {
        action.data.emotion = state.emotion
      }

      return Object.assign({}, state, action.data)
      break;
    default:
      return state
  }
}
