export interface IEmergency {
  emergencyId: string;
  requestTime: string;
}

export interface IDevice {
  serialNumber: string;
}

export interface IHolder {
  firstName: string;
  lastName: string;
}

export interface IUserResponse {
  emergency: IEmergency;
  device: IDevice;
  holder: IHolder;
}

export interface IResponse {
  content: IUserResponse[];
}

export interface IUser {
  id: string;
  emergencyTime: string;
  deviceSN: string;
  name: string;
}
