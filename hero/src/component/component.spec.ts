import {Component} from './component';

describe('Component', () => {
    test('throws error when selector is null', () => {
        let metadata = {
            selector: '',
            template: ''
        };
        expect(() => {
            Component(metadata)({})
        }).toThrowError('must specify selector');
    });

    test('throws error when selector does not contain hyphen', () => {
        let metadata = {
            selector: 'app',
            template: ''
        };
        expect(() => {
            Component(metadata)({})
        }).toThrowError('app is not a valid custom element name');
    });

    test('accepts app-root as a valid selector', () => {
        let metadata = {
            selector: 'app-root',
            template: ''
        };
        expect(() => {
            Component(metadata)({})
        }).not.toThrow('app-root is not a valid custom element name');
    });

    test('accepts app-root-1 as a valid selector', () => {
        let metadata = {
            selector: 'app-root-1',
            template: ''
        };
        expect(() => {
            Component(metadata)({})
        }).not.toThrow('app-root-1 is not a valid custom element name');
    });
});
