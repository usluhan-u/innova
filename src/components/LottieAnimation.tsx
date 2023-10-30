import { Player } from '@lottiefiles/react-lottie-player';
import React from 'react';

interface LottieAnimationProps {
  src: string;
  hover?: boolean;
}

const LottieAnimation = React.forwardRef(
  ({ src }: LottieAnimationProps, ref: React.ForwardedRef<Player>) => (
    <Player
      ref={ref}
      loop
      hover
      src={src}
      style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
    />
  )
);

export default LottieAnimation;
