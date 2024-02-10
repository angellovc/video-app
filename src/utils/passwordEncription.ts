import bcrypt from 'bcryptjs';


export const encrypt = async (str:string) => {
  return await bcrypt.hash(str,10);
}

export const isPassword = async (rawPassword:string, encryptedPassword:string) => {
  return bcrypt.compare(rawPassword, encryptedPassword);
}
