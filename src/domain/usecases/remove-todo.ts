export interface RemoveTodo {
  invoke(id: number): Promise<void>;
}
