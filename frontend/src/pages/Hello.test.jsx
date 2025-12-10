import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Hello from "./Hello";
import React from "react";

test("affiche le message Hello", () => {
render(<Hello name="World" />);
expect(screen.getByText("Hello World!")).toBeInTheDocument();
});