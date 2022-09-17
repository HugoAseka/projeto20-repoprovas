import { prisma } from "../config/database";

export async function getAllTerms(){
    return await prisma.terms.findMany();
}

