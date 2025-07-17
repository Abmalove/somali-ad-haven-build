import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { BottomNavigation } from '@/components/BottomNavigation';
import { MessageCircle, Send, Search } from 'lucide-react';

export const Messages = () => {
  const { t } = useLanguage();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const mockChats = [
    {
      id: '1',
      name: 'Ahmed Mohamed',
      lastMessage: t('Baabuurku waa mid fiican', 'The car looks good'),
      timestamp: '2 min',
      unread: 2,
      avatar: 'AM'
    },
    {
      id: '2',
      name: 'Fadumo Ali',
      lastMessage: t('Qiimaha ma hoos u dhici kartaa?', 'Can you reduce the price?'),
      timestamp: '1h',
      unread: 0,
      avatar: 'FA'
    },
    {
      id: '3',
      name: 'Omar Hassan',
      lastMessage: t('Mahadsanid', 'Thank you'),
      timestamp: '3h',
      unread: 1,
      avatar: 'OH'
    }
  ];

  const mockMessages = [
    {
      id: '1',
      sender: 'Ahmed Mohamed',
      message: t('Salaan, baabuurkan miyaad iibineysaa?', 'Hello, are you selling this car?'),
      timestamp: '10:30',
      isMe: false
    },
    {
      id: '2',
      sender: 'Me',
      message: t('Haa, waan iibinayaa', 'Yes, I am selling it'),
      timestamp: '10:32',
      isMe: true
    },
    {
      id: '3',
      sender: 'Ahmed Mohamed',
      message: t('Baabuurku waa mid fiican', 'The car looks good'),
      timestamp: '10:33',
      isMe: false
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <LanguageToggle />
      
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <MessageCircle className="h-6 w-6" />
          {t('Farriimaha', 'Messages')}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[600px]">
          {/* Chat List */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t('Raadi qof', 'Search people')}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {mockChats.map((chat) => (
                    <div
                      key={chat.id}
                      className={`p-4 cursor-pointer hover:bg-muted/50 border-b border-border ${
                        selectedChat === chat.id ? 'bg-primary/5' : ''
                      }`}
                      onClick={() => setSelectedChat(chat.id)}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{chat.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium truncate">{chat.name}</p>
                            <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                        </div>
                        {chat.unread > 0 && (
                          <div className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {chat.unread}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              {selectedChat ? (
                <>
                  <CardHeader className="border-b border-border">
                    <CardTitle className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {mockChats.find(c => c.id === selectedChat)?.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {mockChats.find(c => c.id === selectedChat)?.name}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                      {mockMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.isMe
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{message.message}</p>
                            <p className={`text-xs mt-1 ${
                              message.isMe ? 'text-primary-foreground/70' : 'text-muted-foreground'
                            }`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  
                  <div className="p-4 border-t border-border">
                    <div className="flex gap-2">
                      <Input
                        placeholder={t('Qor fariin...', 'Type a message...')}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            setNewMessage('');
                          }
                        }}
                      />
                      <Button size="sm">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <CardContent className="flex-1 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4" />
                    <p>{t('Dooro qof si aad ula hadashid', 'Select a person to start chatting')}</p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};