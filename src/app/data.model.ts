// src/app/data.model.ts
export interface DataEntry {
  datetime: Date;
  temperature: number;
   humidity?: number;
  pressure?: number;
}
