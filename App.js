// scraper.js
require('dotenv').config(); 
const axios = require('axios');
const cheerio = require('cheerio');
const sendEmail = require('./SendEmail');

const url = 'https://www.espn.com.br/nba/';

async function fetchNews() {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const noticias = [];

    $('.contentItem__title').each((i, el) => {
        const titulo = $(el).text().trim();
        const link = $(el).closest('a').attr('href');
        noticias.push({
            titulo,
            link: link ? `https://www.espn.com.br${link}` : ""
        });
    });

    return noticias;
}

async function main() {
    const destinatario = 'erickcoliveira@edu.pe.senac.br';
    const noticias = await fetchNews();
    await sendEmail(destinatario, noticias);
}

main();
