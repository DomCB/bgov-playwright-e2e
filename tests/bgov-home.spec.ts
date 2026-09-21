import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => { 
  // Go to the bgov home page
  await page.goto('https://bettergov.ph/', { waitUntil: 'domcontentloaded' });

}); //waitUntil: 'domcontentloaded' is used to wait for the DOM content to be loaded before proceeding with the test. This ensures that the page is fully loaded and ready for interaction before any assertions or actions are performed.


test('TC#1: bgov home page', async ({ page }) => {

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/BetterGov.ph/);
  //expect heading to be visible
  await expect(page.getByRole('heading', { name: 'BetterGov.ph' })).toBeVisible();
});




test('TC2: direct to NBI clearance website using searchbar of BGov home page', async ({ page, context }) => { //added context for the tab switching

  //Test data
const SEARCH_TERM = 'Apply for NBI Multiple Clearance'; //Test data for the search term to be used in the search bar


const searchBar = page.getByPlaceholder('Search for services, directory items...');
 // Method 1: Click the search bar and fill in the search term using getByPlaceholder method

    await searchBar.fill(SEARCH_TERM);
 //Methods
    // Method 2: Click the search bar and fill in the search term using getByRole method
    //await page.getByRole('searchbox', {disabled: false}).fill('Apply for NBI Multiple Clearance');
   
 // Method 3: using locator
    //Selector Techniques:
    //1. by id (html attribute)
    //2. by class (html attribute)
      //await page.locator('.ais-SearchBox-input').fill('Apply for NBI Multiple Clearance');
    //3. by css chaining
      //await page.locator('.ais-SearchBox-input.w-full.p-3.pl-10.border.border-gray-300.rounded-lg.focus\\:ring-2.focus\\:ring-blue-500.focus\\:border-transparent.outline-hidden.transition.duration-150.ease-in-out');    //4. by xpath 
    //4. by xpath
     //await page.locator("//input[@class=\'ais-SearchBox-input w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-hidden transition duration-150 ease-in-out\']")
              //.fill('Apply for NBI Multiple Clearance');
    

//Click on the first result of search term "apply for NBI Multiple Clearance"
const [newPage] = await Promise.all([
  context.waitForEvent('page'), //starts listening for a new tab to appear
  page.getByRole('link', {name: SEARCH_TERM}).click() //is the action that actually triggers that new tab to open.

]);
await newPage.waitForLoadState(); //Wait until the page is rentered and switch to new tab

// Assertion steps: 
// 1. NBI clearance has the title "NBI Clearance Online Application"
// 2. NBI clearance website has the url "https://clearance.nbi.gov.ph/"
await expect(newPage).toHaveTitle("OFFICIAL NBI CLEARANCE");
await expect(newPage).toHaveURL("https://clearance.nbi.gov.ph/");

});

