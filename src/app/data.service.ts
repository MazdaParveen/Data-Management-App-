// src/app/data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataEntry } from './data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataEntriesSubject = new BehaviorSubject<DataEntry[]>([]);
  dataEntries$ = this.dataEntriesSubject.asObservable();

  addDataEntry(entry: DataEntry): void {
    const currentEntries = this.dataEntriesSubject.getValue();
    this.dataEntriesSubject.next([...currentEntries, entry]);
  }
}
export { DataEntry };

