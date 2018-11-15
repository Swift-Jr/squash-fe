import React from 'react';
import {connect} from 'react-redux';

import {Link} from 'react-router-dom';
import Moment from 'react-moment';

import {userService, gameService} from '../../services';
import TouchEvent from '../../system/TouchEvent';
import {InputButton} from '../../components/Inputs';

import styles from './styles.module.css';

export const GameHistory = (props) => {
  const {games, showLeague} = props;

  const userId = parseInt(props.userContext || userService.getCurrentUser().getUserId(), 10);
  return <table className={styles.gameTable}>
    <thead>
      <tr>
        {
          showLeague
            ? <td>League</td>
            : null
        }
        <td>Date</td>
        <td>{
            showLeague
              ? 'Vs'
              : 'Players'
          }
        </td>
        <td className={styles.score}>Score</td>
      </tr>
    </thead>
    <tbody className={styles.bold}>
      <GameHistoryRows games={games.slice(0, props.listSize)} showLeague={showLeague} userContextId={userId}></GameHistoryRows>
    </tbody>
  </table>
}

export const GameHistoryRows = (props) => {
  const {games, showLeague, userContextId} = props;
  var counter = 1;

  const currentUserId = userService
    .getCurrentUser()
    .getUserId()

  return games.map((game) => {
    counter++;
    return <ConnectedGameRow key={game.getId()} game={game} showLeague={showLeague} userContextId={userContextId} currentUserId={currentUserId} counter={counter}></ConnectedGameRow>
  })
}

class GameRowComponent extends React.Component {
  state = {
    optionsVisible: false,
    deleteConfirm: null
  }

  toggleOptions = (e) => {
    this.setState({
      optionsVisible: !this.state.optionsVisible
    });
  }

  closeOptions = () => {
    this.setState({optionsVisible: false});
  }

  canDeleteGame = (game) => game
    .getPlayer1()
    .getUserId() === this.props.currentUserId || game
    .getPlayer2()
    .getUserId() === this.props.currentUserId;

  deleteGame = (id, confirm, e) => {
    if (id !== confirm) {
      this.setState({deleteConfirm: id});
      setTimeout(() => {
        this.setState({deleteConfirm: false})
      }, 2000);
      return;
    }

    if (id === confirm) {
      this
        .props
        .dispatch(gameService.actions.deleteGame(id))
    }
  }

  render = () => {
    const {showLeague, game, userContextId, currentUserId, counter} = this.props;
    const {optionsVisible, deleteConfirm} = this.state;

    const selectOtherPlayer = (player1, player2) => player1.getUserId() === userContextId
      ? player2
      : player1;

    const rowStyle = counter % 2 === 0
      ? styles.stripedRow
      : null;

    const userStyle = (
      game.getPlayer1().getUserId() === currentUserId || game.getPlayer2().getUserId() === currentUserId
      ? styles.currentUserHighlight
      : null);

    return <TouchEvent>
      <TouchEvent time={600} onLongPress={this.toggleOptions} onTap={this.closeOptions}>
        <tr key={game.getId()} className={`${userStyle} ${rowStyle}`}>
          {
            showLeague
              ? <td>
                  <Link to={`/league/${game
                      .getLeague()
                      .getId()}`}>{
                      game
                        .getLeague()
                        .getShortname()
                    }</Link>
                </td>
              : null
          }
          <td>
            <span className={styles.lightText}>
              <Moment format="D">{game.getDate()}</Moment>
            </span>
            <Moment format="MMM">{game.getDate()}</Moment>
            <span className={styles.lightText}>
              <Moment format="YY">{game.getDate()}</Moment>
            </span>
          </td>
          <td>
            {
              showLeague
                ? <Link to={`/scorecard/${selectOtherPlayer(game.getPlayer1(), game.getPlayer2()).getUserId()}`}>
                    <span className={styles.lightText}>{selectOtherPlayer(game.getPlayer1(), game.getPlayer2()).getFirstname()}</span>
                  </Link>
                : <div>
                    <span className={styles.lightText}>
                      <Link to={`/scorecard/${game
                          .getPlayer1()
                          .getUserId()}`}>{
                          game
                            .getPlayer1()
                            .getUserId() === currentUserId
                              ? 'Me'
                              : game
                                .getPlayer1()
                                .getFirstname()
                        }</Link>
                    </span>
                    &nbsp;v&nbsp;
                    <span className={styles.lightText}>
                      <Link to={`/scorecard/${game
                          .getPlayer2()
                          .getUserId()}`}>{
                          game
                            .getPlayer2()
                            .getUserId() === userService
                            .getCurrentUser()
                            .getUserId()
                              ? 'Me'
                              : game
                                .getPlayer2()
                                .getFirstname()
                        }</Link>
                    </span>
                  </div>
            }
          </td>
          <td className={styles.score}>
            <span className={styles.lightText}>{
                showLeague && game
                  .getPlayer2()
                  .getUserId() === userContextId
                    ? <em>{game.getPlayer1Score()}</em>
                    : game.getPlayer1Score()
              }&nbsp;-&nbsp;{
                showLeague && game
                  .getPlayer1()
                  .getUserId() === userContextId
                    ? <em>{game.getPlayer2Score()}</em>
                    : game.getPlayer2Score()
              }</span>
          </td>
        </tr>
      </TouchEvent>
      <tr className={`${userStyle} ${rowStyle} ${styles.actions}`}>
        <td colSpan={showLeague
            ? 4
            : 3}>
          <div style={optionsVisible
              ? {
                maxHeight: '100px'
              }
              : {
                maxHeight: 0
              }}>
            <InputButton className={`small ${styles.badAction}`} onClick={(e) => this.deleteGame(game.getId(), deleteConfirm, e)} disabled={!this.canDeleteGame(game)}>
              <i className="far fa-trash-alt"></i>
              {
                deleteConfirm === game.getId()
                  ? `Click to confirm`
                  : `Delete game`
              }</InputButton>
          </div>
        </td>
      </tr>

    </TouchEvent>
  }
}

function mapStateToProps(state) {
  const {games} = state;
  return {rgames: games};
}

const ConnectedGameRow = (connect(mapStateToProps)(GameRowComponent));
export {
  ConnectedGameRow as GameRow
};
