type IpcHandler<ReturnType = void, Args = []> = {
    args: Args;
    return: ReturnType;
};

export type IpcHandlers = {
    ipc: IpcHandler;
};
