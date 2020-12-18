export interface EventDto {
  Id: number;
  Name: string;
  Description: string;
  isActive: boolean;
}

export class AddEventBindingModel {
  Id: number;
  Name: string;
  Description: string;
}
