import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { size } from 'polished';

const TRACK_WIDTH = 40;
const TRACK_HEIGHT = 24;
const KNOB_SIZE = 16;
const ANIMATION_TIMING = '200ms ease-in-out';

const knobShadow = color => `
  0 2px 0 0 ${color}, inset 0 2px #FFF,
    inset 0 1px 0 1px rgba(255, 255, 255, 6%)
`;

const trackBaseStyles = ({ theme }) => css`
  label: switch;
  background-color: ${theme.colors.n300};
  border-radius: ${TRACK_HEIGHT}px;
  position: relative;
  transition: background-color ${ANIMATION_TIMING};
  ${size(TRACK_HEIGHT, TRACK_WIDTH)};
`;

const trackOnStyles = ({ theme, on }) =>
  on &&
  css`
    label: switch--on;
    background-color: ${theme.colors.p500};
  `;

const SwitchTrack = styled('div')`
  ${trackBaseStyles} ${trackOnStyles};
`;

const knobBaseStyles = ({ theme }) => css`
  label: switch__knob;
  background-color: ${theme.colors.n100};
  box-shadow: ${knobShadow(theme.colors.n500)};
  position: absolute;
  top: 50%;
  transform: translate3d(${theme.spacings.bit}, -50%, 0);
  transition: box-shadow ${ANIMATION_TIMING}, transform ${ANIMATION_TIMING};
  ${size(KNOB_SIZE)};
  border-radius: ${KNOB_SIZE}px;
`;

const knobOnStyles = ({ theme, on }) =>
  on &&
  css`
    label: switch__knob--on;
    box-shadow: ${knobShadow(theme.colors.p700)};
    transform: translate3d(
      calc(${TRACK_WIDTH - KNOB_SIZE}px - ${theme.spacings.bit}),
      -50%,
      0
    );
  `;

const SwitchKnob = styled('div')`
  ${knobBaseStyles} ${knobOnStyles};
`;

/**
 * A simple Switch component.
 */
const Switch = ({ on, onToggle }) => (
  <SwitchTrack onClick={onToggle} on={on} role="switch" aria-checked={on}>
    <SwitchKnob {...{ on }} />
  </SwitchTrack>
);

Switch.propTypes = {
  /**
   * Is the Switch on?
   */
  on: PropTypes.bool,
  /**
   * Toggle callback used as onClick.
   */
  onToggle: PropTypes.func
};

Switch.defaultProps = {
  on: false,
  onToggle: () => {}
};

/**
 * @component
 */
export default Switch;
