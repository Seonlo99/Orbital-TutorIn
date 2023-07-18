import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import * as router from "react-router";
import { RecentCreatedPosts } from "../../components/Profile/RecentCreatedPosts";

describe("RecentCreatedPosts", () => {
  // Mock the navigate function
  const navigate = jest.fn();
  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });
  const mockRecentPosts = [
    { slug: "post-1", title: "Post 1" },
    { slug: "post-2", title: "Post 2" },
    { slug: "post-3", title: "Post 3" },
  ];

  test("renders recent posts correctly", async () => {
    render(<RecentCreatedPosts recentPosts={mockRecentPosts} />);

    // Assert the rendered recent posts
    expect(screen.getByText("Recent Posts")).toBeInTheDocument();
    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 2")).toBeInTheDocument();
    expect(screen.getByText("Post 3")).toBeInTheDocument();
  });

  test("navigates to the post when clicked", async () => {
    render(<RecentCreatedPosts recentPosts={mockRecentPosts} />);

    // Click on the recent post
    const post1Button = screen.getByText("Post 1");
    fireEvent.click(post1Button);

    // Assert that the navigate function is called with the correct slug
    expect(navigate).toHaveBeenCalledWith("/post/post-1");
  });

  test("displays no recent posts message when data is empty", async () => {
    render(<RecentCreatedPosts recentPosts={[]} />);

    // Assert the "no recent posts" message
    expect(screen.getByText("No recent post available!")).toBeInTheDocument();
  });
});
