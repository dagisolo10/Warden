import { electronApp, optimizer } from "@electron-toolkit/utils";
import { registerIpcHandlers } from "@main/ipc/registration";
import { createWindow } from "@main/window/main";
import { app, BrowserWindow, dialog } from "electron";

// function createWindow(): void {
//     // Create the browser window.
//     const mainWindow = new BrowserWindow({
//         width: 900,
//         height: 670,
//         show: false,
//         autoHideMenuBar: true,
//         ...(process.platform === "linux" ? { icon } : {}),
//         webPreferences: {
//             preload: join(__dirname, "../preload/index.js"),
//             sandbox: false,
//         },
//     });
//     mainWindow.on("ready-to-show", () => {
//         mainWindow.show();
//     });
//     mainWindow.webContents.setWindowOpenHandler((details) => {
//         shell.openExternal(details.url);
//         return { action: "deny" };
//     });
//     // HMR for renderer base on electron-vite cli.
//     // Load the remote URL for development or the local html file for production.
//     if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
//         mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
//     } else {
//         mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
//     }
// }
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

let mainWindow: BrowserWindow | null = null;

export function getMainWindow() {
    return mainWindow;
}

process.on("unhandledRejection", (reason) => dialog.showErrorBox("Unhandled Rejection", String(reason)));
process.on("uncaughtException", (error) => dialog.showErrorBox("Main Process Error", error.stack || error.message));

app.whenReady().then(async () => {
    electronApp.setAppUserModelId("com.warden.app");

    app.on("browser-window-created", (_, window) => optimizer.watchWindowShortcuts(window));
    registerIpcHandlers();

    createAndCloseWindow();

    app.on("activate", () => BrowserWindow.getAllWindows().length === 0 && createAndCloseWindow());
});

app.on("window-all-closed", () => process.platform !== "darwin" && closeWindow());

function createAndCloseWindow() {
    mainWindow = createWindow();

    if (mainWindow) {
        mainWindow.on("closed", closeWindow);
    }
}

function closeWindow() {
    app.quit();
    mainWindow = null;
}
