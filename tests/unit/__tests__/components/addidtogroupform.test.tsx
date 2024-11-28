import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddIDtoGroupForm from "../../../../src/components/AddIDtoGroupForm";

describe("AddIDtoGroupForm Component", () => {
  it("renders correctly", () => {
    const { container } = render(<AddIDtoGroupForm />);
    expect(container).toMatchSnapshot();
  });

  it("renders the form with all fields", () => {
    render(<AddIDtoGroupForm />);

    // Check EntraID input
    expect(screen.getByLabelText("Enter ID")).toBeInTheDocument();

    // Check environment radio buttons
    expect(screen.getByLabelText("Prod")).toBeInTheDocument();
    expect(screen.getByLabelText("Test")).toBeInTheDocument();
    expect(screen.getByLabelText("Development")).toBeInTheDocument();

    // Check group dropdown
    expect(screen.getByLabelText("Select Group")).toBeInTheDocument();

    // Check submit button
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });

  it("updates the EntraID field when typed", () => {
    render(<AddIDtoGroupForm />);
    const entraIDInput = screen.getByLabelText("Enter ID");

    // Check initial state
    expect(entraIDInput).toHaveValue("");

    // Type into the EntraID input
    fireEvent.change(entraIDInput, { target: { value: "12345" } });

    // Verify that the input value was updated
    expect(entraIDInput).toHaveValue("12345");
  });

  it("updates the environment when a radio button is selected", () => {
    render(<AddIDtoGroupForm />);
    const prodRadio = screen.getByLabelText("Prod");
    const testRadio = screen.getByLabelText("Test");

    // Check initial state (default should be prod)
    expect(prodRadio).toBeChecked();
    expect(testRadio).not.toBeChecked();

    // Select "Test"
    fireEvent.click(testRadio);

    // Verify that the "Test" radio is selected and "Prod" is deselected
    expect(testRadio).toBeChecked();
    expect(prodRadio).not.toBeChecked();
  });

  it("updates the group value when a dropdown option is selected", async () => {
    render(<AddIDtoGroupForm />);

    // Wait for groups to load (simulated async loading)
    await waitFor(() =>
      expect(screen.getByLabelText("Select Group")).toBeInTheDocument()
    );

    const groupSelect = screen.getByLabelText("Select Group");

    // Check initial state (should be empty)
    expect(groupSelect).toHaveValue("");

    // Select a group
    fireEvent.change(groupSelect, { target: { value: "Group 1" } });

    // Verify that the selected group is updated
    expect(groupSelect).toHaveValue("Group 1");
  });

  it("resets the form after submission", async () => {
    render(<AddIDtoGroupForm />);
    const entraIDInput = screen.getByLabelText("Enter ID");
    const groupSelect = screen.getByLabelText("Select Group");
    const submitButton = screen.getByRole("button", { name: "Add" });

    // Fill out the form
    fireEvent.change(entraIDInput, { target: { value: "12345" } });
    fireEvent.change(groupSelect, { target: { value: "Group 1" } });
    fireEvent.click(screen.getByLabelText("Development"));

    // Submit the form
    fireEvent.click(submitButton);

    // Verify that the form is reset after submission
    await waitFor(() => expect(entraIDInput).toHaveValue(""));
    await waitFor(() => expect(groupSelect).toHaveValue(""));
    await waitFor(() => expect(screen.getByLabelText("Prod")).toBeChecked());
  });
});
