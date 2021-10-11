import React from 'react';
import About from './About.jsx';

import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({adapter: new Adapter() });

describe('About Component', () =>
    it('should render a p', () => {
        const wrapper = shallow(<About />);
        const p = wrapper.find('p');
        // console.log(p.text());
        expect(p.text()).toBe('This is an individual project developed by Andrés Frank, for the puropse of evaluation from the teaching instructors at Henry School of Web Development.');
    })
)