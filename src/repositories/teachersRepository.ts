import { prisma } from "../config/database";


export async function findTeacherByName(name:string){
    return await prisma.teachers.findUnique({where:{name}})
};
