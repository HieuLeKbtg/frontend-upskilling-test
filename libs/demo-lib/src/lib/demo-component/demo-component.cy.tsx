import DemoComponent from './demo-component';

describe('DemoComponent', () => {
  it('should render successfully', () => {
    cy.mount(<DemoComponent />);
  });
});
