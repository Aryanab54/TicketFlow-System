package com.orange.ticketing.ticketingsystem.repository;

import com.orange.ticketing.ticketingsystem.entity.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttachmentRepository extends JpaRepository<Attachment, Long> {
}