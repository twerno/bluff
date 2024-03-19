import { IStateTransition, IStateTransitionProps } from "./BluffStateEngineTransitionTypes";
import { gameEngineHelper } from "./GameEngineHelper";

export const bluffStateEngineTransitions: IStateTransition[] = [
    {
        currentState: 'NEW_GAME', nextState: 'NEW_ROUND', makeTransition: newRoundTransition
    },
    {
        currentState: 'NEW_ROUND', nextState: 'WAITING_FOR_PLAYER_MOVE', makeTransition: waitingForPlayerTransition
    },
    {
        currentState: 'WAITING_FOR_PLAYER_MOVE', nextState: 'PLAYER_MOVE_BID', makeTransition: playerMoveBidTransition
    },
    {
        currentState: 'PLAYER_MOVE_BID', nextState: 'WAITING_FOR_PLAYER_MOVE', makeTransition: waitingForPlayerTransition
    },
    {
        currentState: 'WAITING_FOR_PLAYER_MOVE', nextState: 'PLAYER_MOVE_CHALLENGE', makeTransition: playerMoveChallangeTransition
    },
    {
        currentState: 'PLAYER_MOVE_CHALLENGE', nextState: 'END_ROUND'
    },
    {
        currentState: 'END_ROUND', nextState: "END_GAME"
    },
    {
        currentState: 'END_ROUND', nextState: "NEW_ROUND", makeTransition: newRoundTransition
    }
]

function newRoundTransition({ options, gameState, boardState }: IStateTransitionProps) {
    const newBoardState = gameEngineHelper.initBoardState(options, gameState);
    boardState.bidHistory = newBoardState.bidHistory;
    boardState.diceValues = newBoardState.diceValues;
}

function playerMoveBidTransition({ gameState, boardState, move, options }: IStateTransitionProps) {
    if (move?.type !== "bid") {
        throw new Error(`Oczekiwany ruchu "BID"`);
    }
    boardState.bidHistory.push(move.bid);
}

function playerMoveChallangeTransition({ gameState, boardState, move }: IStateTransitionProps) {
    if (move?.type !== "challenge") {
        throw new Error(`Oczekiwany ruchu "challenge"`);
    }

    if (boardState.bidHistory.length === 0) {
        throw new Error(`${move.type} nie jest legalnym ruchem. Żaden gracz nie licytował.`);
    }

    // TODO naiwna implementacja, wszyscy poza aktywnym graczem tracą jedną kość 
    gameState.playerDicesCount = gameState.playerDicesCount
        .map(
            (val, idx) => idx === gameState.activePlayerIdx
                ? val
                : Math.max(val - 1, 0)
        );
}

function waitingForPlayerTransition({ prevState, gameState, options }: IStateTransitionProps) {
    gameState.activePlayerIdx = prevState === "NEW_ROUND"
        ? gameEngineHelper.firstPlayerIdx(options, gameState)
        : gameEngineHelper.nextPlayerIdx(options, gameState);
}