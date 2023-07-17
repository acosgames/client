import fs from "flatstore";

import PropTypes from "prop-types";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Box } from "@chakra-ui/react";

function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

// Layout.propTypes = {
//   children: PropTypes.element | PropTypes.array,
// };

export default Layout;
