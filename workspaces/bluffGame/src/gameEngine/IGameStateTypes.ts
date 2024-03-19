import { IPlayerAdapter } from "../playerAdapter/IPlayerAdapter"

export type IBoardState = {
    /** 
     * wyniki rzutów kości graczy
     * 
     * gracz wyeliminowany ma pustą tablicę
     */
    diceValues: number[][]

    /**
     * licytacje w obecnej rundzie
     */
    bidHistory: IPlayerBid[]
}


export type IPlayerBid = {
    /** identyfikator gracza */
    playerIdx: number,

    /** wybrana kostka */
    pickedDice: number,

    /** zgadywana ilość kostek */
    guessedCount: number
}


export type IGameOptions = {
    /** 
     * typ kostki - domyślnie k6 
     */
    diceType: number

    /** 
     * gracze biorący udział w grze
     */
    players: IPlayerAdapter[]
}

export type IGameState = {
    /**  
     * index aktywnego gracza, liczony od 0
     * 
     * gracz wyeliminowany nie może być graczem aktywnym
     */
    activePlayerIdx: number

    /**  
     * ilość kości będąca w posiadaniu gracza
     *
     * gracze posiadający 0 kości są wyeliminowani
     */
    playerDicesCount: number[]

    /**
     * stan, w którym znajduje się gra
     */
    state: IBluffGameStates;
}

export type IBluffGameStates = "NEW_GAME" | "END_GAME" | "END_ROUND" | "NEW_ROUND" | "WAITING_FOR_PLAYER_MOVE" | "PLAYER_MOVE_BID" | "PLAYER_MOVE_CHALLENGE";

/**
 * ruchy rozpoznawane przez BluffGameEngine
 */
export type IBluffMove = { type: "bid", bid: IPlayerBid }
    | { type: "challenge" };
