package com.appdevg5.technominds.Message;

import com.appdevg5.technominds.Message.MessageEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

/**
 * Service layer for managing Message-related business logic (sending, retrieving conversations).
 * Assumes MessageRepository is also in this package and uses nested property path method names
 * (e.g. findByReceiver_Id, findBySender_IdAndReceiver_IdOrderByCreatedAtAsc).
 */
@Service
public class MessageService {

    private final MessageRepository messageRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    // READ
    public Optional<MessageEntity> getMessageById(Integer id) {
        return messageRepository.findById(id);
    }

    /**
     * Finds messages where the given profile is the receiver.
     * Repository method expected: List<MessageEntity> findByReceiver_Id(Integer receiverId);
     */
    public List<MessageEntity> getMessagesReceivedBy(Integer receiverId) {
        return messageRepository.findByReceiver_Id(receiverId);
    }

    /**
     * Retrieves the chronological conversation between two users.
     *
     * Repository methods expected:
     * List<MessageEntity> findBySender_IdAndReceiver_IdOrderByCreatedAtAsc(Integer senderId, Integer receiverId);
     */
    public List<MessageEntity> getConversation(Integer user1Id, Integer user2Id) {
        // Messages user1 -> user2
        List<MessageEntity> sent = messageRepository.findBySender_IdAndReceiver_IdOrderByCreatedAtAsc(user1Id, user2Id);
        // Messages user2 -> user1
        List<MessageEntity> received = messageRepository.findBySender_IdAndReceiver_IdOrderByCreatedAtAsc(user2Id, user1Id);

        // Combine lists into a new list and sort by createdAt to ensure correct chronological order
        List<MessageEntity> conversation = new ArrayList<>(sent.size() + received.size());
        conversation.addAll(sent);
        conversation.addAll(received);

        // Sort by createdAt (createdAt corresponds to the messages.created_at column)
        conversation.sort(Comparator.comparing(MessageEntity::getCreatedAt, Comparator.nullsFirst(Comparator.naturalOrder())));
        return conversation;
    }

    // CREATE
    @Transactional
    public MessageEntity sendMessage(MessageEntity message) {
        // Ensure isRead is false on creation
        message.setIsRead(false);
        return messageRepository.save(message);
    }

    // UPDATE (Mark as read)
    @Transactional
    public Optional<MessageEntity> markAsRead(Integer messageId) {
        return messageRepository.findById(messageId).map(message -> {
            message.setIsRead(true);
            return messageRepository.save(message);
        });
    }

    // DELETE
    @Transactional
    public void deleteMessage(Integer id) {
        messageRepository.deleteById(id);
    }
}