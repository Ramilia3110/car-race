export interface CarModel {
  id: number;
  name: string;
  color: string;
}
export interface EngineResponse {
  id: number;
  status: "started" | "stopped";
  distance: number;
  velocity: number;
}

export interface DriveMode {
  id: number;
  status: "drive";
  success: true;
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
}
