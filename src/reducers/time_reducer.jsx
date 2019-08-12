export default function(state, action) {
  if (state === undefined) {
    return ['2019-08-07 14:38:36', '2019-08-07 14:48:36']
  }

  switch (action.type) {
    case ('POST_TIME'):
      return action.payload;
    default:
      return state;
  }
}

