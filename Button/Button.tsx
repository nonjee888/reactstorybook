import React, { ReactElement, useContext } from 'react';
import { Button as MUIButton, ButtonProps as IButtonProps, Theme, ThemeProvider } from '@mui/material';
import { css } from '@emotion/react';
import { PlayceThemeContext } from '../../providers';

function Button(props: IButtonProps): ReactElement {
  const theme = useContext(PlayceThemeContext);
  return (
    <ThemeProvider theme={theme as Theme}>
      <MUIButton
        {...props}
        css={css`
          text-transform: none;
        `}
      >
        {props.children}
      </MUIButton>
    </ThemeProvider>
  );
}

Button.defaultProps = {
  variant: 'outlined',
};

export default Button;
