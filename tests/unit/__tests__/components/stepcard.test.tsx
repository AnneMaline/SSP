import { render } from "@testing-library/react";
import StepCard from "../../../../src/app/components/StepCard";

describe("StepCard", () => {
  const mockProps = {
    title: "Test Title",
    information: "Test information about the item.",
    link: "https://example.com",
  };
  it("renders correctly", () => {
    const { container } = render(<StepCard {...mockProps} />);
    expect(container).toMatchSnapshot();
  });
});
