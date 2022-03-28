import * as gameScores from "../gameScores.json";

const getNumberScores = diceValues => {
  let numberScores = [];

  for (let i = 0; i < diceValues.length; i++) {
    let value = diceValues[i];

    let currentValue = numberScores.filter(
      val => val.name === value.toString()
    )[0];

    if (currentValue) {
      let filteredValues = numberScores.filter(
        val => val.name !== value.toString()
      );
      let newValue = {
        ...currentValue,
        score: currentValue.score + value,
      };
      numberScores = [...filteredValues, newValue];
    } else {
      numberScores.push({
        name: value.toString(),
        score: value,
      });
    }
  }

  return numberScores;
};

const countEquals = diceValues => {
  //this function returns an array with the different combinations of equal dices
  //For example:
  //[1,3,1,4,1] -> [3] (for the three "1"s)
  //[3,3,3,4,4] -> [3, 2] (three "3"s and the two "4"s)
  let equalsArray = [];

  for (let num = 1; num < 7; num++) {
    let numCount = diceValues.filter(value => num === value).length;

    if (numCount >= 2) equalsArray.push(numCount);
  }

  return equalsArray.sort((a, b) => b - a);
};

const isEqual = (a, b) => {
  //https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  //checks if two arrays are equal

  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  let arrayA = [...a];
  let arrayB = [...b];

  arrayA.sort((c, d) => c - d);
  arrayB.sort((c, d) => c - d);

  for (let i = 0; i < arrayA.length; ++i) {
    if (arrayA[i] !== arrayB[i]) return false;
  }
  return true;
};

const getNamedGameScores = (diceValues, rollNumber, hasGenerala) => {
  let equalsArray = countEquals(diceValues);
  let name = null;
  let score = 0;
  let mode = rollNumber === 1 ? "servido" : "armado";

  if (equalsArray.length === 0) {
    //If there are no pair of dices, it can be a Straight ("escalera")
    if (
      isEqual(diceValues, [1, 2, 3, 4, 5]) ||
      isEqual(diceValues, [2, 3, 4, 5, 6]) ||
      isEqual(diceValues, [3, 4, 5, 6, 1])
    ) {
      name = "escalera";
    }
  } else if (equalsArray.length === 1) {
    //If there is one element and it is either 4 or 5 it has to be Poker and Generala respectively
    if (equalsArray[0] === 4) {
      name = "póker";
    } else if (equalsArray[0] === 5) {
      name = hasGenerala ? "generala doble" : "generala";
    }
  } else if (equalsArray.length === 2) {
    if (equalsArray[0] === 3 && equalsArray[1] === 2) {
      name = "full";
    }
  }

  if (name) {
    score = gameScores[name][mode];
    return [{ name, score, mode }]; //inside an array to be consistent with getNumberScores
  } else {
    return [];
  }
};

const getPossibleScores = (
  diceValues = [],
  rollNumber = 1,
  hasGenerala = true
) => {
  let possibleScores = [];
  possibleScores = possibleScores
    .concat(getNumberScores(diceValues))
    .concat(getNamedGameScores(diceValues, rollNumber, hasGenerala));

  return possibleScores;
};

export default getPossibleScores;
