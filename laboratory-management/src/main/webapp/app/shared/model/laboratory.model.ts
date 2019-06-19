import { IEquipment } from 'app/shared/model/equipment.model';

export interface ILaboratory {
  id?: any;
  no?: any;
  name?: string;
  location?: string;
  equipments?: any;
}

export const defaultValue: Readonly<ILaboratory> = {
  id: '',
  no: '',
  name: '',
  location: '',
  equipments: [] as ReadonlyArray<IEquipment>
};
