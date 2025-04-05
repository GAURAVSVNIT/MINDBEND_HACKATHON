
export {};
async function signIn(email: string, password: string): Promise<string> {
    // Simulate an API call to authenticate the user and return a token
    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    // Mock API response
    if (email === 'test@example.com' && password === 'password123') {
        return 'mocked-jwt-token';
    } else {
        throw new Error('Invalid email or password');
    }
}
