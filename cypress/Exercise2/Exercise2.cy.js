/*
2. Perform a real test on a website:
  1. Browse https://www.demoblaze.com/
  2. Login
  "user": "automatedUser26@example.com",
  "password": "4r4nd0mp4ssw0rd"
  3. Add the cheapest phone to cart
*/
import { test2Page } from "../support/pages/test2Page";

const t2P = new test2Page();

it('Test 2', () => {

  t2P.navigate();
  t2P.login();
  t2P.clickPhones();
  t2P.addTheCheapestPhoneToCart();
})
