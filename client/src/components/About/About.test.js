import React from 'react';
import About from './About.jsx';

import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({adapter: new Adapter() });

describe('About Component', () =>
    it('should render a p', () => {
        const wrapper = shallow(<About />);
        const about = wrapper.find('h2');
        // console.log(p.text());
        expect(about.text()).toBe('About');
    })
)