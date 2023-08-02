import * as bcrypt from 'bcrypt';

export default class BcryptUtils {
  private static saltRounds = 10;
  public static genHash(password: string): string {
    return bcrypt.hashSync(password, this.saltRounds);
  }
  public static compare(password: string, encrypted: string): boolean {
    return bcrypt.compareSync(password, encrypted);
  }
}
