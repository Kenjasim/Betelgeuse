export default function(state, action) {
  if (state === undefined) {
    return "Connecting"
  }

  switch (action.type) {
    case ('EMIT_CONNECTED'):
      return action.payload;
    default:
      return state;
  }
}



