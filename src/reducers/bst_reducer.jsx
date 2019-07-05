export default function(state, action) {
  if (state === undefined) {
    return true
  }

  switch (action.type) {
    case ('SET_BST'):
      return action.payload;
    default:
      return state;
  }
}


