import { Injectable, NotFoundException } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>){}

   async create(email: string, password:string, username:string){
        const user =  await this.UserModel.create({email, password, username});

        return user.save();
    }

    async find(email: string) {
        return await this.UserModel.find({email}).exec();
    }

    async findOne(id: mongoose.Types.ObjectId) {
        if(!id){
            return null;
        }
        return await this.UserModel.findById(id).exec();
    }

    // async update(id: number, body: UpdateUserDTO){
    //     const user = await this.repo.findOne(id);
    //     if (!user) {
    //         throw new NotFoundException("User not found");
    //     }

    //     Object.assign(user, body);
    //     return this.repo.save(user); 
    // }

//     async remove(id: number){
//         const user = await this.UserModel.findOne(id);
//         if(!user){
//             throw new NotFoundException("User does not exist");
            
//         }
//         return this.UserModel.remove(user);
//     }
}
