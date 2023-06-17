import bcrypt from 'bcrypt'
export const hashingPassword = async (pass) => {
    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(pass, saltRounds)
    return hashedPass;
}

export const verifyPassword = async (pass,hashPass)=>{
    const result = await bcrypt.compare(pass,hashPass)
    return result
}