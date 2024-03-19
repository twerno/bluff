import { IBluffMove, IBoardState, IGameOptions, IGameState } from "../gameEngine/IGameStateTypes";

export type INextMoveProps = {
    boardState: IBoardState,
    gameState: IGameState,
    gameOptions: IGameOptions
}

export type IPlayerAdapter = {
    init(): Promise<void>;

    nextMove(props: INextMoveProps): Promise<IBluffMove>;
}