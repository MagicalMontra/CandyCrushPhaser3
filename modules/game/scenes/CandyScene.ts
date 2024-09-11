import { BaseScene } from "./BaseScene";

const SCENE_KEY = "CandyScene";

const BOARD_CONFIG =
{
    width: 8,
    height: 8
}

type BoardSlotState =
{
    Empty: 0,
    Red: 1,
    Green: 2,
    Blue: 3,
    Purble: 4,
    Yellow: 5,
    Orange: 6,
    HoriRocket: 7,
    VertRocket: 8,
}

type BoosterType =
{
    HoriRocket: 7,
    VertRocket: 8,
}

type GemType =
{
    Red: 1,
    Green: 2,
    Blue: 3,
    Purble: 4,
    Yellow: 5,
    Orange: 6,
}

export class CandyScene extends BaseScene
{
    private boardData: BoardSlotState[];

    constructor() {
        super(SCENE_KEY);

        this.ConstructBoard();
    }

    protected override OnPreload(): void {
        
    }

    private ConstructBoard(): void
    {
        this.boardData = [];

        for (let i = 0; i < BOARD_CONFIG.width * BOARD_CONFIG.height; i++)
        {
            this.boardData[i] = 
        }
    }
}