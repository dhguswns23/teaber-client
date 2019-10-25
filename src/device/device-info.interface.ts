import { DeviceType } from './device-type.enum';

export interface DeviceInfo {
    type: DeviceType;
    name: string;
    com: string;
}
