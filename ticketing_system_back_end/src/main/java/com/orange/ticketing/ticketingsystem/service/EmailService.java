package com.orange.ticketing.ticketingsystem.service;

import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class EmailService {

    @Value("${sendgrid.api.key}")
    private String apiKey;

    @Value("${sendgrid.from.email}")
    private String fromEmail;

    @Value("${sendgrid.from.name}")
    private String fromName;

    public void sendTicketNotification(String toEmail, String subject, String message) {
        try {
            log.info("Attempting to send email to: {} with subject: {}", toEmail, subject);
            log.info("Using API key: {}...", apiKey != null ? apiKey.substring(0, 10) : "null");
            
            Email from = new Email(fromEmail, fromName);
            Email to = new Email(toEmail);
            Content content = new Content("text/html", message);
            Mail mail = new Mail(from, subject, to, content);

            SendGrid sg = new SendGrid(apiKey);
            Request request = new Request();
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());

            Response response = sg.api(request);
            log.info("Email sent. Status: {}, Body: {}", response.getStatusCode(), response.getBody());
            
            if (response.getStatusCode() >= 400) {
                log.error("SendGrid error: {}", response.getBody());
            }
        } catch (Exception e) {
            log.error("Failed to send email to {}: {}", toEmail, e.getMessage(), e);
        }
    }

    public void sendTicketCreated(String userEmail, Long ticketId, String title) {
        log.info("Sending ticket created email for ticket #{} to {}", ticketId, userEmail);
        String subject = "Ticket Created - #" + ticketId;
        String message = String.format(
            "<h3>Ticket Created</h3>" +
            "<p>Your ticket <strong>#%d</strong> has been created successfully.</p>" +
            "<p><strong>Title:</strong> %s</p>" +
            "<p>We'll get back to you soon!</p>",
            ticketId, title
        );
        sendTicketNotification(userEmail, subject, message);
    }

    public void sendTicketAssigned(String agentEmail, Long ticketId, String title) {
        String subject = "Ticket Assigned - #" + ticketId;
        String message = String.format(
            "<h3>Ticket Assigned</h3>" +
            "<p>Ticket <strong>#%d</strong> has been assigned to you.</p>" +
            "<p><strong>Title:</strong> %s</p>" +
            "<p>Please review and take action.</p>",
            ticketId, title
        );
        sendTicketNotification(agentEmail, subject, message);
    }

    public void sendTicketStatusChanged(String userEmail, Long ticketId, String title, String status) {
        String subject = "Ticket Status Updated - #" + ticketId;
        String message = String.format(
            "<h3>Ticket Status Updated</h3>" +
            "<p>Your ticket <strong>#%d</strong> status has been updated.</p>" +
            "<p><strong>Title:</strong> %s</p>" +
            "<p><strong>New Status:</strong> %s</p>",
            ticketId, title, status
        );
        sendTicketNotification(userEmail, subject, message);
    }

    public void sendTicketResolved(String userEmail, Long ticketId, String title) {
        String subject = "Ticket Resolved - #" + ticketId;
        String message = String.format(
            "<h3>Ticket Resolved</h3>" +
            "<p>Your ticket <strong>#%d</strong> has been resolved.</p>" +
            "<p><strong>Title:</strong> %s</p>" +
            "<p>If you're satisfied with the resolution, please consider rating your experience.</p>",
            ticketId, title
        );
        sendTicketNotification(userEmail, subject, message);
    }
}