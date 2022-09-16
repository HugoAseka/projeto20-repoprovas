import { prisma } from "../config/database";
import { teachersDisciplines } from "@prisma/client";

type typeNewTeacherDiscipline = Omit<teachersDisciplines,"id"> ;

export async function findTeacherDisciplineByIds(teacherId:number,disciplineId:number){
    return await prisma.teachersDisciplines.findMany({where:{teacherId,disciplineId}})
}