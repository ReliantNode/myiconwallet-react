import React from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
// import VisuallyHidden from '@reach/visually-hidden';
import PropTypes from 'prop-types';
import { animated, useTransition } from 'react-spring';

function BaseModal({ isOpen, onClose, children, ...props }) {
  const AnimatedDialogContent = animated(DialogContent);
  const AnimatedDialogOverlay = animated(DialogOverlay);
  const transitions = useTransition(isOpen, null, {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 10 },
  });

  return transitions.map(
    ({ item, key, props: styles }) =>
      item && (
        <AnimatedDialogOverlay onDismiss={onClose} style={{ opacity: styles.opacity }} key={key}>
          <AnimatedDialogContent
            style={{
              transform: styles.y.interpolate(value => `translate3d(0px, ${value}px, 0px)`),
            }}
            {...props}
          >
            {/* <button onClick={onClose}>
              <VisuallyHidden>Close</VisuallyHidden>
              <span aria-hidden>×</span>
            </button> */}
            <>{children}</>
          </AnimatedDialogContent>
        </AnimatedDialogOverlay>
      )
  );
}

BaseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default BaseModal;