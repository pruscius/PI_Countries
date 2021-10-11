import React from 'react';
import Landing from './Landing.jsx';

import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({adapter: new Adapter() });

describe('Landing Component', () =>
    it('should render a button with the text home', () => {
        const wrapper = shallow(<Landing />);
        const button = wrapper.find('button');
        expect(button.text()).toBe('Home');
    })
)