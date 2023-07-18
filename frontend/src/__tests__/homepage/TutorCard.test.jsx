import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import * as router from "react-router";
import { BsCheckLg, BsStar, BsStarFill } from "react-icons/bs";
import TutorCard from "../../components/TutorCard";

describe("TutorCard", () => {
  // Mock the navigate function
  const navigate = jest.fn();
  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });

  const mockTutor = {
    _id: "123456789",
    name: "John Doe",
    avatar: "tutor.jpg",
    verified: true,
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    tutoringCount: 3,
    rating: 4.5,
    ratingCount: 10,
  };

  test("renders tutor information correctly", () => {
    render(<TutorCard tutor={mockTutor} />);

    // Assert the rendered tutor information
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Teach 3 times")).toBeInTheDocument();
    expect(screen.getByText("4.5 (10)")).toBeInTheDocument();
  });

  test("navigates to tutor profile when clicked", () => {
    render(<TutorCard tutor={mockTutor} />);

    // Click on the tutor's name
    const tutorName = screen.getByText("John Doe");
    fireEvent.click(tutorName);

    // Assert that the navigate function is called with the correct tutor ID
    expect(navigate).toHaveBeenCalledWith("/profile/123456789");
  });

  test("displays the BsCheckLg component when tutor is verified", () => {
    render(<TutorCard tutor={mockTutor} />);

    // Assert the rendered BsCheckLg component
    const bsCheckLgComponent = screen.getByTestId("bsCheckLg");
    expect(bsCheckLgComponent).toBeInTheDocument();
  });

  test("displays the correct rating number", () => {
    render(<TutorCard tutor={mockTutor} />);

    // Assert the rendered rating number
    const ratingNumber = screen.getByText("4.5 (10)");
    expect(ratingNumber).toBeInTheDocument();
  });
});
