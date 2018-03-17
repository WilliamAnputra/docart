import React from 'react';


import * as constants from '../constants';

it('Renders constants ', () => {
    expect(constants).toMatchSnapshot();
});

