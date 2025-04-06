// Liste des emails administrateurs
export const ADMIN_EMAILS = [
    'nicolasciftci@gmail.com'
];

// Fonction pour vérifier si un email est admin
export function isAdminEmail(email) {
    return ADMIN_EMAILS.includes(email);
}
