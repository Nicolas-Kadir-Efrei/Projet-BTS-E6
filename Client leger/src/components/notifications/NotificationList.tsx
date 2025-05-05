'use client';

import { useState, useEffect } from 'react';
import NotificationItem from './NotificationItem';
import { useAuth } from '@/contexts/AuthContext';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  data?: any;
}

export default function NotificationList() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/notifications', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors du chargement des notifications');
      }

      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Erreur:', error);
      setError('Une erreur est survenue lors du chargement des notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/notifications/${id}/read`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de la notification');
      }

      // Mettre à jour localement
      setNotifications(notifications.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      ));
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleAction = async (id: number, action: string, data?: any) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/notifications/${id}/action`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ action, data })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'exécution de l\'action');
      }

      // Marquer comme lu et rafraîchir les notifications
      await handleMarkAsRead(id);
      fetchNotifications();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/notifications/read-all', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour des notifications');
      }

      // Mettre à jour localement
      setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const displayedNotifications = showAll 
    ? notifications 
    : notifications.filter(notif => !notif.isRead);

  const unreadCount = notifications.filter(notif => !notif.isRead).length;

  if (loading) {
    return (
      <div className="p-4 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-black">Notifications</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {showAll ? 'Afficher non lues' : 'Afficher toutes'}
            </button>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Tout marquer comme lu
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto p-4">
        {displayedNotifications.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            {showAll ? 'Aucune notification' : 'Aucune nouvelle notification'}
          </div>
        ) : (
          displayedNotifications.map(notification => (
            <NotificationItem
              key={notification.id}
              id={notification.id}
              title={notification.title}
              message={notification.message}
              type={notification.type}
              isRead={notification.isRead}
              createdAt={notification.createdAt}
              data={notification.data}
              onRead={handleMarkAsRead}
              onAction={handleAction}
            />
          ))
        )}
      </div>
    </div>
  );
}
