import { Model } from 'mongoose';
import { ObjectID } from 'src/types/object-id.type';
import { IGenericRepository } from './generic-repository.abstract';


export class MongoGenericRepository<T> implements IGenericRepository<T> {
    private _repository: Model<T>;
    private _populateOnFind: string[];

    constructor(repository: Model<T>, populateOnFind: string[] = []) {
        this._repository = repository;
        this._populateOnFind = populateOnFind;
    }

    find(id: ObjectID): Promise<T | any> {
       return this._repository.find({id}).populate(this._populateOnFind).exec();
    }

    findOne(id: ObjectID): Promise<T | any> {
        return this._repository.findById(id).populate(this._populateOnFind).exec()
    }
}