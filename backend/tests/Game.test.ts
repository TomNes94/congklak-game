import { Game } from "../models/Game";
import { GameState, PlayerState } from "../models/GameState";

jest.mock("../models/GameState");

test("If game instance is correctly constructed", () => {
    const game = new Game("foo", "123asd", true);
});
