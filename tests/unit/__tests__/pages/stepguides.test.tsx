import { render } from "@testing-library/react";
import StepGuidesPage from "../../../../src/app/Step-guides/page";

describe("Step-guide Page", () => {
  it("renders correctly", () => {
    const { container } = render(<StepGuidesPage />);
    expect(container).toMatchSnapshot();
  });
});
