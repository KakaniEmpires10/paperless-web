declare module "#auth-utils" {
  interface User {
    name: string,
    email: string,
    image: string | null
    role: string
  }

  interface UserSession {
    lastLogedIn: Date
  }
}

export {};
