import { AutoGameRunner, FStateTransitionCallback, IGameOptions, NaiveAIAdapter } from '@bluff/game';
import { NodePlayerAdapter } from './NodePlayerAdapter';

const options: Readonly<IGameOptions> = {
    diceType: 6,
    players: [
        new NodePlayerAdapter(),
        new NaiveAIAdapter(),
        new NaiveAIAdapter(),
    ]
}

const stateChangeCallback: FStateTransitionCallback = ({ boardState, currentState, gameState, move }) => {
    switch (currentState) {
        case "NEW_GAME":
        case "END_GAME":
        case "END_ROUND": console.log(`${gameState.state} - kostki: [${gameState.playerDicesCount}]`); break
        case "PLAYER_MOVE_BID": console.log(`${gameState.state} - ${gameState.activePlayerIdx} ${JSON.stringify(move)}`); break;
        case "PLAYER_MOVE_CHALLENGE": console.log(`${gameState.state} ${gameState.activePlayerIdx}`); break;
        case "NEW_ROUND": console.log(`${gameState.state} ${JSON.stringify(boardState.diceValues)}`); break;
        default: console.log(`${gameState.state}`)
    }
}

const runner = new AutoGameRunner(options, stateChangeCallback);

runner.start()
    .then(
        winnerIdx => console.log(`Gra zakończona. Wygrał gracz ${winnerIdx}`)
    )