import { render } from "@testing-library/react";
import OnboardingPage from "@/app/Onboarding/page";

describe("Onboarding Page", () => {
  it("renders correctly", () => {
    const { container } = render(<OnboardingPage />);
    expect(container).toMatchSnapshot();
  });
});
