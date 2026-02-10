export interface IAbstractCrud<T> {
  findAll(search?: string): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(entity: T): Promise<T>;
  update(id: string, entity: T): Promise<T>;
}
