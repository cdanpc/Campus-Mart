package com.appdevg5.technominds.Message;

import com.appdevg5.technominds.Message.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Message entity.
 */
@Repository
public interface MessageRepository extends JpaRepository<MessageEntity, Integer> {

    /**
     * Finds all messages sent by a specific sender.
     * Uses nested property path to match MessageEntity.sender.id
     */
    List<MessageEntity> findBySender_Id(Integer senderId);

    /**
     * Finds all messages received by a specific receiver.
     * Uses nested property path to match MessageEntity.receiver.id
     */
    List<MessageEntity> findByReceiver_Id(Integer receiverId);

    /**
     * Finds the conversation history between two specific users in chronological order.
     * Uses nested property path and the createdAt timestamp.
     */
    List<MessageEntity> findBySender_IdAndReceiver_IdOrderByCreatedAtAsc(Integer senderId, Integer receiverId);
}