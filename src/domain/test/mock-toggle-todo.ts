import faker from 'faker';

import { ToggleTodo } from '@/domain/usecases';

export class ToggleTodoSpy implements ToggleTodo {
  id: number;
  callsCount = 0;
  completed = faker.random.boolean();

  invoke(id: number): Promise<boolean> {
    this.id = id;
    this.callsCount++;
    return Promise.resolve(this.completed);
  }
}
