import { IBoardState, IGameOptions, IGameState } from "./IGameStateTypes"
import { utils } from "../utils/utils"

export const gameEngineHelper = {
    createBlankBoardState,
    createGameState,
    initBoardState,
    nextPlayerIdx,
    isGameFinished,
    firstPlayerIdx
}

/**
 * tworzy pusty IBoardState
 * @param options 
 * @returns pusty IBoardState
 */
function createBlankBoardState(options: IGameOptions): IBoardState {
    return {
        diceValues: [],
        bidHistory: []
    }
}


/**
 * przygotowauje stan gry do rozpoczęcia rundy - losuje rzuty kośćmi dla każdego z graczy
 */
function initBoardState(options: IGameOptions, gameState: IGameState): IBoardState {
    // rzut kostkami dla każdego gracza
    const diceValues = gameState.playerDicesCount
        .map(
            diceCount => [...Array(diceCount)]
                .map(_ => utils.getRandomInt(1, options.diceType))
        )

    return {
        bidHistory: [],
        diceValues
    }
}

/**
 * tworzy nowy gameState
 * @param options 
 * @returns 
 */
function createGameState(options: IGameOptions): IGameState {
    return {
        activePlayerIdx: 0,
        playerDicesCount: options.players.map(_ => 6),
        state: "NEW_GAME"
    }
}

/**
 * zwraca identyfikator kolejnego gracza w kolejce
 * @param options 
 * @param gameState 
 * @returns 
 */
function nextPlayerIdx(options: IGameOptions, gameState: IGameState): number {
    for (let i = gameState.activePlayerIdx + 1; i < gameState.playerDicesCount.length; i++) {
        if (gameState.playerDicesCount[i] > 0) {
            return i;
        }
    }
    return firstPlayerIdx(options, gameState);
}

/**
 * zwraca identyfikator pierwszego gracza
 * @param options 
 * @param gameState 
 * @returns 
 */
function firstPlayerIdx(options: IGameOptions, gameState: IGameState): number {
    return gameState.playerDicesCount.findIndex(v => v > 0);
}

/**
 * test czy gra jest zakończona
 * @param gameState 
 * @returns 
 */
function isGameFinished(gameState: IGameState): boolean {
    const activePlayers = gameState.playerDicesCount.filter(v => v > 0);
    return activePlayers.length <= 1;
}