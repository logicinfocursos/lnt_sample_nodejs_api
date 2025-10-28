
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
    const moviesPath = path.resolve(__dirname, '../movies.json');
    const moviesRaw = fs.readFileSync(moviesPath, 'utf-8');
    const movies = JSON.parse(moviesRaw);
    await prisma.movie.createMany({ data: movies });
    console.log(`${movies.length} filmes inseridos com sucesso!`);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
