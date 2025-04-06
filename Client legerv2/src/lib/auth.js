import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { isAdminEmail } from '@/config/admins';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function generateToken(user) {
  if (!user || !user.id || !user.email) {
    console.error('Données utilisateur invalides:', user);
    throw new Error('Invalid user data');
  }

  // Vérifier si l'utilisateur est un administrateur
  const isAdmin = isAdminEmail(user.email);
  console.log('Vérification admin pour:', user.email, 'Résultat:', isAdmin);

  const payload = {
    id: user.id,
    email: user.email,
    isAdmin: isAdmin
  };

  console.log('Payload du token:', payload);
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Token décodé:', decoded);
    return decoded;
  } catch (error) {
    console.error('Erreur de vérification du token:', error);
    return null;
  }
}

export async function getUser() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  
  if (!token) {
    console.log('Pas de token trouvé');
    return null;
  }
  
  const user = verifyToken(token);
  console.log('Utilisateur récupéré:', user);
  return user;
}

export function isAdmin(user) {
  const adminStatus = user?.isAdmin === true;
  console.log('Vérification statut admin pour:', user?.email, 'Résultat:', adminStatus);
  return adminStatus;
}

export function isAuthenticated(user) {
  return !!user;
}

export async function checkRole(roleRequired) {
  const user = await getUser();
  
  if (!user) {
    throw new Error('Non authentifié');
  }
  
  if (roleRequired === 'admin' && !isAdmin(user)) {
    throw new Error('Accès non autorisé');
  }
  
  return true;
}
