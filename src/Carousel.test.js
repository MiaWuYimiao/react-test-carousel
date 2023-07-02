import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("renders without crashing", function() {
    render(<Carousel />);
});

it("matches snapshot", function() {
    const { asFragment } = render(<Carousel />);
    expect(asFragment()).toMatchSnapshot();
})

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left arrow", function() {
    const { getByTestId, queryByText, getByText} = render(<Carousel />);

    fireEvent.click(getByTestId("right-arrow"));

    expect(getByText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
    expect(queryByText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();

    fireEvent.click(getByTestId("left-arrow"));

    expect(queryByText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
    expect(queryByText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
    
});

it("hide left arrow in the first imge", function() {
    const { queryByTestId } = render(<Carousel />);

    expect(queryByTestId("left-arrow")).not.toBeInTheDocument();
    expect(queryByTestId("right-arrow")).toBeInTheDocument();
});

it("hide right arrow in the last imge", function() {
    const { getByTestId, queryByTestId } = render(<Carousel />);

    fireEvent.click(getByTestId("right-arrow"));
    fireEvent.click(getByTestId("right-arrow"));
    
    expect(queryByTestId("left-arrow")).toBeInTheDocument();
    expect(queryByTestId("right-arrow")).not.toBeInTheDocument();
});
