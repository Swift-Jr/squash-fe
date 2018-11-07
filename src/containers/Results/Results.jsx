import React from "react";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';

import {clubService, gameService} from "../../services";

import {GameHistory} from "../../components/GameHistory";
import {PlayMatch} from "../PlayMatch";
import {Loading} from "../App/Loading";

export const ResultsRepeater = props => {
  return props
    .leagues
    .map(league => {
      let games = gameService.getLeagueGames(league.getId());
      return (<div key={league.getId()}>
        <h2>
          {
            league
              .getResults()
              .length > 0
                ? (<Link to={`/league/${league.getId()}`}>{league.getName()}</Link>)
                : (league.getName())
          }
        </h2>
        <GameHistory games={games} listSize={5}></GameHistory>
      </div>);
    });
};

export class ResultsComponent extends React.Component {
  getLeaguesForClub = () => {
    return clubService
      .getCurrentClub()
      .getLeagues()
      .filter(league => league.getResults().length > 0);
  };

  clubHasLeagues = () => {
    return this
      .getLeaguesForClub()
      .length > 0;
  };

  leagueHasGames = id => {
    return gameService
      .getLeagueGames(id)
      .length > 0;
  };

  render() {
    return (<div className="fixedPaddingBottom">
      <h1>Club Results</h1>
      {
        this.clubHasLeagues()
          ? (<div>
            <ResultsRepeater leagues={this.getLeaguesForClub()}/>
          </div>)
          : <Loading/>
      }
      <div className={`fixedBottom play-match`}>
        <PlayMatch/>
      </div>
    </div>);
  }
}

function mapStateToProps(state) {
  const {league, games} = state;
  return {league, games};
}

const connectedResultsComponent = connect(mapStateToProps)(ResultsComponent);
export {
  connectedResultsComponent as Results
};
