const puppeteer = require('puppeteer')

module.exports = {
  loadQuokaList: async function () {
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
}
