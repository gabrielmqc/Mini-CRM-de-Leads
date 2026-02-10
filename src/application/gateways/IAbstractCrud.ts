export interface IAbstractCrud<T> {
  findAll(search?: string): Promise<T[]>;
  create(entity: T): Promise<void>;
  update(entity: T, id: string): Promise<void>;
}
