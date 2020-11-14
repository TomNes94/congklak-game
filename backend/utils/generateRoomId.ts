import { customAlphabet } from "nanoid";

export default function generateRoomId() {
    const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 6);
    return nanoid();
}
