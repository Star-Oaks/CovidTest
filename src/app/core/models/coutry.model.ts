import { Province } from './province.model';

export interface Coutnry {
  country: string;
  date: string;
  latitude: number;
  longitude: number;
  provinces: Array<Province>;
}
