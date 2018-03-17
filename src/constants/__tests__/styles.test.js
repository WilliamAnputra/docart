import React from 'react';

import * as globalColors from '../styles/global';

it('Renders colors', () => {
    expect(globalColors).toMatchSnapshot();
});

