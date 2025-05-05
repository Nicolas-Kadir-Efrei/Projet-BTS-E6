'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface NotificationItemProps {
  id: number;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  data?: any;
  onRead: (id: number) => void;
  onAction?: (id: number, action: string, data?: any) => void;
}

export default function NotificationItem({
  id,
  title,
  message,
  type,
  isRead,
  createdAt,
  data,
  onRead,
  onAction
}: NotificationItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleClick = () => {
    if (!isRead) {
      onRead(id);
    }
    setIsExpanded(!isExpanded);
  };
  
  const getIcon = () => {
    switch (type) {
      case 'TEAM_INVITE':
        return (
          <div className="flex-shrink-0 rounded-full bg-blue-100 p-2">
            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        );
      case 'TOURNAMENT_REQUEST':
        return (
          <div className="flex-shrink-0 rounded-full bg-purple-100 p-2">
            <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        );
      case 'REQUEST_ACCEPTED':
        return (
          <div className="flex-shrink-0 rounded-full bg-green-100 p-2">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'REQUEST_REJECTED':
        return (
          <div className="flex-shrink-0 rounded-full bg-red-100 p-2">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="flex-shrink-0 rounded-full bg-gray-100 p-2">
            <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };
  
  const renderActions = () => {
    if (!onAction) return null;
    
    switch (type) {
      case 'TEAM_INVITE':
        return (
          <div className="mt-3 flex space-x-3">
            <button
              onClick={() => onAction(id, 'ACCEPT', data)}
              className="flex-1 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
            >
              Accepter
            </button>
            <button
              onClick={() => onAction(id, 'REJECT', data)}
              className="flex-1 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
            >
              Refuser
            </button>
          </div>
        );
      case 'TOURNAMENT_REQUEST':
        if (data?.isAdmin) {
          return (
            <div className="mt-3 flex space-x-3">
              <button
                onClick={() => onAction(id, 'ACCEPT', data)}
                className="flex-1 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
              >
                Accepter
              </button>
              <button
                onClick={() => onAction(id, 'REJECT', data)}
                className="flex-1 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
              >
                Refuser
              </button>
            </div>
          );
        }
        return null;
      default:
        return null;
    }
  };
  
  return (
    <div 
      className={`mb-3 rounded-lg border p-4 transition-all duration-200 hover:bg-gray-50 ${
        !isRead ? 'border-l-4 border-l-blue-500 bg-blue-50' : 'border-gray-200'
      }`}
      onClick={handleClick}
    >
      <div className="flex items-start">
        {getIcon()}
        <div className="ml-3 flex-1">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-black">{title}</p>
            <p className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: fr })}
            </p>
          </div>
          <p className="mt-1 text-sm text-gray-600">
            {isExpanded ? message : message.length > 100 ? `${message.substring(0, 100)}...` : message}
          </p>
          {message.length > 100 && (
            <button 
              className="mt-1 text-xs font-medium text-blue-600"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              {isExpanded ? 'Voir moins' : 'Voir plus'}
            </button>
          )}
          {isExpanded && renderActions()}
        </div>
      </div>
    </div>
  );
}
