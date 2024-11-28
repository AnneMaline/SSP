import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateGroupForm from "../../../../src/components/CreateGroupForm";

describe("CreateGroupForm Component", () => {
  it("renders correctly", () => {
    const { container } = render(<CreateGroupForm />);
    expect(container).toMatchSnapshot();
  });

  it("renders the form with all fields and options", () => {
    render(<CreateGroupForm />);

    // Check environment radios
    expect(screen.getByLabelText("Prod")).toBeInTheDocument();
    expect(screen.getByLabelText("Test")).toBeInTheDocument();
    expect(screen.getByLabelText("Development")).toBeInTheDocument();

    // Check group type radios
    const groupTypeFieldset = screen
      .getByText("Group Type")
      .closest("fieldset");
    expect(groupTypeFieldset).toBeInTheDocument();
    const groupTypeRadioGroup = within(groupTypeFieldset!);
    expect(groupTypeRadioGroup.getByLabelText("Data")).toBeInTheDocument();
    expect(groupTypeRadioGroup.getByLabelText("Service")).toBeInTheDocument();
    expect(groupTypeRadioGroup.getByLabelText("Users")).toBeInTheDocument();

    // Check access type radios
    const accessTypeFieldset = screen
      .getByText("Access Type")
      .closest("fieldset");
    expect(accessTypeFieldset).toBeInTheDocument();
    const accessTypeRadioGroup = within(accessTypeFieldset!);
    expect(accessTypeRadioGroup.getByLabelText("View")).toBeInTheDocument();
    expect(accessTypeRadioGroup.getByLabelText("Data")).toBeInTheDocument();
    expect(accessTypeRadioGroup.getByLabelText("Edit")).toBeInTheDocument();

    // Check name input
    expect(screen.getByPlaceholderText("Enter group name")).toBeInTheDocument();

    // Check submit button
    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
  });

  it("updates the environment value when selected", () => {
    render(<CreateGroupForm />);
    const prodRadio = screen.getByLabelText("Prod");
    const testRadio = screen.getByLabelText("Test");

    // Check initial state
    expect(prodRadio).toBeChecked();
    expect(testRadio).not.toBeChecked();

    // Select "Test"
    fireEvent.click(testRadio);

    // Verify state update
    expect(prodRadio).not.toBeChecked();
    expect(testRadio).toBeChecked();
  });

  it("updates the group type value when selected", () => {
    render(<CreateGroupForm />);

    const groupTypeFieldset = screen
      .getByText("Group Type")
      .closest("fieldset");
    const groupTypeRadioGroup = within(groupTypeFieldset!);

    const dataRadio = groupTypeRadioGroup.getByLabelText("Data");
    const serviceRadio = groupTypeRadioGroup.getByLabelText("Service");

    // Check initial state
    expect(dataRadio).toBeChecked();
    expect(serviceRadio).not.toBeChecked();

    // Select "Service"
    fireEvent.click(serviceRadio);

    // Verify state update
    expect(dataRadio).not.toBeChecked();
    expect(serviceRadio).toBeChecked();
  });

  it("updates the access type value when selected", () => {
    render(<CreateGroupForm />);

    const accessTypeFieldset = screen
      .getByText("Access Type")
      .closest("fieldset");
    const accessTypeRadioGroup = within(accessTypeFieldset!);

    const viewRadio = accessTypeRadioGroup.getByLabelText("View");
    const editRadio = accessTypeRadioGroup.getByLabelText("Edit");

    // Check initial state
    expect(viewRadio).toBeChecked();
    expect(editRadio).not.toBeChecked();

    // Select "Edit"
    fireEvent.click(editRadio);

    // Verify state update
    expect(viewRadio).not.toBeChecked();
    expect(editRadio).toBeChecked();
  });

  it("updates the group name value when typed", () => {
    render(<CreateGroupForm />);
    const nameInput = screen.getByPlaceholderText("Enter group name");

    // Check initial state
    expect(nameInput).toHaveValue("");

    // Type into the input
    fireEvent.change(nameInput, { target: { value: "Test Group" } });

    // Verify state update
    expect(nameInput).toHaveValue("Test Group");
  });

  it("submits the form and resets the state", () => {
    render(<CreateGroupForm />);
    const nameInput = screen.getByPlaceholderText("Enter group name");
    const submitButton = screen.getByRole("button", { name: "Create" });

    // Fill out the form
    fireEvent.change(nameInput, { target: { value: "Test Group" } });
    const testRadio = screen.getByLabelText("Test");
    fireEvent.click(testRadio);

    const accessTypeFieldset = screen
      .getByText("Access Type")
      .closest("fieldset");
    const accessTypeRadioGroup = within(accessTypeFieldset!);
    fireEvent.click(accessTypeRadioGroup.getByLabelText("Edit"));

    const groupTypeFieldset = screen
      .getByText("Group Type")
      .closest("fieldset");
    const groupTypeRadioGroup = within(groupTypeFieldset!);
    fireEvent.click(groupTypeRadioGroup.getByLabelText("Service"));

    // Submit the form
    fireEvent.click(submitButton);

    // Verify the state has reset
    expect(nameInput).toHaveValue("");
    expect(screen.getByLabelText("Prod")).toBeChecked(); // Default environment
    expect(groupTypeRadioGroup.getByLabelText("Data")).toBeChecked(); // Default group type
    expect(accessTypeRadioGroup.getByLabelText("View")).toBeChecked(); // Default access type
  });
});
