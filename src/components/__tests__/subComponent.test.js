import React from 'react';
import renderer from 'react-test-renderer';
import { View } from 'react-native';

import { AttachmentAlertBox } from '../subComponent/AttachmentAlertBox';

it('Renders Attachment screen component', () => {
    const rendered = renderer.create(
        <AttachmentAlertBox>
            <View />
        </AttachmentAlertBox>).toJSON();
    expect(rendered).toMatchSnapshot();
});
