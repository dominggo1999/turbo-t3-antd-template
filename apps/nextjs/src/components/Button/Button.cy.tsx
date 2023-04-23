import { Button } from "antd";

describe("Button", () => {
  it("Render Correctly", () => {
    cy.mount(<Button type="primary">Hello</Button>);
    cy.findByText("Hello").should("have.text", "Hello");
  });
});
