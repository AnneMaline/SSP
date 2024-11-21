import { render, screen } from "@testing-library/react";
import OSDUGeneralPage from "../../src/app/OSDU-general/page";

describe("OSDUGeneral Page", () => {
  it("renders correctly", () => {
    const { container } = render(<OSDUGeneralPage />);
    expect(container).toMatchSnapshot();
  });
});
