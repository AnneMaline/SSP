import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import GroupDropDown from "../../../../src/components/GroupDropDown";
import fetchMock from "jest-fetch-mock";

jest.mock("../../../../src/components/AddIDtoGroupForm", () =>
  jest.fn(() => <div>Mocked AddIDtoGroupForm</div>)
);

describe("GroupDropDown Component", () => {
  const mockProps = {
    name: "Group 1",
    group_email: "group1@example.com",
    description: "Description 1",
    data_partition_id: "bootcamp",
    onDelete: jest.fn(),
  };

  beforeEach(() => {
    localStorage.clear();
    fetchMock.resetMocks();

    localStorage.setItem("access_token", "mockAuthToken");
  });

  it("renders correctly", () => {
    const { container } = render(<GroupDropDown {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it("should toggle dropdown, fetch members count and check content", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ membersCount: 10 }));

    render(<GroupDropDown {...mockProps} />);

    const dropdownHeader = screen.getByText(mockProps.name);
    fireEvent.click(dropdownHeader);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        `/api/entitlements/v2/groups/${mockProps.group_email}/membersCount`,
        expect.any(Object)
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Number of members: 10")).toBeInTheDocument();
      expect(screen.getByText(mockProps.description)).toBeInTheDocument();
      expect(screen.getByText("Delete Group")).toBeInTheDocument();
      expect(screen.getByText("See Members")).toBeInTheDocument();
      expect(screen.getByText("Add Member")).toBeInTheDocument();
      expect(screen.getByText("↑")).toBeInTheDocument();
    });
  });

  it('should fetch and display members when "See Members" is clicked', async () => {
    const mockMembers = [
      { email: "member1@example.com", role: "OWMER" },
      { email: "member2@example.com", role: "MEMBER" },
    ];

    fetchMock.mockResponses(
      [JSON.stringify({ access_token: "mockAuthToken" }), { status: 200 }],
      [JSON.stringify({ members: mockMembers }), { status: 200 }]
    );

    render(<GroupDropDown {...mockProps} />);

    const dropdownHeader = screen.getByText(mockProps.name);
    fireEvent.click(dropdownHeader);

    const seeMembersButton = screen.getByText("See Members");
    fireEvent.click(seeMembersButton);

    await waitFor(() => {
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText("Role")).toBeInTheDocument();
      expect(screen.getByText("Actions")).toBeInTheDocument();
      mockMembers.forEach((member) => {
        expect(screen.getByText(member.email)).toBeInTheDocument();
        expect(screen.getByText(member.role)).toBeInTheDocument();
      });
    });
  });

  it('should show AddIDtoGroupForm pop-up when "Add member" button is clicked', () => {
    render(<GroupDropDown {...mockProps} />);

    fireEvent.click(screen.getByText(mockProps.name)); // Open the dropdown

    const addMemberButton = screen.getByText("Add Member");
    fireEvent.click(addMemberButton);

    expect(screen.getByText("Mocked AddIDtoGroupForm")).toBeInTheDocument();

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    expect(
      screen.queryByText("Mocked AddIDtoGroupForm")
    ).not.toBeInTheDocument();
  });
});
