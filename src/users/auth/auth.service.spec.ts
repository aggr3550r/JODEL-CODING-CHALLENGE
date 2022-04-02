import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { User } from "../entities/user.entity";
import { UsersService } from "../users.service"


describe ( "AuthService", () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;


    beforeEach( async () => {
    // Create a fake copy of the users service
    fakeUsersService = {
        find: () => Promise.resolve([]),
        create: (email: string, password: string) => Promise.resolve({id: 1, email, password} as User)
    }
    //Creates a new DI container
    const module = await Test.createTestingModule({
        providers: [
            AuthService,
            {
                //Provide the dependency needed by the AuthService
                provide: UsersService,
                useValue: fakeUsersService
            }
        ]
    }).compile();
    //Retrieve an instance of the AuthService from the DI container
    service = module.get(AuthService);
});

it('can create an instance of auth service', () => {
    //Test to ensure that the instance is properly defined
    expect(service).toBeDefined();
});

it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup("victor@yahoo.com", "killshot");
    
    expect(user.password).not.toEqual("killshot");
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
});

it('it throws an error if a user signs up with an email that is in use', async () => {
    fakeUsersService.find = () => Promise.resolve([{id: 1, email: 'a', password: '1'} as User]);
    try {
        await service.signup('victor@yahoo.com', 'killshot');
    } catch (error) {
    }
});
});