package com.appdevg5.technominds.Message;

import com.appdevg5.technominds.Message.MessageEntity;
import com.appdevg5.technominds.Message.MessageService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

/**
 * REST Controller for managing user messages and conversations.
 * Base URL: /api/messages
 */
@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    // GET /api/messages/user/{userId} - Get messages received by a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<MessageEntity>> getMessagesForUser(@PathVariable Integer userId) {
        List<MessageEntity> messages = messageService.getMessagesReceivedBy(userId);
        return ResponseEntity.ok(messages);
    }

    // GET /api/messages/conversation/{user1Id}/{user2Id} - Get conversation history
    @GetMapping("/conversation/{user1Id}/{user2Id}")
    public ResponseEntity<List<MessageEntity>> getConversation(@PathVariable Integer user1Id, @PathVariable Integer user2Id) {
        List<MessageEntity> convo = messageService.getConversation(user1Id, user2Id);
        return ResponseEntity.ok(convo);
    }

    // POST /api/messages - Send a new message
    @PostMapping
    public ResponseEntity<MessageEntity> sendMessage(@Valid @RequestBody MessageEntity message) {
        MessageEntity newMessage = messageService.sendMessage(message);

        // Build Location header: /api/messages/{id}
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newMessage.getId())
                .toUri();

        return ResponseEntity.created(location).body(newMessage);
    }

    // PATCH /api/messages/{id}/read - Mark a message as read
    @PatchMapping("/{id}/read")
    public ResponseEntity<MessageEntity> markMessageAsRead(@PathVariable Integer id) {
        return messageService.markAsRead(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // DELETE /api/messages/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Integer id) {
        return messageService.getMessageById(id)
                .map(existing -> {
                    messageService.deleteMessage(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}