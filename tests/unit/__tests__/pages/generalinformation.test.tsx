import GeneralInformationPage from "@/app/General-information/page";
import { render } from "@testing-library/react";

describe("General information Page", () => {
  it("renders correctly", () => {
    const { container } = render(<GeneralInformationPage />);
    expect(container).toMatchSnapshot();
  });
});
