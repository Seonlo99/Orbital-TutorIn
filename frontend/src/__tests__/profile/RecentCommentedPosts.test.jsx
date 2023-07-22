import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import * as router from "react-router";
import { RecentCommentedPosts } from "../../components/Profile/RecentCommentedPosts";

// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useNavigate: () => navigate,
// }));

describe("RecentCommentedPosts", () => {
  // Mock the navigate function
  const navigate = jest.fn();
  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });

  const mockData = [
    {
      postId: {
        slug: "sample-post-1",
        title: "Sample Post 1",
      },
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      postId: {
        slug: "sample-post-2",
        title: "Sample Post 2",
      },
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  test("renders recent comments correctly", async () => {
    render(
      <BrowserRouter>
        <RecentCommentedPosts recentCommentedPostsData={mockData} />
      </BrowserRouter>
    );

    // Assert the rendered recent comments
    expect(screen.getByText("Recent Comments")).toBeInTheDocument();
    expect(screen.getByText("Sample Post 1")).toBeInTheDocument();
    expect(screen.getByText("Sample Post 2")).toBeInTheDocument();
  });

  test("navigates to the post when clicked", async () => {
    render(
      <BrowserRouter>
        <RecentCommentedPosts recentCommentedPostsData={mockData} />
      </BrowserRouter>
    );

    // Click on the recent comment
    const comment = screen.getByText("Sample Post 1");
    fireEvent.click(comment);

    // Assert that the navigate function is called with the correct slug
    expect(navigate).toHaveBeenCalledWith("/post/sample-post-1");
  });

  test("displays no comments message when data is empty", async () => {
    render(<RecentCommentedPosts recentCommentedPostsData={[]} />);

    // Assert the "no comments" message
    expect(
      screen.getByText("No comment available!")
    ).toBeInTheDocument();
  });
});
