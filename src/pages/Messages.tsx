import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { BottomNavigation } from '@/components/BottomNavigation';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, MessageCircle, Search, Send, Store, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Footer } from '@/components/ui/footer';

interface Message {
  id: string;
  message: string;
  sender_id: string;
  receiver_id: string;
  ad_id: string;
  created_at: string;
  ads?: {
    title: string;
    price: number;
    currency: string;
  };
}

interface Conversation {
  ad_id: string;
  other_user_id: string;
  other_user_name: string;
  ad_title: string;
  ad_price: number;
  ad_currency: string;
  last_message: string;
  last_message_time: string;
  unread_count: number;
}

export const Messages = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchConversations();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages'
        },
        (payload) => {
          if (payload.new.receiver_id === user.id || payload.new.sender_id === user.id) {
            fetchConversations();
            if (selectedConversation) {
              fetchMessages(selectedConversation.ad_id, selectedConversation.other_user_id);
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, selectedConversation]);

  const fetchConversations = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          ads!messages_ad_id_fkey(title, price, currency)
        `)
        .or(`sender_id.eq.${user?.id},receiver_id.eq.${user?.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Group messages by ad_id and other user
      const conversationMap = new Map<string, Conversation>();
      
      // First, get all profiles for shop names and usernames
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('user_id, shop_name, username, email');

      const profilesMap = new Map();
      profilesData?.forEach(profile => {
        profilesMap.set(profile.user_id, profile);
      });

      data?.forEach((msg: any) => {
        const otherUserId = msg.sender_id === user?.id ? msg.receiver_id : msg.sender_id;
        const otherProfile = profilesMap.get(otherUserId);
        const otherUserName = otherProfile?.shop_name || otherProfile?.username || otherProfile?.email?.split('@')[0] || `User ${otherUserId.substring(0, 8)}`;
        
        const key = `${msg.ad_id}-${otherUserId}`;
        
        if (!conversationMap.has(key)) {
          conversationMap.set(key, {
            ad_id: msg.ad_id,
            other_user_id: otherUserId,
            other_user_name: otherUserName || t('Isticmaale', 'User'),
            ad_title: msg.ads?.title || '',
            ad_price: msg.ads?.price || 0,
            ad_currency: msg.ads?.currency || 'USD',
            last_message: msg.message,
            last_message_time: msg.created_at,
            unread_count: msg.receiver_id === user?.id ? 1 : 0
          });
        }
      });

      setConversations(Array.from(conversationMap.values()));
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (adId: string, otherUserId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          ads!messages_ad_id_fkey(title, price, currency)
        `)
        .eq('ad_id', adId)
        .or(`and(sender_id.eq.${user?.id},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${user?.id})`)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      await supabase
        .from('messages')
        .insert({
          sender_id: user?.id,
          receiver_id: selectedConversation.other_user_id,
          ad_id: selectedConversation.ad_id,
          message: newMessage
        });

      setNewMessage('');
      toast({
        title: t('Guuleysatay!', 'Success!'),
        description: t('Farriimaadka waa la diray', 'Message sent successfully')
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: t('Khalad', 'Error'),
        description: t('Khalad ayaa dhacay', 'Failed to send message'),
        variant: 'destructive'
      });
    }
  };

  const selectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    fetchMessages(conversation.ad_id, conversation.other_user_id);
  };

  const filteredConversations = conversations.filter(conv =>
    conv.other_user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.ad_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <LanguageToggle />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('Dib u noqo', 'Back')}
            </Button>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <MessageCircle className="h-6 w-6" />
              {t('Farriimaadaha', 'Messages')}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <Card className="md:col-span-1 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
              <CardTitle className="text-lg font-semibold">{t('Wadahadallada', 'Conversations')}</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t('Raadi wadahadal...', 'Search conversations...')}
                  className="pl-10 border-border/50"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="p-4">
                  <div className="animate-pulse space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-16 bg-muted rounded"></div>
                    ))}
                  </div>
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  {t('Wadahadal ma jiro', 'No conversations yet')}
                </div>
              ) : (
                  <div className="space-y-2">
                    {filteredConversations.map((conversation) => (
                      <div
                        key={`${conversation.ad_id}-${conversation.other_user_id}`}
                        className={`p-4 hover:bg-primary/5 cursor-pointer border rounded-lg transition-all duration-200 ${
                          selectedConversation?.ad_id === conversation.ad_id &&
                          selectedConversation?.other_user_id === conversation.other_user_id
                            ? 'bg-primary/10 border-primary/20 shadow-sm'
                            : 'border-border/30'
                        }`}
                        onClick={() => selectConversation(conversation)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold line-clamp-1 text-foreground">{conversation.other_user_name}</h3>
                          <span className="text-xs text-muted-foreground">
                            {new Date(conversation.last_message_time).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1 mb-2 font-medium">
                          {conversation.ad_title}
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-muted-foreground line-clamp-1 flex-1 mr-2">
                            {conversation.last_message}
                          </p>
                          <Badge variant="outline" className="text-xs bg-primary/5 border-primary/20">
                            {conversation.ad_currency} {conversation.ad_price.toLocaleString()}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Messages View */}
          <Card className="md:col-span-2 shadow-lg">
            {selectedConversation ? (
              <>
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-b border-blue-200/50 dark:border-blue-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <Store className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-foreground">{selectedConversation.other_user_name}</h3>
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{selectedConversation.ad_title}</p>
                    </div>
                    <Badge variant="outline" className="bg-white/80 dark:bg-gray-900/80 border-blue-200 dark:border-blue-700">
                      {selectedConversation.ad_currency} {selectedConversation.ad_price.toLocaleString()}
                    </Badge>
                  </div>
                </CardHeader>
                
                {/* Send Message Input (moved to top) */}
                <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
                  <div className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder={t('Qor farriimaadkaaga...', 'Type your message...')}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1 bg-white/80 dark:bg-gray-900/80 border-blue-200 dark:border-blue-700 focus:border-blue-400 dark:focus:border-blue-500"
                    />
                    <Button 
                      onClick={sendMessage} 
                      disabled={!newMessage.trim()} 
                      className="px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <CardContent className="flex flex-col h-full p-0">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-3 p-4 max-h-96 bg-gradient-to-b from-blue-50/30 to-purple-50/30 dark:from-blue-950/20 dark:to-purple-950/20">
                    {messages.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                          <MessageSquare className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                        </div>
                        <p className="text-muted-foreground">
                          {t('Wali farriin ma jirto', 'No messages yet')}
                        </p>
                      </div>
                    ) : (
                      messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.sender_id === user?.id ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-xs p-3 rounded-xl shadow-md ${
                              message.sender_id === user?.id
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md'
                                : 'bg-gradient-to-r from-gray-100 to-blue-50 dark:from-gray-800 dark:to-blue-900/30 text-foreground border border-blue-200/50 dark:border-blue-700/50 rounded-bl-md'
                            }`}
                          >
                            <p className="text-sm font-medium leading-relaxed">{message.message}</p>
                            <p className={`text-xs mt-1 ${
                              message.sender_id === user?.id 
                                ? 'text-blue-100' 
                                : 'text-muted-foreground'
                            }`}>
                              {new Date(message.created_at).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center text-muted-foreground">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>{t('Dooro wadahadal si aad u aragto farriimaadaha', 'Select a conversation to view messages')}</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};