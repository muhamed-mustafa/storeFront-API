import { Context } from './database-context';
import { User } from '../models/user.model';
import { Product } from '../models/product.model';
import { users, products } from './static-data';

beforeAll(async () => {
  await Context.build();

  for (let i = 0; i < 3; i++) {
    await User.insert({ ...users[i] });
    await Product.insert({ ...products[i] });
  }
});

afterAll(async () => await Context.destroy());
