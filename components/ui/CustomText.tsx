import React from 'react';
import { Text as RNText, TextStyle } from 'react-native';

const variantStyles: Record<string, TextStyle> = {
  // Body
  body1: { fontSize: 18, fontWeight: '700' },
  body2: { fontSize: 16, fontWeight: '500' },
  body3: { fontSize: 14, fontWeight: '500' },

  // Subtitles
  subtitle1: { fontSize: 14, fontWeight: '300' },
  subtitle2: { fontSize: 14, fontWeight: '500' },
  subtitle3: { fontSize: 14, fontWeight: '500' },
  subtitle4: { fontSize: 11, fontWeight: '300' },

  // Captions
  caption1: { fontSize: 20, fontWeight: '400' },
  caption2: { fontSize: 14, fontWeight: '400' },
  caption3: { fontSize: 17, fontWeight: '400' },
  caption4: { fontSize: 17, fontWeight: '300' },

  // Titles / Headings
  title1: { fontSize: 28, fontWeight: '700' },
  title2: { fontSize: 16, fontWeight: '600' },

  // Logical aliases (new, more intuitive names)
  heading1: { fontSize: 28, fontWeight: '700' },
  heading2: { fontSize: 16, fontWeight: '600' },
  body: { fontSize: 16, fontWeight: '400' },
  caption: { fontSize: 12, fontWeight: '400' },
};

interface CustomTextProps {
  children: React.ReactNode;
  variant?: keyof typeof variantStyles;
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  style?: TextStyle;
  numberOfLines?: number;
  onPress?: () => void;
}

const CustomText: React.FC<CustomTextProps> = ({ 
  children, 
  variant = 'body1', 
  color = undefined, 
  align = undefined, 
  style = undefined, 
  ...props 
}) => {
  const resolvedVariant = variantStyles[variant] ? variant : 'body1';

  return (
    <RNText
      style={[
        variantStyles[resolvedVariant],
        color ? { color } : null,
        align ? { textAlign: align } : null,
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

export default CustomText;
