import connectionSource from '@/datasource';
import { User } from '@/entities/user.entity';
import { encrypt } from '@/utils/passwordEncription';
import boom, { notFound } from '@hapi/boom';

const userRepository = connectionSource.getRepository(User);

export async function createUser({name, email, password}:{name: string, email: string, password: string}): Promise<Partial<User>> {
  const user = userRepository.create({
    name,
    email,
    password: await encrypt(password)
  });
  const {password:createdPassword, ...createdUser} = await userRepository.save(user);
  return createdUser;
   
}

export async function getUserById(id: string): Promise<User> {
  const user = await userRepository.findOne({where: {
    id
  }});
  if (!user) throw notFound(`There's no user with id ${id}`);
  return user;
}

export const getUserByEmail = async (email:string, includePassword:boolean = false): Promise<User> => {
  const user = await userRepository.findOne({
    where: {
      email
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: includePassword
    }
  });
  if (!user) throw notFound(`There's no user with email ${email}`);
  return user;
}

export async function deleteUserById(id: string): Promise<void> {
  await userRepository.delete(id);
}

export async function updateUser(id: string, updates: Partial<User>): Promise<Partial<User>> {
  const user = await getUserById(id);
  Object.assign(user, updates);
  const {password, ...updatedUser} = await userRepository.save(user);
  return updatedUser;
}



