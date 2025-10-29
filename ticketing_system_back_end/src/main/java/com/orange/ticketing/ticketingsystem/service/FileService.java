package com.orange.ticketing.ticketingsystem.service;

import com.orange.ticketing.ticketingsystem.entity.Attachment;
import com.orange.ticketing.ticketingsystem.entity.Ticket;
import com.orange.ticketing.ticketingsystem.entity.User;
import com.orange.ticketing.ticketingsystem.repository.AttachmentRepository;
import com.orange.ticketing.ticketingsystem.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileService {
    
    private final AttachmentRepository attachmentRepository;
    private final TicketRepository ticketRepository;
    private final String uploadDir = "uploads/";
    
    public Attachment uploadFile(Long ticketId, MultipartFile file, User user) throws IOException {
        System.out.println("Uploading file: " + file.getOriginalFilename() + " for ticket: " + ticketId);
        
        if (file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }
        
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        
        // Create upload directory if it doesn't exist
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
            System.out.println("Created upload directory: " + uploadPath.toAbsolutePath());
        }
        
        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String fileExtension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String uniqueFilename = UUID.randomUUID().toString() + fileExtension;
        
        // Save file
        Path filePath = uploadPath.resolve(uniqueFilename);
        Files.copy(file.getInputStream(), filePath);
        System.out.println("File saved to: " + filePath.toAbsolutePath());
        
        // Create attachment record
        Attachment attachment = new Attachment();
        attachment.setFileName(originalFilename);
        attachment.setFilePath(filePath.toString());
        attachment.setContentType(file.getContentType());
        attachment.setFileSize(file.getSize());
        attachment.setTicket(ticket);
        attachment.setUploadedBy(user);
        
        Attachment saved = attachmentRepository.save(attachment);
        System.out.println("Attachment saved with ID: " + saved.getId());
        return saved;
    }
    
    public Attachment getAttachment(Long attachmentId) {
        return attachmentRepository.findById(attachmentId)
                .orElseThrow(() -> new RuntimeException("Attachment not found"));
    }
    
    public byte[] downloadFile(Long attachmentId) throws IOException {
        Attachment attachment = getAttachment(attachmentId);
        Path filePath = Paths.get(attachment.getFilePath());
        return Files.readAllBytes(filePath);
    }
}