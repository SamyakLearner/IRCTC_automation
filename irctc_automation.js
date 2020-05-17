let puppeteer = require("puppeteer");
let from =  process.argv[2];
let to = process.argv[3];
let date = process.argv[4];
(async function () {
    // browser open => visible 
    try {
        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,

            args: ["--incognito", "--start-maximized", "--disable-notifications"]
        });

        let pages = await browser.pages();
        let page = pages[0];
        await page.goto("https://www.irctc.co.in/nget/train-search")

        await page.waitFor(2000)
        await page.waitForSelector(".btn.btn-primary", { waitUntil: "networkidle2" });
        let buttons = await page.$$(".btn.btn-primary")
        let button = buttons[0]
        await button.click({ delay: 100 })

        // FROM
        await page.waitForSelector("[placeholder='From*']")
        await page.type("[placeholder='From*']", from, { delay: 120 })
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        //TO
        await page.waitForSelector("[placeholder='To*']")
        await page.type("[placeholder='To*']", to, { delay: 120 })
        await page.waitFor(1000);
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        // Date
        await page.waitForSelector("[placeholder='Journey Date(dd-mm-yyyy)*']")
        let input = await page.$("[placeholder='Journey Date(dd-mm-yyyy)*']");
        await input.click({ clickCount: 3 })
        await page.type("[placeholder='Journey Date(dd-mm-yyyy)*']", date, { delay: 120 })
        await page.keyboard.press('Enter');
        //   //click on Find Train
       
        await page.waitForSelector(".search_btn");
        let elements = await page.$$(".search_btn");
        // console.log(elements.length);
        let element = elements[1]
        await element.click()
        //find number of trains
        await page.waitForSelector(".train_avl_border_div");
        let trains = await page.$$(".train_avl_border_div");
        // console.log(trains.length);


    }
    catch (err) {
            console.log(err);
        }

    }) ();