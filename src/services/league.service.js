var usersLeagues = [
  {
    id: 1,
    name: "Tuesdays Nines",
    results: []
  }, {
    id: 2,
    name: "Tuesday 11s",
    results: [
      {
        player: {
          id: 1,
          name: "Rob"
        },
        place: 1,
        played: 12,
        won: 10,
        pointsWon: 30,
        pointsLost: 5,
        score: 56
      }, {
        player: {
          id: 2,
          name: "Gavin"
        },
        place: 2,
        played: 12,
        won: 10,
        pointsWon: 30,
        pointsLost: 5,
        score: 56
      }, {
        player: {
          id: 3,
          name: "Perry"
        },
        place: 3,
        played: 12,
        won: 10,
        pointsWon: 30,
        pointsLost: 5,
        score: 56
      }, {
        player: {
          id: 4,
          name: "Tom"
        },
        place: 4,
        played: 12,
        won: 10,
        pointsWon: 30,
        pointsLost: 5,
        score: 56
      }, {
        player: {
          id: 5,
          name: "Brent"
        },
        place: 5,
        played: 12,
        won: 10,
        pointsWon: 30,
        pointsLost: 5,
        score: 56
      }
    ]
  },{
    id: 3,
    name: "Wednesday 5s",
    results: [
      {
        player: {
          id: 1,
          name: "Rob"
        },
        place: 1,
        played: 12,
        won: 5,
        pointsWon: 15,
        pointsLost: 3,
        score: 24
      }, {
        player: {
          id: 2,
          name: "Gavin"
        },
        place: 2,
        played: 12,
        won: 10,
        pointsWon: 30,
        pointsLost: 5,
        score: 56
      }
    ]
  }
];

function getUsersLeagues() {
  return usersLeagues;
}

function getLeagueById(id) {
  return usersLeagues.filter((league)=> league.id === parseInt(id))[0];
}

function getLeagueGames(leagueid) {
  //TODO: Move getting user details to a user service
  const game = {
    id:1,
    date: '2018-10-02T00:00:00.000',
    player1: {
      id:1,
      firstname:'Rob',
      lastname:'Guard'
    },
    player2: {
      id:2,
      firstname:'Gavin',
      lastname:'Brooks'
    },
    player1Score: 9,
    player2Score: 11
  };

  return [
    game,game,game,game,game
  ];
}

function getUsersGames(userid) {
  //TODO: Move getting user details to a user service
  const game = {
    id:1,
    date: '2018-10-02T00:00:00.000',
    league: {
      id: 1,
      shortName: "Tues Nines",
      name: "Tuesdays Nines",
      results: []
    },
    player1: {
      id:1,
      firstname:'Rob',
      lastname:'Guard'
    },
    player2: {
      id:2,
      firstname:'Gavin',
      lastname:'Brooks'
    },
    player1Score: 9,
    player2Score: 11
  };

  return [
    game,game,game,game,game
  ];
}

export const leagueService = {
  getUsersLeagues,
  getUsersGames,
  getLeagueById,
  getLeagueGames
};
