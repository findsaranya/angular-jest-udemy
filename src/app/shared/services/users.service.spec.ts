import { UserInteface } from '../types/user.interface';
import { UsersService } from './users.service';
import { TestBed } from '@angular/core/testing';
import { UtilsService } from './utils.service';
jest.mock("./utils.service.ts");
describe('UsersService', () => {
  let usersService: UsersService;
  let utilService : UtilsService;
  let utilMockService = {
    pluck : jest.fn()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService,
        //UtilsService,
        {
        provide:UtilsService,
        useValue:utilMockService
      }],
    });

    usersService = TestBed.inject(UsersService);
    utilService = TestBed.inject(UtilsService);
  });

  it('creates a service', () => {
    expect(usersService).toBeTruthy();
  });

  describe('addUser', () => {
    it('should add a user', () => {
      const user: UserInteface = {
        id: '3',
        name: 'foo',
      };
      usersService.addUser(user);
      expect(usersService.users).toEqual([{ id: '3', name: 'foo' }]);
    });
  });

  describe('removeUser', () => {
    it('should remove a user', () => {
      usersService.users = [{ id: '3', name: 'foo' }];
      usersService.removeUser('3');
      expect(usersService.users).toEqual([]);
    });
  });

  describe("getUserNames()",() => {
    it("return usernames",() => {
     // const spyOn = jest.spyOn(utilService,'pluck').mockImplementation(() => ['foo','bar']);
     utilMockService.pluck.mockReturnValue(["foo"])
      const names = usersService.getUsersName();
      //expect(names).toEqual(['foo','bar']);
      expect(names).toEqual(["foo"]);
     // expect(names.length).toBe(2);
    // spyOn.mockClear();
     // const name1 = usersService.getUsersName();
     // expect(name1.length).toBe(0);
    })
  })
});
