import { User } from '../../models/user.model';
import { users } from '../static-data';

describe('User Model Test', () => {
  it('Return All Users', async () => {
    const users = await User.find();

    expect(users).toBeDefined();
  });

  it('Return Specific User', async () => {
    const users = await User.find();
    const user = await User.findById(users[0].id);

    expect(user.id).toEqual(users[0].id);
    expect(user.email).toEqual('test1@test.com');
    expect(user).toBeDefined();
  });

  it('Insert User', async () => {
    const userData = {
      first_name: 'test3',
      last_name: 'test3',
      email: 'test3@test.com',
      password: 'test3',
    };

    const user = await User.insert({ ...userData });

    expect(user.email).toEqual('test3@test.com');
    expect(user).toBeDefined();
  });

  it('Find User By Email', async () => {
    const { email } = users[1];
    const existingUser = await User.findByEmail(email);

    expect(existingUser.email).toEqual('test2@test.com');
    expect(existingUser).toBeDefined();
  });
});
