import { GAME_ORDER, GAME_SCORES } from "./gameData";
import _ from "lodash";

const getNumberScores = diceValues => {
  //For a given array of dice values, for example [1,2,3,4,4]
  //returns an array of object with the key being the dice number and the value
  //being the sum of that number, for the previous array it will return:
  //[{ name: "1", score: 1 },{ name: "2", score: 2 },{ name: "3", score: 3 },{ name: "4", score: 8 }]
  return _.chain(diceValues)
    .groupBy()
    .map((value, key) => {
      return {
        name: key,
        score: _.sum(value),
      };
    })
    .value();
};

const getNamedGameScores = (diceValues, rollNumber, hasGenerala) => {
  //Returns the named games (full, straight, poker, generala and doble generala) that are possible, with their respective score if it founds one
  const frequencyArray = _.chain(diceValues)
    .countBy()
    .toArray()
    .filter(val => val >= 2)
    .orderBy("desc")
    .value();

  let name = null;
  let score = 0;
  let mode = rollNumber === 1 ? "servido" : "armado";
  let sortedDiceValues = _.sortBy(diceValues);

  if (frequencyArray.length === 0) {
    //If there are no pair of dices, it can be a Straight ("escalera")
    if (
      _.isEqual(sortedDiceValues, [1, 2, 3, 4, 5]) ||
      _.isEqual(sortedDiceValues, [2, 3, 4, 5, 6]) ||
      _.isEqual(sortedDiceValues, _.sortBy([3, 4, 5, 6, 1]))
    ) {
      name = "E"; //escalera
    }
  } else if (frequencyArray.length === 1) {
    //If there is one element and it is either 4 or 5 it has to be Poker and Generala respectively
    if (frequencyArray[0] === 4) {
      name = "P"; //poker
    } else if (frequencyArray[0] === 5) {
      //DG: Doble Generala
      //G: Generala
      name = hasGenerala ? "DG" : "G";
    }
  } else if (frequencyArray.length === 2) {
    if (frequencyArray[0] === 3 && frequencyArray[1] === 2) {
      name = "F"; //full
    }
  }

  if (name) {
    score = GAME_SCORES[name][mode];
    return [{ name, score, mode }]; //inside an array to be consistent with getNumberScores
  } else {
    return [];
  }
};

const hasScoreInGame = (gameName, playerData) => {
  //returns true if there is a score already in gameName (or if it's crossed)
  return !_.chain(playerData)
    .pickBy(val => val !== 0)
    .pick(gameName)
    .isEmpty()
    .value();
};

const getGameToCross = playerData => {
  //returns an object array with the gameName of the game of the highest value
  //(since the GAME_ORDER constant is ordered increasingly in value, this game is the first counting from the right)
  let gameName = "";

  GAME_ORDER.forEach(game =>
    !hasScoreInGame(game, playerData) ? (gameName = game) : null
  );

  const gameToCross = { name: gameName, score: -1 }; //-1 signifies that it is crossed further down the line (see Score component)
  return [gameToCross];
};

const getPossibleScores = (
  diceValues = [],
  remainingRolls = 3,
  playerData = {}
) => {
  const hasGenerala = hasScoreInGame("G", playerData);
  const rollNumber = 3 - remainingRolls;

  const possibleGames = _.concat(
    getNumberScores(diceValues),
    getNamedGameScores(diceValues, rollNumber, hasGenerala),
    getGameToCross(playerData)
  );

  return _.filter(
    possibleGames,
    game => !hasScoreInGame(game.name, playerData)
  );
};

export default getPossibleScores;
