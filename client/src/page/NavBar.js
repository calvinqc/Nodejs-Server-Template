import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <header class="header">
        <div class="container">
          <div class="row">
            <div class="one-half column header-logo">
              <h3>Calvin Nguyen</h3>
            </div>

            <div class="one-half column header-links">
              <nav>
                <a href="/" class="item">
                  {" "}
                  <i class="fa fa-home"></i> Home{" "}
                </a>
                <a href="/resume.pdf" target="_blank" class="item">
                  <i class="fa fa-file-text-o"></i> Resume
                </a>
                <a href="/projects" class="item">
                  <i class="fa fa-university"></i> Projects
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
export default Navbar;
