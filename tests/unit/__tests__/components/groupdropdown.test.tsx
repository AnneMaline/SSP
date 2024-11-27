import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import GroupDropDown from "../../../../src/app/components/GroupDropDown";

describe("GroupDropDown Component", () => {
  const mockOnDelete = jest.fn();

  const mockProps = {
    name: "Test Group",
    description: "This is a test group.",
    members: [
      { id: "1", role: "Admin" },
      { id: "2", role: "Member" },
    ],
    onDelete: mockOnDelete,
  };

  it("renders correctly", () => {
    const { container } = render(<GroupDropDown {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it("renders the component with correct initial state", () => {
    render(<GroupDropDown {...mockProps} />);

    // Check if the name is displayed in the header
    expect(screen.getByText("Test Group")).toBeInTheDocument();

    // Check if the dropdown is initially closed
    expect(screen.queryByText("Number of members: 2")).not.toBeInTheDocument();
    expect(screen.getByText("↓")).toBeInTheDocument();
  });

  it("toggles the dropdown on click", () => {
    render(<GroupDropDown {...mockProps} />);

    const header = screen.getByText("Test Group");

    // Open the dropdown
    fireEvent.click(header);
    expect(screen.getByText("Number of members: 2")).toBeInTheDocument();
    expect(screen.getByText("↑")).toBeInTheDocument();

    // Close the dropdown
    fireEvent.click(header);
    expect(screen.queryByText("Number of members: 2")).not.toBeInTheDocument();
    expect(screen.getByText("↓")).toBeInTheDocument();
  });

  it("displays the correct number of members", () => {
    render(<GroupDropDown {...mockProps} />);

    // Open the dropdown
    fireEvent.click(screen.getByText("Test Group"));

    // Check the number of members
    expect(screen.getByText("Number of members: 2")).toBeInTheDocument();

    // Check member table rows
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(3); // 1 header row + 2 member rows
  });

  it("adds a member when the 'Add Member' button is clicked", () => {
    render(<GroupDropDown {...mockProps} />);

    // Open the dropdown
    fireEvent.click(screen.getByText("Test Group"));

    // Click the Add Member button
    const addButton = screen.getByText("Add Member");
    fireEvent.click(addButton);

    // Verify the new member count
    expect(screen.getByText("Number of members: 3")).toBeInTheDocument();

    // Verify the new member row
    expect(screen.getByText("New Role 3")).toBeInTheDocument();
  });

  it("calls the onDelete function when the 'Delete' button is clicked", () => {
    render(<GroupDropDown {...mockProps} />);

    // Open the dropdown
    fireEvent.click(screen.getByText("Test Group"));

    // Click the Delete button
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    // Verify the onDelete function is called
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});
