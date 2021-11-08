import 'jest';
import * as Exports from '.';

describe('package exports', () => {
    it('should export public symbols', () => {
        expect(Exports).toMatchSnapshot();
    });
});
