var express = require('express');
const puppeteer = require('puppeteer')
var app = express();

app.get('/quoka', function (req, res) {
    loadQuokaList()
        .then(x => {
            res.send(x);
        })
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

async function loadQuokaList() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.quoka.de/')

    await page.evaluate(() => {
        document.querySelector('#search1').value = '3 Zimmerwohnung'
        document.querySelector('#city').value = 'Coburg'
        document.querySelector('#searchbutton').click()
    })

    await page.waitForNavigation()

    const result = await page.evaluate(() =>
        Array.from(document.querySelectorAll('div.q-col div.description'))
            .map(x => x.innerHTML.trim()))

    await browser.close()

    return result;
}
