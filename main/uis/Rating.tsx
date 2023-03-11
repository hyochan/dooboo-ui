import type {StyleProp, ViewStyle} from 'react-native';
import styled, {css} from '@emotion/native';

import {Icon} from './Icon';
import type {ReactElement} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {View} from 'react-native';
import {useState} from 'react';

const Container = styled.View`
  flex-direction: row;
`;

const StarContainer = styled.View`
  flex-direction: row;
`;

type Styles = {
  starContainer: StyleProp<ViewStyle>;
};

type Props = {
  styles?: Styles;
  style?: StyleProp<ViewStyle>;
  size?: number;
  initialRating?: number;
  direction?: 'horizontal' | 'vertical';
  allowHalfRating?: boolean;
  onRatingUpdate?: (score: number) => void;
  disabled?: boolean;
  color?: string;
};

export default function Rating({
  style,
  styles,
  initialRating = 0,
  size = 24,
  onRatingUpdate,
  direction = 'horizontal',
  allowHalfRating = true,
  disabled = false,
  color,
}: Props): ReactElement {
  const [rating, setRating] = useState(initialRating);

  const handlePress = (newRating: number, halfPressed?: boolean): void => {
    const convertedRating = newRating + (!halfPressed ? 0.5 : 0);

    setRating(convertedRating);

    if (onRatingUpdate) {
      onRatingUpdate(convertedRating);
    }
  };

  const renderStarIcon = ({
    key,
    position,
  }: {
    key: string;
    position: number;
  }): ReactElement => {
    const filled = rating >= position + (allowHalfRating ? 0.5 : 0);
    const iconName = filled ? 'Star' : 'StarAlt';
    const halfFilled =
      rating >= position && rating < position + (allowHalfRating ? 0.5 : 0);

    return (
      <StarContainer
        key={key}
        style={[
          css`
            width: ${size}px;
          `,
          styles?.starContainer,
        ]}
      >
        {halfFilled && allowHalfRating ? (
          <View style={{position: 'absolute'}}>
            <Icon
              name="StarAlt"
              size={size}
              style={{position: 'absolute'}}
              color={color}
            />
            <Icon name="StarHalf" size={size} color={color} />
          </View>
        ) : (
          <Icon
            name={iconName}
            size={size}
            style={{position: 'absolute'}}
            color={color}
          />
        )}
        <TouchableOpacity
          onPress={() => handlePress(position, true)}
          disabled={disabled}
        >
          <View
            style={{
              width: size / 2,
              height: size,
              backgroundColor: 'transparent',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePress(position)}
          disabled={disabled}
        >
          <View
            style={{
              width: size / 2,
              height: size,
              backgroundColor: 'transparent',
            }}
          />
        </TouchableOpacity>
      </StarContainer>
    );
  };

  return (
    <Container
      style={[
        css`
          flex-direction: ${direction === 'horizontal' ? 'row' : 'column'};
        `,
        style,
      ]}
    >
      {[...Array(5)].map((_, index) => {
        const position = index + 0.5;

        return renderStarIcon({key: `${_}-${index}`, position});
      })}
    </Container>
  );
}
