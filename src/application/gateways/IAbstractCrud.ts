export interface IAbstractCrud<T> {
  findAll(search?: string): Promise<T[]>;
  create(entity: T): Promise<T>;
  update(id: string, entity: T): Promise<T>;
}
