import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SseService {

  constructor() { }

  getEventSource(): EventSource {
    return undefined;
  }
}
