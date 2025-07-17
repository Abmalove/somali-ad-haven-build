import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Bell, X, MessageCircle, Heart, ShoppingCart } from 'lucide-react';

interface Notification {
  id: string;
  type: 'message' | 'favorite' | 'sale';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export const NotificationSystem = () => {
  const { t } = useLanguage();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock notifications for demo
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'message',
        title: t('Fariin cusub', 'New Message'),
        message: t('Ahmed wuxuu ku soo qoray xayeysiiskaaga', 'Ahmed sent you a message about your ad'),
        timestamp: new Date(Date.now() - 30000),
        read: false
      },
      {
        id: '2',
        type: 'favorite',
        title: t('Jecel cusub', 'New Favorite'),
        message: t('Qof ayaa jecel xayeysiiskaaga baabuurka', 'Someone liked your car ad'),
        timestamp: new Date(Date.now() - 300000),
        read: false
      }
    ];
    setNotifications(mockNotifications);
  }, [t]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'message': return MessageCircle;
      case 'favorite': return Heart;
      case 'sale': return ShoppingCart;
      default: return Bell;
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>

      {showNotifications && (
        <div className="absolute right-0 top-full mt-2 w-80 max-h-96 overflow-y-auto bg-card border border-border rounded-lg shadow-lg z-50">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold">{t('Ogeysiisyo', 'Notifications')}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              {t('Ogeysiis ma jiro', 'No notifications')}
            </div>
          ) : (
            <div className="p-2">
              {notifications.map((notification) => {
                const Icon = getIcon(notification.type);
                return (
                  <Card
                    key={notification.id}
                    className={`mb-2 cursor-pointer transition-colors ${
                      !notification.read ? 'bg-primary/5' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <Icon className="h-4 w-4 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{notification.title}</p>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};