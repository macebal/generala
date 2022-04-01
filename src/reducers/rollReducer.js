const rollReducer = (state, action) => {
  //state is an object with properties like isRolling and animationTimeLeft
  switch (action.type) {
    case "SUBSTRACT_ANIMATION_TIME":
      //The action payload needs to be the time (in milis) to substract to the animation
      const newTime = state.animationTimeLeft - action.payload;
      console.log(newTime);
      if (newTime > 0) {
        return {
          ...state,
          isRolling: true,
          animationTimeLeft: state.animationTimeLeft - action.payload,
        };
      } else {
        return {
          ...state,
          isRolling: false,
          animationTimeLeft: 0,
        };
      }
    case "SET_ANIMATION_DURATION":
      //The action payload needs to be a number representing the time in milis
      return {
        ...state,
        isRolling: action.payload > 0,
        animationTimeLeft: action.payload,
      };
    default:
      return state;
  }
};

export default rollReducer;
