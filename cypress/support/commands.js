const COMMAND_DELAY = 222500;

for (const command of [
  'visit',
  'click',
  'trigger',
  'type',
  'clear',
  'reload',
  'contains',
]) {
  Cypress.Commands.overwrite(command, (originalFn, ...args) => {
    const origVal = originalFn(...args);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(origVal);
      }, COMMAND_DELAY);
    });
  });
}

Cypress.Commands.add('loggedInAs', () => {
  window.localStorage.setItem(
    'clearCrm_token',
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGV2IiwiaWQiOiJiZDQ0MzNlZi00NWU4LTQxYzItOThmZC05YTVmNDEzNTFkN2EiLCJudGZ5IjoidHJ1ZSIsImRiZ2EiOiJ0cnVlIiwibmJmIjoxNTc3MDg5MzI5LCJleHAiOjE1Nzc2OTQxMjksImlzcyI6Imh0dHA6Ly9lYzItMy0yMjAtMjAtNzYuY29tcHV0ZS0xLmFtYXpvbmF3cy5jb20iLCJhdWQiOiJodHRwOi8vZWMyLTMtMjIwLTIwLTc2LmNvbXB1dGUtMS5hbWF6b25hd3MuY29tIn0.eTnu4eEcZCVYEL1sb_lWGC6e44P81OuJLfWrkAz2lk3k35tjOax37R4A36QgPSGIOuw0ucK4zPCsnTzGlRN1geuhsOxFFNgbmPIf6tCWdL9jX3WdQpQS1zRB-WK4R7kxg30YpgWESSjpFoV8jxPrRNqOJnk5ko5aPKTyiEgeRgRULcOX1KK_g8PoCfKCjsBIY7_cCF1Vi_YPZr85Y60tkmfukzJ4MSuVE0gBvU7NKf_IUXaI4LC-VkPW895x1OKWXcvgtILMf3YOWgiYmqz8bx5eTksDaEYaphILh9CQ9yzQkBM0S-D_UiPHRV_zLJI66krOgxtuhkA8cI8RfJc_MA',
  );
  cy.visit('http://crmv5.clearcar.co/');
});

Cypress.config('waitAfterEachCommand', 20000);
