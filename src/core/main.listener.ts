import ipcMain = Electron.ipcMain;
import { DeviceInfo } from '../device/device-info.interface';
import { RendererEvent } from './renderer-event.enum';
import { MainEvent } from './renderer.listener';
import BrowserWindow = Electron.BrowserWindow;
import * as serialport from 'serialport';

export const UART_BAUD_RATE = 115200;

export class MainListener {
    public devices: Array<DeviceInfo> = [];
    public ports: Array<serialport.SerialPort> = [];

    constructor(
        public window: BrowserWindow
    ) { }

    public startListen(): void {
        ipcMain.on(RendererEvent.GET_DATA, (event) => {

        });
        ipcMain.on(RendererEvent.GET_DEVICE_LIST, (event) => {
            serialport.list((err, ports: Array<Object>) => {
                const deviceCandidates = ;
                event.sender.send(MainEvent.GET_DEVICE_LIST, deviceCandidates);
            });
        });
        ipcMain.on(RendererEvent.SET_DEVICE, (event, device: DeviceInfo) => {
            this.addDevice(device);
        });
    }

    private addDevice(device: DeviceInfo): void {
        this.devices.push(device);
        const port = new serialport.SerialPort(device.com, {
            baudRate: UART_BAUD_RATE,
        });
        port.on('data', data => {
            this.window.webContents.send(data);
        });
        this.ports.push(port);
    }
}
