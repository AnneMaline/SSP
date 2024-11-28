import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NavBar from "../../../../src/app/components/Navbar";
import { useSearchParams } from "next/navigation";

// Mock the useSearchParams hook
// jest.mock("next/navigation", () => ({
//   useSearchParams: jest.fn(),
// }));

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

  // it("data producer link has route user=Data-Producer", () => {
  //   render(<NavBar />);
  //   const button = screen.getByRole("link", { name: /Data Producer/i });
  //   expect(button).toHaveAttribute("href", "?user=Data-Producer");
  // });

  // it("applies the correct class to the active link based on the 'user' query parameter", () => {
  //   // Simulate a 'user' query parameter with a value of 'Data-Producer'
  //   (useSearchParams as jest.Mock).mockReturnValue({
  //     get: jest.fn().mockReturnValue("Data-Producer"),
  //   });

  //   render(<NavBar />);

  //   // Check if the 'Data Producer' link has the active class
  //   const dataProducerLink = screen.getByText("Data Producer");
  //   expect(dataProducerLink).toHaveClass(
  //     "px-4 py-2 bg-blue-700 hover:bg-gray-600 focus:outline-none focus:ring focus:ring-blue-500 rounded"
  //   );

  //   // Check if the 'Data Consumer' link does not have the active class
  //   const dataConsumerLink = screen.getByText("Data Consumer");
  //   expect(dataConsumerLink).toHaveClass(
  //     "px-4 py-2 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring focus:ring-blue-500 rounded"
  //   );

  //   // Check if the 'Developer' link does not have the active class
  //   const developerLink = screen.getByText("Developer");
  //   expect(developerLink).toHaveClass(
  //     "px-4 py-2 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring focus:ring-blue-500 rounded"
  //   );
  // });

  // it("applies the correct class when the 'user' query parameter is absent", () => {
  //   // Simulate no 'user' query parameter (i.e., it returns null)
  //   (useSearchParams as jest.Mock).mockReturnValue({
  //     get: jest.fn().mockReturnValue(null),
  //   });

  //   render(<NavBar />);

  //   // All links should have the inactive class since no 'user' is selected
  //   const dataProducerLink = screen.getByText("Data Producer");
  //   const dataConsumerLink = screen.getByText("Data Consumer");
  //   const developerLink = screen.getByText("Developer");

  //   expect(dataProducerLink).toHaveClass(
  //     "px-4 py-2 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring focus:ring-blue-500 rounded"
  //   );
  //   expect(dataConsumerLink).toHaveClass(
  //     "px-4 py-2 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring focus:ring-blue-500 rounded"
  //   );
  //   expect(developerLink).toHaveClass(
  //     "px-4 py-2 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring focus:ring-blue-500 rounded"
  //   );
  // });
});
