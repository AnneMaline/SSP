import { fireEvent, screen, render } from "@testing-library/react";
import EntitlementsPage from "../../../../src/app/Entitlements/page";

describe("Entitlements Page", () => {
  it("renders correctly", () => {
    const { container } = render(<EntitlementsPage />);
    expect(container).toMatchSnapshot();
  });

  it("removes a group from the list when the delete button is clicked", () => {
    render(<EntitlementsPage />);

    // Verify initial state: Two groups are rendered
    expect(screen.getByText("Team A")).toBeInTheDocument();
    expect(screen.getByText("Team B")).toBeInTheDocument();

    // Open the dropdown for "Team A"
    fireEvent.click(screen.getByText("Team A"));

    // Click the delete button for "Team A"
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    // Verify "Team A" is removed and "Team B" is still present
    expect(screen.queryByText("Team A")).not.toBeInTheDocument();
    expect(screen.getByText("Team B")).toBeInTheDocument();
  });
});
