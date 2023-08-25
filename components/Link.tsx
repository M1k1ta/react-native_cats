import React, {useCallback} from 'react';
import {Alert, Button, Linking} from 'react-native';

interface Link {
  url: string;
  children: string;
};

export const Link = ({url, children}: Link) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};
