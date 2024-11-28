import { render } from "@testing-library/react";
import LinkItem from "@/components/LinkItem";

describe("StepCard", () => {
  const mockProps = {
    title: "Test Title",
    information: "Test information about the item.",
    tags: ["Tag1", "Tag2", "Tag3"],
    link: "https://example.com",
  };
  it("renders correctly", () => {
    const { container } = render(<LinkItem {...mockProps} />);
    expect(container).toMatchSnapshot();
  });
});
