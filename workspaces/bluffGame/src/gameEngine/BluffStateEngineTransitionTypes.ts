import { IBluffGameStates, IBluffMove, IBoardState, IGameOptions, IGameState } from "./IGameStateTypes";

export type IStateTransition = {
    currentState: IBluffGameStates,
    nextState: IBluffGameStates,
    makeTransition?: FStateTransition,
}

export type IStateTransitionCallbackProps = {
    prevState: IBluffGameStates,
    currentState: IBluffGameStates,
    boardState: IBoardState,
    gameState: IGameState,
    move?: IBluffMove
}
export type FStateTransitionCallback = (props: IStateTransitionCallbackProps) => void;

export type IStateTransitionProps = {
    options: Readonly<IGameOptions>,
    boardState: IBoardState,
    gameState: IGameState,
    move?: IBluffMove,
    prevState: IBluffGameStates,
    currentState: IBluffGameStates,
}
export type FStateTransition = (props: IStateTransitionProps) => void;