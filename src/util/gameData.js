const GAME_NAMES = {
  1: { longName: "Número 1", name: "1", shortName: "1" },
  2: { longName: "Número 2", name: "2", shortName: "2" },
  3: { longName: "Número 3", name: "3", shortName: "3" },
  4: { longName: "Número 4", name: "4", shortName: "4" },
  5: { longName: "Número 5", name: "5", shortName: "5" },
  6: { longName: "Número 6", name: "6", shortName: "6" },
  E: { longName: "Escalera", name: "Escalera", shortName: "E" },
  F: { longName: "Full", name: "Full", shortName: "F" },
  P: { longName: "Póker", name: "Póker", shortName: "P" },
  G: { longName: "Generala", name: "Generala", shortName: "G" },
  DG: { longName: "Doble Generala", name: "Doble Generala", shortName: "DG" },
};
const GAME_SCORES = {
  1: {},
  2: {},
  3: {},
  4: {},
  5: {},
  6: {},
  E: {
    servido: 25,
    armado: 20,
  },
  F: {
    servido: 35,
    armado: 30,
  },
  P: {
    servido: 45,
    armado: 40,
  },
  G: {
    armado: 50,
    servido: 50,
  },
  DG: {
    armado: 100,
    servido: 100,
  },
};

//The order in which the different scores should be rendered across the scoreboard
const GAME_ORDER = ["1", "2", "3", "4", "5", "6", "E", "F", "P", "G", "DG"];

const INITIAL_SCORE = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  E: 0,
  F: 0,
  P: 0,
  G: 0,
  DG: 0,
};

export { GAME_NAMES, GAME_SCORES, GAME_ORDER, INITIAL_SCORE };
