import _ from "lodash";

const diceReducer = (state, action) => {
  //state is an object of the type: {0:{id:0, isSelected:false, value: 1},1:{..}}
  switch (action.type) {
    case "TOGGLE_SELECTION":
      //payload must be of type {id: XXX}
      const id = action.payload;
      let dice = state[id];
      dice = {
        ...dice,
        isSelected: !dice.isSelected,
      };
      return { ...state, [id]: dice };
    case "RANDOMIZE_VALUES":
      //This action type needs no payload
      let newValues = _.clone(state);

      //Progressively modify the newValues array with a random number
      //for each element, if it's not selected
      _.forEach(newValues, (dice, id) => {
        newValues = {
          ...newValues,
          [id]: {
            ...dice,
            value: dice.isSelected ? dice.value : Math.ceil(Math.random() * 6),
          },
        };
      });
      //This action replaces the old state but keeps all the properties
      return newValues;
    default:
      return state;
  }
};

export default diceReducer;
