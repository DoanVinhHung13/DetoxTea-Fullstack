import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { Box, Stack } from '@mui/material';

function Title({ 
  children, 
  subtitle = null, 
  action = null, 
  align = 'left', 
  highlight = false, 
  ...props 
}) {
  return (
    <Box 
      sx={{ 
        position: 'relative', 
        mb: 2.5,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        gap: 1.5,
      }}
    >
      <Box>
        <Typography 
          component="h2" 
          variant="h5" 
          sx={{
            fontWeight: 700,
            color: '#0f172a',
            letterSpacing: '-0.02em',
            position: 'relative',
            display: 'inline-block',
            textAlign: align,
            pb: highlight ? 0.8 : 0,
            '&::after': highlight ? {
              content: '""',
              position: 'absolute',
              left: 0,
              bottom: 0,
              height: '3px',
              width: '44px',
              background: 'linear-gradient(90deg, #10b981 0%, #06b6d4 100%)',
              borderRadius: '2px'
            } : {},
            ...props.sx
          }}
          {...props}
        >
          {children}
        </Typography>

        {subtitle && (
          <Typography 
            variant="body2" 
            sx={{ color: '#64748b', mt: 0.5, fontWeight: 400 }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>

      {action && (
        <Stack direction="row" spacing={1} alignItems="center">
          {action}
        </Stack>
      )}
    </Box>
  );
}

Title.propTypes = {
  children: PropTypes.node,
  subtitle: PropTypes.node,
  action: PropTypes.node,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  highlight: PropTypes.bool,
};

export default Title;
