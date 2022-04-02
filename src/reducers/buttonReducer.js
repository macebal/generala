const buttonReducer = (state, action) => {
  //state is an object with keys like {isEnabled, text, color, shouldChangePlayer}
  switch (action.type) {
    case "ROLLING": {
      return { ...state, isEnabled: false, text: "Tirando" };
    }
    case "CAN_ROLL": {
      return {
        ...state,
        isEnabled: true,
        text: "Tirar",
        color: "blue",
        shouldChangePlayer: false,
      };
    }
    case "WAIT_FOR_SCORE_CLICK": {
      return { ...state, isEnabled: false, text: "Siguiente", color: "green" };
    }
    case "NEXT_PLAYER": {
      return {
        ...state,
        isEnabled: true,
        text: "Siguiente",
        color: "green",
        shouldChangePlayer: true,
      };
    }
    default:
      return state;
  }
};

export default buttonReducer;
