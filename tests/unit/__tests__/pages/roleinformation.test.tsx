import { render, screen } from "@testing-library/react";
import RoleInformationPage from "../../../../src/app/Role-information/page";

describe("Role-information Page", () => {
  it("renders correctly", () => {
    const { container } = render(<RoleInformationPage />);
    expect(container).toMatchSnapshot();
  });
});
