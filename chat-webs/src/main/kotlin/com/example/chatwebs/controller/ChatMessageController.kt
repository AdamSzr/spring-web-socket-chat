package com.example.chatwebs.controller

import com.example.chatwebs.models.ChatMessage
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.stereotype.Controller
import java.time.Instant
import java.util.Date

@Controller
class ChatMessageController {

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    fun get(chatMessage: ChatMessage): ChatMessage {
        return ChatMessage(Instant.now().toString()+chatMessage.value)
    }

}
