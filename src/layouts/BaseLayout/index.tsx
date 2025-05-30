import PropTypes from "prop-types";
import { FC, ReactNode } from "react";

interface BaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return <>{children}</>;
};

BaseLayout.propTypes = {
  children: PropTypes.node,
};

export default BaseLayout;
