import { Password } from '../../services/Password.service';

describe('Password Services Test', () => {
  let password: string;
  it('Convert Plain text Password to Hash Password', async () => {
    password = await Password.toHash('test@test*');

    expect(password).toBeDefined();
  });

  it('Compare Stored Password and Supplied Password', async () => {
    const matchedPassword = await Password.compare(
      String(password),
      'test@test*'
    );

    expect(matchedPassword).toBeTrue();
  });
});
