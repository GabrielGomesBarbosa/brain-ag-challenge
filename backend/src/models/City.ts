import { State } from './State'

export class City {
  constructor(
    public id: string,
    public name: string,
    public ibge: string,
    public latLong: string,
    public latitude: number,
    public longitude: number,
    public tomCode: number,
    public state: State,
  ) {}
}
