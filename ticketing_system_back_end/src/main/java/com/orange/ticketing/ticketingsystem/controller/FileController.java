package com.orange.ticketing.ticketingsystem.controller;

import com.orange.ticketing.ticketingsystem.entity.Attachment;
import com.orange.ticketing.ticketingsystem.entity.User;
import com.orange.ticketing.ticketingsystem.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/tickets/{ticketId}/attachments")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class FileController {
    
    private final FileService fileService;
    
    @PostMapping
    public ResponseEntity<Attachment> uploadFile(@PathVariable Long ticketId,
                                               @RequestParam("file") MultipartFile file,
                                               @AuthenticationPrincipal User user) {
        try {
            System.out.println("FileController: Received upload request for ticket " + ticketId);
            System.out.println("File: " + file.getOriginalFilename() + ", Size: " + file.getSize());
            Attachment attachment = fileService.uploadFile(ticketId, file, user);
            System.out.println("FileController: Upload successful");
            return ResponseEntity.ok(attachment);
        } catch (Exception e) {
            System.err.println("FileController: Upload failed - " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/{attachmentId}/download")
    public ResponseEntity<byte[]> downloadFile(@PathVariable Long attachmentId) {
        try {
            Attachment attachment = fileService.getAttachment(attachmentId);
            byte[] fileData = fileService.downloadFile(attachmentId);
            
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(attachment.getContentType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + attachment.getFileName() + "\"")
                    .body(fileData);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}