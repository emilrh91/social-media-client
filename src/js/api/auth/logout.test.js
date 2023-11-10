import { logout } from './logout';
import * as storageUtils from '../../storage/index.js';

jest.mock('../../storage/index.js', () => ({
        remove: jest.fn() 
}));

test('The logout function clears the token and profile from browser storage', () => {
    logout();

    expect(storageUtils.remove).toHaveBeenCalledTimes(2);
    expect(storageUtils.remove).toHaveBeenNthCalledWith(1, 'token');
    expect(storageUtils.remove).toHaveBeenNthCalledWith(2, 'profile');    
});