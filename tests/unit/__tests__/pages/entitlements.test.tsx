import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EntitlementsPage from "../../../../src/app/Entitlements/page";
import GroupDropDown from "../../../../src/components/GroupDropDown";
import fetchMock from "jest-fetch-mock";

jest.mock("../../../../src/components/GroupDropDown", () =>
  jest.fn(({ name }) => <div>{name}</div>)
);

describe("Entitlements Page", () => {
  beforeEach(() => {
    localStorage.clear();
    fetchMock.resetMocks();

    localStorage.setItem("access_token", "mockAuthToken");
  });

  it("renders correctly", () => {
    const { container } = render(<EntitlementsPage />);
    expect(container).toMatchSnapshot();
  });

  it("should fetch auth token and groups on mount", async () => {
    fetchMock.mockResponses(
      [JSON.stringify({ access_token: "mockAuthToken" }), { status: 200 }],
      [JSON.stringify({ groups: [] }), { status: 200 }]
    );

    render(<EntitlementsPage />);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith("/api/auth/", expect.any(Object));
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/entitlements/v2/groups/getGroups",
        expect.any(Object)
      );
    });
  });

  it("should render GroupDropDown components for each group", async () => {
    const mockGroups = [
      {
        name: "Group 1",
        email: "group1@example.com",
        description: "Description 1",
      },
      {
        name: "Group 2",
        email: "group2@example.com",
        description: "Description 2",
      },
    ];

    fetchMock.mockResponses(
      [JSON.stringify({ access_token: "mockAuthToken" }), { status: 200 }],
      [JSON.stringify({ groups: mockGroups }), { status: 200 }]
    );

    render(<EntitlementsPage />);

    await waitFor(() => {
      mockGroups.forEach((group) => {
        expect(screen.getByText(group.name)).toBeInTheDocument();
      });
    });

    mockGroups.forEach((group) => {
      expect(GroupDropDown).toHaveBeenCalledWith(
        expect.objectContaining({
          name: group.name,
          group_email: group.email,
          description: group.description,
          data_partition_id: "bootcamp",
        }),
        {}
      );
    });
  });

  it("should handle delete group", async () => {
    const mockGroups = [
      {
        name: "Group 1",
        email: "group1@example.com",
        description: "Description 1",
      },
      {
        name: "Group 2",
        email: "group2@example.com",
        description: "Description 2",
      },
    ];

    fetchMock.mockResponses(
      [JSON.stringify({ access_token: "mockAuthToken" }), { status: 200 }],
      [JSON.stringify({ groups: mockGroups }), { status: 200 }]
    );

    render(<EntitlementsPage />);

    await waitFor(() => {
      expect(screen.getByText("Group 1")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Group 1"));

    fireEvent.click(screen.getByText("Delete Group"));

    await waitFor(() => {
      expect(screen.queryByText("Group 1")).not.toBeInTheDocument();
    });
  });
});
