import { render, screen } from "@testing-library/react";
import TopTask from "../../src/app/components/TopTask";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { mocked } from "jest-mock";

// Mock useSearchParams
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

describe("TopTask", () => {
  const mockUseSearchParams = mocked(useSearchParams);

  beforeEach(() => {
    // Mock default behavior of useSearchParams
    const mockSearchParams: Partial<ReadonlyURLSearchParams> = {
      toString: () => "param1=value1&param2=value2",
      get: (name: string) => {
        const params: { [key: string]: string } = {
          param1: "value1",
          param2: "value2",
        };
        return params[name] || null;
      },
      getAll: () => [],
      has: () => false,
      keys: jest.fn().mockReturnValue([][Symbol.iterator]()),
      values: jest.fn().mockReturnValue([][Symbol.iterator]()),
      entries: jest.fn().mockReturnValue([][Symbol.iterator]()),
      forEach: jest.fn(),
    };

    // Cast the mock as ReadonlyURLSearchParams
    mockUseSearchParams.mockReturnValue(
      mockSearchParams as ReadonlyURLSearchParams
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { container } = render(
      <TopTask
        text="Go to Target"
        targetUrl="/target-page"
        className="custom-class"
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("renders the link with the correct text and href", () => {
    render(
      <TopTask
        text="Go to Target"
        targetUrl="/target-page"
        className="custom-class"
      />
    );

    // Check if the link text is correct
    const link = screen.getByRole("link", { name: /go to target/i });
    expect(link).toBeInTheDocument();

    // Check if the href is correct
    expect(link).toHaveAttribute(
      "href",
      "/target-page?param1=value1&param2=value2"
    );

    // Check if custom className is applied
    expect(link).toHaveClass("custom-class");
  });

  it("updates href dynamically based on search parameters", () => {
    render(<TopTask text="Dynamic Params" targetUrl="/dynamic-page" />);

    const link = screen.getByRole("link", { name: /dynamic params/i });

    // Check updated href
    expect(link).toHaveAttribute(
      "href",
      "/dynamic-page?param1=value1&param2=value2"
    );
  });
});
