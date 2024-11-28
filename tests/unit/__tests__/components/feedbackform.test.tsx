import { render, screen, fireEvent } from "@testing-library/react";
import FeedbackForm from "../../../../src/components/FeedbackForm";

describe("FeedbackForm", () => {
  it("renders correctly", () => {
    const { container } = render(<FeedbackForm />);
    expect(container).toMatchSnapshot();
  });

  it("renders the form with all input fields", () => {
    render(<FeedbackForm />);

    // Check that the form fields are rendered
    expect(
      screen.getByRole("heading", { name: /feedback form/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();

    // Check radio buttons
    const feedbackTypes = ["Comments", "Suggestions", "Error"];
    feedbackTypes.forEach((type) => {
      expect(screen.getByLabelText(type)).toBeInTheDocument();
    });
  });

  it("allows users to fill out the form", () => {
    render(<FeedbackForm />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "This is a test description" },
    });
    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.click(screen.getByLabelText(/suggestions/i));

    // Assert the values
    expect(screen.getByLabelText(/description/i)).toHaveValue(
      "This is a test description"
    );
    expect(screen.getByLabelText(/first name/i)).toHaveValue("John");
    expect(screen.getByLabelText(/last name/i)).toHaveValue("Doe");
    expect(screen.getByLabelText(/email/i)).toHaveValue("john.doe@example.com");
    expect(screen.getByLabelText(/suggestions/i)).toBeChecked();
  });

  it("submits the form data", () => {
    // mock consol log output - change when this is switched with API
    const consoleLogMock = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    render(<FeedbackForm />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Test feedback" },
    });
    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: "Smith" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "jane.smith@example.com" },
    });
    fireEvent.click(screen.getByLabelText(/error/i));

    // Submit the form
    fireEvent.submit(screen.getByRole("button", { name: /submit feedback/i }));

    // Verify that the form data is logged
    expect(consoleLogMock).toHaveBeenCalledWith("Submitting form data:", {
      feedbackType: "error",
      description: "Test feedback",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
    });

    consoleLogMock.mockRestore();
  });
});
