import PropTypes from 'prop-types';
// icons
import { Icon } from '@iconify/react';
// @mui
import { Box, BoxProps } from '@mui/material';
import { FC } from 'react';

interface IconifyProps extends BoxProps {
  icon: string | any;
}

const Iconify: FC<IconifyProps> = ({ icon, sx, ...other }) => {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
};

Iconify.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object
};

export default Iconify;
