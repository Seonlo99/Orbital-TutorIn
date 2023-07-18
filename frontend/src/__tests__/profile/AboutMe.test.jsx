import { render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";

import { AboutMe } from "../../components/Profile/AboutMe";
import { BrowserRouter } from "react-router-dom";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("AboutMe", () => {
  beforeEach(() => {
    useSelector.mockReturnValue({ userInfo: null });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  const viewedUser = {
    name: "John Doe",
    verified: true,
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    tutor: true,
    email: "johndoe@example.com",
    avatar: "",
  };

  test("renders user information correctly", async () => {
    useSelector.mockReturnValue({ userInfo: { id: 1, username: "testuser" } });
    render(
      <BrowserRouter>
        <AboutMe viewedUser={viewedUser} />
      </BrowserRouter>
    );

    // Assert the rendered user information
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Tutor")).toBeInTheDocument();
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("johndoe@example.com")).toBeInTheDocument();
  });

  test("renders the profile picture correctly", async () => {
    useSelector.mockReturnValue({ userInfo: { id: 1, username: "testuser" } });
    render(
      <BrowserRouter>
        <AboutMe viewedUser={viewedUser} />
      </BrowserRouter>
    );

    // Assert the profile picture
    const profilePic = screen.getByAltText("Img");
    expect(profilePic).toBeInTheDocument();
    expect(profilePic.src).toContain("default.png");
  });
});
