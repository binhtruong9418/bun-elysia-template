import {Elysia} from "elysia";
import {Repository} from "typeorm";
import {User} from "../entities";
import {AppDataSource} from "../data-source";
import * as bycrypt from 'bcrypt'
import {AppRole} from "../types";

class UserService {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async register(body: { email: string, password: string}) {
    const existUser = await this.userRepository.findOneBy({email: body.email});
    if (existUser) {
      throw new Error('User already exists')
    }
    const user = new User();
    user.role = AppRole.USER;
    user.email = body.email;
    //hash password
    user.password = bycrypt.hashSync(body.password, 10);
    //delete password before return
    const {password, ...result} = await this.userRepository.save(user);
    return result;
  }

  async login(body: { email: string, password: string }, jwt: any) {
    const user = await this.userRepository.findOneBy({email: body.email});
    if (!user) {
      throw new Error('User not found')
    }
    if (!bycrypt.compareSync(body.password, user.password)) {
      throw new Error('Password is incorrect')
    }
    const token = await jwt.sign({id: user.id, email: user.email, role: user.role});
    const {password, ...result} = user;
    return {
      jwt: token,
      user: result,
    }
  }

  async getUserById(id: number) {
    return await this.userRepository.find()
  }
}

export default new Elysia()
  .decorate('userService', new UserService())