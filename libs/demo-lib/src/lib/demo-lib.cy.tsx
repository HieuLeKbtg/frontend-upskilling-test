import DemoLib from './demo-lib';

describe('DemoLib', () => {
  it('mounts', () => {
    cy.mount(<DemoLib />);
  });
});
