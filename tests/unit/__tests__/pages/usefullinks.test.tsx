import { render, screen } from "@testing-library/react";
import UsefulLinksPage from "../../../../src/app/Useful-links/page";

describe("Usefiul links Page", () => {
  it("renders correctly", () => {
    const { container } = render(<UsefulLinksPage />);
    expect(container).toMatchSnapshot();
  });
});
