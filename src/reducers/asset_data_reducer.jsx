export default function(state, action) {
  if (state === undefined) {
    return {'type': 'none', 'id': null}
  }

  switch (action.type) {
    case ('SET_DATA'):
      return action.payload;
    default:
      return state;
  }
}

