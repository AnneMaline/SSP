import { render } from "@testing-library/react";
import SelfServicePage from "../../../../src/app/Self-service/page";

describe("Self-service Page", () => {
  it("renders correctly", () => {
    const { container } = render(<SelfServicePage />);
    expect(container).toMatchSnapshot();
  });
});
