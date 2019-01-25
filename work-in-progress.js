var puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.quoka.de/')

    await page.evaluate(() => {
        document.querySelector('#search1').value = '3 Zimmerwohnung'
        document.querySelector('#city').value = 'Coburg'
        document.querySelector('#searchbutton').click()
    })

    await page.waitForNavigation()

    await page.evaluate(() => {
        Array.from(document.querySelectorAll('div.cnt ul.m-tpls a'))
            .find(x => x.innerText.trim() === 'nur Angebote')
            .click()
    })

    await page.waitForNavigation()

    const results = await page.evaluate(() =>
        Array.from(document.querySelectorAll('div.q-col.n2'))
            .map(x => {
                return x
            }))

    console.log(results)

    await browser.close()
})()
