import { IpcHandlers } from "@shared/types/ipc-handlers";
import { ipcMain } from "electron";

type IpcHandleListener<Channel extends keyof IpcHandlers> = (...args: IpcHandlers[Channel]["args"]) => IpcHandlers[Channel]["return"] | Promise<IpcHandlers[Channel]["return"]>;

function handleIpc<Channel extends keyof IpcHandlers>(channel: Channel, listener: IpcHandleListener<Channel>) {
    ipcMain.handle(channel, async (_event, ...args: IpcHandlers[Channel]["args"]) => listener(...args));
}

export function registerIpcHandlers() {
    handleIpc("ipc", () => {});
}
