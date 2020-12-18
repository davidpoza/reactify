import 'jest-enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@babel/polyfill';

// Configuramos Enzyme
configure({ adapter: new Adapter() });
