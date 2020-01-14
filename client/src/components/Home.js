import React from "react";

export default function Home() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
          MSIMBO-TODO
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                About
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Login
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" tabindex="-1" aria-disabled="true">
                Register
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
