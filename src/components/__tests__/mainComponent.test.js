import React from 'react';
import renderer from 'react-test-renderer';
import { View } from 'react-native';

import { Login } from '../mainComponent/LoginScreen';

it('Renders login screen component', () => {
    const rendered = renderer.create(<Login> <View /> </Login>).toJSON();
    expect(rendered).toMatchSnapshot();
});


