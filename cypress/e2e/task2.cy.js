import { test2Page } from "../support/pages/test2Page";

const t2P = new test2Page();

it('Test 2', () => {

  t2P.navigate();
  t2P.login();
  t2P.clickPhones();
  t2P.addTheCheapestPhoneToCart();
})
