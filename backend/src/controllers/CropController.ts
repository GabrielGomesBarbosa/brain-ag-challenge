import { Request, Response } from 'express';

import { CreateCropUseCase } from '../useCases/crop/CreateCropUseCase';
import { UpdateCropUseCase } from '../useCases/crop/UpdateCropUseCase';
import { DeleteCropUseCase } from '../useCases/crop/DeleteCropUseCase';
import { FilterCropsUseCase } from '../useCases/crop/FilterCropsUseCase'; 
import { FindByIdCropUseCase } from '../useCases/crop/FindByIdCropUseCase';

export class CropController {
  constructor(
    private createCropUseCase: CreateCropUseCase,
    private findByIdCropUseCase: FindByIdCropUseCase,
    private updateCropUseCase: UpdateCropUseCase,
    private deleteCropUseCase: DeleteCropUseCase,
    private filterCropsUseCase: FilterCropsUseCase // Inject the new use case
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const crop = await this.createCropUseCase.execute(req.body.name);
      return res.status(201).json(crop);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async read(req: Request, res: Response): Promise<Response> {
    try {
      const crop = await this.findByIdCropUseCase.execute(req.params.id);
      return res.json(crop);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const crop = await this.updateCropUseCase.execute(req.params.id, req.body.name);
      return res.json(crop);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      await this.deleteCropUseCase.execute(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  async filter(req: Request, res: Response): Promise<Response> {
    try {
      const { filterCriteria, skip, take } = req.body;
      const crops = await this.filterCropsUseCase.execute(filterCriteria, skip, take);
      return res.json(crops);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
