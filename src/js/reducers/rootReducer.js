const initialState = {
  scores: {},
  faceRectangle: {},
  songList: []
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_STATE':
      return Object.assign({}, state, action.data);
      break;
    default:
      return state;
  }
}
