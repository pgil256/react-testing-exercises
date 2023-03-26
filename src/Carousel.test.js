import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("renders without crashing", () => {
  render(<Carousel />);
})

it("matches snapshot", () => {
  const {asFragment} = render(<Carousel/>);
  expect(asFragment()).toMatchSnapshot();
})

it("works when you click on the left arrow", () => {
  const { queryByTestId, queryByAltText } = render(<Carousel/>);

  const rightArrow = queryByTestId("right-arrow");
  //move to right
  fireEvent.click(rightArrow);
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
  //move to left
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();

})

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).not.toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).toBeInTheDocument();
});

it("doesn't show left arrow when on first image", () => {
  const { queryByTestId } = render(<Carousel/>);
  expect(queryByTestId("left-arrow")).not.toBeInTheDocument();
})

it("doesn't show right arrow when on last image", () => {
  const { queryByTestId } = render(<Carousel/>);
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);
  expect(rightArrow).not.toBeInTheDocument();
})