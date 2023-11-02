import { login } from "./login";
import { save } from "../../storage/index";

jest.mock('../constants.js', () => ({ apiPath: 'http://testingisfun.no' }));
jest.mock('../headers.js', () => ({
    headers: jest.fn().mockReturnValue({ "Content-Type": "application/json" })
  }));
jest.mock('../../storage/index', () => ({
    save: jest.fn()
}));


beforeEach(() => {
   global.fetch = jest.fn();
});

it('Fetches and stores the token in browser storage', async () => { 
    const mockToken = "Token123";
    const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValueOnce({ accessToken: mockToken })
    }; 
    global.fetch.mockResolvedValueOnce(mockResponse);

    await login('user@test.com', 'password123');
     
    expect(save).toHaveBeenCalledWith('token', mockToken);
  
});

