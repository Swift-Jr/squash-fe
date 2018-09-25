import React from 'react';

import {FullModal} from '../../components/FullModal';
//import {InputText, InputSelect} from '../../components/Inputs';

import styles from './styles.module.css';

export const SelectALeague = (props) => {
  const leagueOptions = [
    {
      id: 1,
      name: 'Tuesday Nines'
    }, {
      id: 2,
      name: 'Tuesday 11s'
    }, {
      id: 3,
      name: 'Rob + Perry Superleague'
    }
  ];

  const {action} = props;

  return (<div>
    <h4>Select a League</h4>
    <ul className={styles.leagueList}>
      <LeagueOptions options={leagueOptions} action={action}></LeagueOptions>
    </ul>
  </div>);
}

export const LeagueOptions = (props) => {
  const {options} = props;
  const {action} = props;

  return options.map((option) => <li onClick={() => action(option)}>{option.name}</li>);
}

export const LeagueDisplay = (props) => {
  return <div>
    <h4>League</h4>
    <ul className={styles.leagueList}>
      <li>{props.league.name}</li>
    </ul>
  </div>
}

export const SelectPlayers = (props) => {
  const playerList = [
    {
      id: 1,
      name: 'Rob'
    }, {
      id: 2,
      name: 'Perry'
    }, {
      id: 3,
      name: 'Gavin'
    }, {
      id: 4,
      name: 'Nobby'
    }, {
      id: 5,
      name: 'Brent'
    }
  ];

  const {action, game} = props;
  const {player1, player2} = game;

  return (<div className={`${styles.spacer}`}>
    <h4>Select Players</h4>
    <div className="row">
      <div className={`col-xs-6 ${styles.player} one`}>
        <ul className={styles.playerList}>
          <PlayerList players={playerList} action={action} selected={player1} disable={player2}></PlayerList>
        </ul>
      </div>
      <div className={`col-xs-6 ${styles.player} ${styles.two}`}>
        <ul className={styles.playerList}>
          <PlayerList players={playerList} action={action} selected={player2} disable={player1}></PlayerList>
        </ul>
      </div>
    </div>
  </div>);
}

export const PlayerList = (props) => {
  const {players, action, selected, disable} = props;

  return players.map((player) => {

    const playerClass = selected && player && selected.id === player.id
      ? styles.selected
      : styles.notselected;

    return selected === null && (!disable || disable.id !== player.id)
      ? <li onClick={() => action(player)}>{player.name}</li>
      : <li className={playerClass}>{player.name}</li>;
  });
}

export const PlayerDisplay = (props) => {
  const {player1, player2} = props;
  return <div className={`row ${styles.spacer}`}>
    <div className={`col-xs-5 ${styles.player} ${styles.one}`}>{player1.name}</div>
    <div className={`col-xs-2 ${styles.vs}`}>vs.</div>
    <div className={`col-xs-5 ${styles.player} ${styles.two}`}>{player2.name}</div>
  </div>
}

export const GameDisplay = (props) => {
  const {action, setScore, game} = props;
  return <div>
    <div className={`row ${styles.halfspacer}`}>
      <div className="col-xs-6">
        <select className={styles.scoreInput} type="text" onChange={(e) => setScore(e.target.value, null)}>
          <ScoreOptions options={[...Array(22).keys()]}></ScoreOptions>
        </select>
      </div>
      <div className="col-xs-6">
        <select className={styles.scoreInput} type="text" onChange={(e) => setScore(null, e.target.value)}>
          <ScoreOptions options={[...Array(22).keys()]}></ScoreOptions>
        </select>
      </div>
    </div>
    <div className="fixedBottom">
      <button className="large" onClick={() => action()} disabled={!game.player1score && !game.player2score}>Save Score</button>
    </div>
  </div>
}

export const ScoreOptions = (props) => {
  return props.options.map((option) => <option>{option}</option>);
}

export class PlayMatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false,
      game: {
        league: null,
        player1: null,
        player2: null
      }
    }

    this.handleOnOpen = this.handleOnOpen.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
    this.handleSelectLeague = this.handleSelectLeague.bind(this);
    this.handleSelectPlayer = this.handleSelectPlayer.bind(this);
    this.handleStartGame = this.handleStartGame.bind(this);
    this.handleSetScore = this.handleSetScore.bind(this);
    this.handleSaveGame = this.handleSaveGame.bind(this);

    this.getBodyContent = this.getBodyContent.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state !== nextProps) {
      this.setState(nextProps);
    }
  }

  handleOnClose() {
    const {onClose} = this.state;
    this.setState({
      game: {
        league: null,
        player1: null,
        player2: null
      },
      visible: false
    }, () => onClose && onClose(this.state.visible));
  }

  handleOnOpen() {
    const {onOpen} = this.state;
    this.setState({
      visible: true
    }, () => onOpen && onOpen(this.state.visible));
  }

  handleSelectLeague(league) {
    const {game} = this.state;
    game.league = league;
    this.setState({game: game});
  }

  handleSelectPlayer(player) {
    const {game} = this.state;
    game.player1 === null
      ? game.player1 = player
      : game.player2 = player;
    this.setState({game: game});
  }

  handleStartGame() {
    const {game} = this.state;
    game.started = (game.player1 !== null && game.player2 !== null);
    this.setState({game: game});
  }

  handleSetScore(one, two) {
    const {game} = this.state;

    if (!game.player1score) {
      game.player1score = 0;
    }

    if (!game.player2score) {
      game.player2score = 0;
    }

    if (one) {
      game.player1score = parseInt(one);
    }

    if (two) {
      game.player2score = parseInt(two);
    }

    this.setState({game: game});
  }

  handleSaveGame(score) {
    const {game} = this.state;
    if (game.player1score || game.player2score) {
      console.log(game);
      this.setState({saved: true});
    }
  }

  getBodyContent() {
    const {game} = this.state;

    return <div>
      {
        this.state.game.league
          ? <div>
              <LeagueDisplay league={game.league}></LeagueDisplay>
              {
                this.state.game.started
                  ? <div>
                      <PlayerDisplay player1={game.player1} player2={game.player2}></PlayerDisplay>
                      <GameDisplay action={this.handleSaveGame} setScore={this.handleSetScore} game={game}></GameDisplay>
                    </div>
                  : <div>
                      <SelectPlayers action={this.handleSelectPlayer} game={game}></SelectPlayers>
                      <div className="fixedBottom">
                        <button className="large" disabled={this.state.game.player2 === null} onClick={this.handleStartGame}>Match Time</button>
                      </div>
                    </div>
              }
            </div>
          : <SelectALeague action={this.handleSelectLeague}></SelectALeague>
      }
    </div>;
  }

  render() {
    return (<div>
      <button className="large" onClick={this.handleOnOpen}>Play a Match</button>
      {
        this.state.visible
          ? <FullModal onClose={this.handleOnClose} title="Let's Play" bodyContent={this.getBodyContent()} close={this.state.saved}></FullModal>
          : null
      }
    </div>);
  }
}

export default PlayMatch;
