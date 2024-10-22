export class RuralProducer {
  constructor(
    public id: string,
    public name: string,
    public cpfCnpj: string,
    public farmName: string,
    public totalArea: number,
    public agriculturalArea: number,
    public vegetationArea: number,
    public createdAt: Date,
    public updatedAt: Date,
    public crops?: string[],
  ) {}
}
