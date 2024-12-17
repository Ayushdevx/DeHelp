import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bell, 
  MessageSquare, 
  Vote, 
  X, 
  Check, 
  Filter, 
  AlertCircle 
} from "lucide-react";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Enhanced notification types
const NOTIFICATION_TYPES = {
  PROPOSAL: { 
    icon: Bell, 
    color: 'bg-blue-100 text-blue-600', 
    actionable: true 
  },
  MESSAGE: { 
    icon: MessageSquare, 
    color: 'bg-green-100 text-green-600', 
    actionable: true 
  },
  VOTING: { 
    icon: Vote, 
    color: 'bg-purple-100 text-purple-600', 
    actionable: true 
  },
  ALERT: { 
    icon: AlertCircle, 
    color: 'bg-red-100 text-red-600', 
    actionable: false 
  }
};

const notifications = [
  {
    id: '1',
    type: 'PROPOSAL',
    title: "New Governance Proposal",
    description: "A new governance proposal needs your attention",
    time: "10m ago",
    priority: "high"
  },
  {
    id: '2',
    type: 'MESSAGE',
    title: "Community Message",
    description: "You received a new message from the community",
    time: "1h ago",
    priority: "medium"
  },
  {
    id: '3',
    type: 'VOTING',
    title: "Voting Period Ending",
    description: "Voting period for Proposal #123 ends in 2 days",
    time: "2h ago",
    priority: "high"
  },
  {
    id: '4',
    type: 'ALERT',
    title: "Security Update",
    description: "Potential security vulnerability detected",
    time: "3h ago",
    priority: "critical"
  }
];

export function NotificationsCenter() {
  const [filteredNotifications, setFilteredNotifications] = useState(notifications);
  const [activeFilter, setActiveFilter] = useState(null);
  const [expandedNotification, setExpandedNotification] = useState(null);

  // Filter notifications by type
  const filterNotifications = (type) => {
    setActiveFilter(type);
    if (type) {
      const filtered = notifications.filter(notification => notification.type === type);
      setFilteredNotifications(filtered);
    } else {
      setFilteredNotifications(notifications);
    }
  };

  // Mark notification as read/dismissed
  const handleNotificationAction = (id, action) => {
    const updatedNotifications = filteredNotifications.filter(notification => notification.id !== id);
    setFilteredNotifications(updatedNotifications);
  };

  return (
    <Card className="w-96 shadow-xl border-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-6 h-6" />
          Notifications
          <Badge variant="secondary" className="ml-2">
            {filteredNotifications.length}
          </Badge>
        </CardTitle>
        <div className="flex items-center gap-2">
          {Object.keys(NOTIFICATION_TYPES).map((type) => (
            <Button 
              key={type} 
              variant={activeFilter === type ? 'default' : 'outline'} 
              size="icon" 
              onClick={() => filterNotifications(activeFilter === type ? null : type)}
            >
              {React.createElement(NOTIFICATION_TYPES[type].icon, { 
                className: `w-4 h-4 ${activeFilter === type ? 'text-white' : ''}` 
              })}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 w-full pr-4">
          <AnimatePresence>
            {filteredNotifications.map((notification) => {
              const NotificationIcon = NOTIFICATION_TYPES[notification.type].icon;
              
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className={`
                    p-4 rounded-lg mb-2 cursor-pointer 
                    flex items-center justify-between 
                    ${NOTIFICATION_TYPES[notification.type].color}
                    hover:shadow-md transition-all
                  `}
                  onClick={() => setExpandedNotification(
                    expandedNotification?.id === notification.id ? null : notification
                  )}
                >
                  <div className="flex items-center space-x-4">
                    <NotificationIcon className="w-6 h-6" />
                    <div>
                      <h3 className="font-semibold">{notification.title}</h3>
                      {expandedNotification?.id === notification.id && (
                        <p className="text-sm mt-1">{notification.description}</p>
                      )}
                      <p className="text-xs opacity-70">{notification.time}</p>
                    </div>
                  </div>
                  {NOTIFICATION_TYPES[notification.type].actionable && (
                    <div className="flex space-x-2">
                      <Button 
                        size="icon" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNotificationAction(notification.id, 'accept');
                        }}
                      >
                        <Check className="w-4 h-4 text-green-600" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNotificationAction(notification.id, 'dismiss');
                        }}
                      >
                        <X className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default NotificationsCenter;