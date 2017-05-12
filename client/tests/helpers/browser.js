import { jsdom } from 'jsdom'; //eslint-disable-line

import * as chai from 'chai';
import spies from 'chai-spies';
import { mount, shallow, render } from 'enzyme';

const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

chai.use(spies);

global.expect = chai.expect;
global.mount = mount;
global.shallow = shallow;
global.render = render;
global.spy = spies;

global.navigator = {
  userAgent: 'node.js'
};
