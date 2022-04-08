import { ObjectID } from "src/types/object-id.type";

export abstract class IGenericRepository<T> {
    abstract find(id: ObjectID): Promise<T | any>;
    abstract findOne(id: ObjectID): Promise<T | any>;
}