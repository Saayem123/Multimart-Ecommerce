import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./Navbar";
import { Provider } from "react-redux";
import { createStore } from "redux";

const renderWithStore = (store) => {
  render(
    <Provider store={store}>
      <Router>
        <NavBar />
      </Router>
    </Provider>
  );
};

describe("NavBar Component", () => {
  test("renders brand logo", () => {
    const mockStore = createStore(() => ({
      cart: {
        cartList: [],
      },
    }));
    renderWithStore(mockStore);
    expect(screen.getByText(/AAZAM/i)).toBeInTheDocument();
  });

  test("renders navigation links", () => {
    const mockStore = createStore(() => ({
      cart: {
        cartList: [],
      },
    }));
    renderWithStore(mockStore);

    expect(screen.getByLabelText(/Go to Home Page/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Go to Shop Page/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cart Page Link/i)).toBeInTheDocument();
  });

  test("renders cart icon with number of items", () => {
    const mockStore = createStore(() => ({
      cart: {
        cartList: [],
      },
    }));
    renderWithStore(mockStore);

    expect(screen.getByLabelText(/Cart Icon/i)).toBeInTheDocument();
  });

  test("displays the correct cart count", () => {
    const store = createStore(() => ({
      cart: {
        cartList: [{ id: 1, name: "Item 1" }, { id: 2, name: "Item 2" }],
      },
    }));

    renderWithStore(store);

    expect(screen.getByLabelText(/Cart Icon/i).getAttribute("data-num")).toBe("2");
  });
});
