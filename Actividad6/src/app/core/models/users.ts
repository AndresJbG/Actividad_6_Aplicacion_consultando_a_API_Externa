export interface User {
  id?: number;
  name: string;
  lastname?: string;        // 👈 agregado para el mock
  email: string;
  username?: string;
  phone?: string;
  website?: string;
  image?: string;
  address?: { street?: string; city?: string; };
}
