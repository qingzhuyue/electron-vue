/*
 * @Author: duxinyues yongyuan253015@gmail.com
 * @Date: 2023-08-03 08:59:21
 * @LastEditors: duxinyues yongyuan253015@gmail.com
 * @LastEditTime: 2023-11-22 23:30:56
 * @FilePath: /electron-vue/electron-preload/preload.ts
 * @Description:
 * Copyright (c) 2023 by ${duxinyues} email: ${yongyuan253015@gmail.com}, All Rights Reserved.
 */
/*
 * 预加载脚本
 */
import {contextBridge, ipcRenderer, IpcRendererEvent} from 'electron';

contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: {
        selectDate: (date: string) => {
            return ipcRenderer.invoke('selectDate', date)
        },
        returnInfo: (callback: Function) => ipcRenderer.on('returnInfo', (e: IpcRendererEvent, param) => {
            callback(param)
        }),
        openFile: () => ipcRenderer.invoke('openFile'),
        getAppVersion: (callback: any) => ipcRenderer.on('versionInfo', (e: IpcRendererEvent, data: any) => {
            callback(data)
        }),
        getFilePath: (callback: any) => ipcRenderer.on('filePath', (e, data) => {
            callback(data)
        }),
        getFileContent: (callback: any) => ipcRenderer.on('fileContent', (event, data) => callback(data))
    },
});
