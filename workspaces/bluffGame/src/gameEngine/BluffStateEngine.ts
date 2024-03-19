import { FStateTransition, FStateTransitionCallback, IStateTransition, IStateTransitionProps } from "./BluffStateEngineTransitionTypes";
import { gameEngineHelper } from "./GameEngineHelper";
import { IBluffGameStates, IBluffMove, IBoardState, IGameOptions, IGameState } from "./IGameStateTypes";

export class BluffStateEngine {

    private boardState: IBoardState;
    private gameState: IGameState;

    public constructor(
        private readonly options: Readonly<IGameOptions>,
        private stateTransitions: IStateTransition[],
        private stateTransitionCallback: FStateTransitionCallback,
    ) {
        this.boardState = gameEngineHelper.createBlankBoardState(options);
        this.gameState = gameEngineHelper.createGameState(options);
    }

    public changeState(nextState: IBluffGameStates, move?: IBluffMove) {

        const transition = this.stateTransitions
            .find(item => item.currentState === this.gameState.state && item.nextState === nextState);

        if (transition == null) {
            throw new Error(`Przejście "${this.gameState.state}" => "${nextState}" nie jest zdefiniowane.`)
        }

        const props: IStateTransitionProps = {
            boardState: this.boardState,
            gameState: this.gameState,
            options: this.options,
            move,
            prevState: transition.currentState,
            currentState: transition.nextState
        };
        transition.makeTransition && transition.makeTransition(props);
        this.gameState.state = transition.nextState;
        this.stateTransitionCallback({
            prevState: transition.currentState,
            currentState: transition.nextState,
            boardState: this.boardState,
            gameState: this.gameState,
            move
        });
    }


    public getBoardState(): IBoardState {
        return this.boardState;
    }

    public getGameState(): IGameState {
        return this.gameState;
    }
}
