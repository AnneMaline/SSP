import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NavBar from "../../src/app/components/Navbar";

describe("NavBar", () => {
  it("renders correctly", () => {
    const { container } = render(<NavBar />);
    expect(container).toMatchSnapshot();
  });

  it("renders a heading", () => {
    render(<NavBar />);
    const heading = screen.getByText("OSDU Self-service Portal");
    expect(heading).toBeInTheDocument();
  });

  it("data producer link has route user=Data-Producer", () => {
    render(<NavBar />);
    const button = screen.getByRole("link", { name: /Data Producer/i });
    expect(button).toHaveAttribute("href", "?user=Data-Producer");
  });
});
