import { render, screen } from "@testing-library/react";
import Footer from "../../../../src/components/Footer";

describe("Footer", () => {
  it("renders correctly", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });

  // Update when the code is not a template!!!
  it("should render all sections in the footer", () => {
    render(<Footer />);

    // Check if the sections are present
    expect(screen.getByText("Info")).toBeInTheDocument();
    expect(screen.getByText("Organization")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("should render all links in the footer", () => {
    render(<Footer />);

    // Check if the links are present
    expect(screen.getByText("About Us")).toHaveAttribute("href", "/about");
    expect(screen.getByText("Privacy Policy")).toHaveAttribute(
      "href",
      "/privacy"
    );
    expect(screen.getByText("Terms & Conditions")).toHaveAttribute(
      "href",
      "/terms"
    );
    expect(screen.getByText("Our Team")).toHaveAttribute("href", "/team");
    expect(screen.getByText("Careers")).toHaveAttribute("href", "/careers");
    expect(screen.getByText("Latest News")).toHaveAttribute("href", "/news");
    expect(screen.getByText("info@example.com")).toHaveAttribute(
      "href",
      "mailto:info@example.com"
    );
    expect(screen.getByText("+123 456 7890")).toHaveAttribute(
      "href",
      "tel:+1234567890"
    );
    expect(screen.getByText("Contact Form")).toHaveAttribute(
      "href",
      "https://www.example.com/contact"
    );
  });

  it("should render the footer bottom text", () => {
    render(<Footer />);

    // Check if the footer bottom text is present
    expect(
      screen.getByText("© 2024 Your Organization. All rights reserved.")
    ).toBeInTheDocument();
  });
});
