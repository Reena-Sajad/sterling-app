// Simulated user database for testing
const mockUsers = [
  { 
    id: 1,
    email: "john.doe@plateau.com", 
    password: "emp123", 
    role: "user",
    name: "John Doe",
    department: "Data Quality"
  },
  { 
    id: 2,
    email: "sarah.munger@plateau.com", 
    password: "mgr123", 
    role: "user",
    name: "Sarah Munger",
    department: "Data Quality"
  },
  { 
    id: 3,
    email: "admin1@plateau.com", 
    password: "admin123", 
    role: "admin",
    name: "Admin User",
    department: "IT"
  }
];

// Simulate network delay (makes it feel like a real API)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  /**
   * Simulate login API call
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<{success: boolean, user?: object, error?: string}>}
   */
  async login(email, password) {
    // Simulate network delay (500ms)
    await delay(500);
    
    // Find user with matching credentials
    const user = mockUsers.find(
      u => u.email === email && u.password === password
    );
    
    if (user) {
      // Don't return password to frontend (security best practice)
      const { password: _, ...userWithoutPassword } = user;
      
      return { 
        success: true, 
        user: userWithoutPassword 
      };
    }
    
    // Invalid credentials
    return { 
      success: false, 
      error: "Invalid email or password" 
    };
  },

  /**
   * Simulate logout API call
   * In a real app, this might invalidate tokens on the server
   */
  async logout() {
    await delay(300);
    return { success: true };
  },

  /**
   * Get all test users (for development/demo purposes only)
   * Remove this in production!
   */
  getTestUsers() {
    return mockUsers.map(u => ({
      email: u.email,
      password: u.password,
      role: u.role
    }));
  }
};