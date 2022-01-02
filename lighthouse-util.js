import puppeteer from "puppeteer";
import lighthouse from "lighthouse";

export function createBrowser() {
    return puppeteer.launch({
        args: ["--show-paint-rects"] // Required by lighthouse
    });

}

const config = require('./node_modules/lighthouse/lighthouse-core/config/lr-desktop-config');

export function createReportWithBrowser(browser, url, options = { output: "html" }) {
    const endpoint = browser.wsEndpoint(); // Allows us to talk via DevTools protocol
    const endpointURL = new URL(endpoint); // to get the port
    
    return lighthouse(url, {
        port: endpointURL.port,
        disableDeviceEmulation: true,
        chromeFlags: ['--disable-mobile-emulation', '--disable-storage-reset']
    }, config);

}