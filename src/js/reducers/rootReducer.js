const initialState = {
  scores: {},
  faceRectangle: {},
  songList: [],
  time: 0
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_STATE':
      state.time += 5
      return Object.assign({}, state, action.data)
      break;
    default:
      return state
  }
}
