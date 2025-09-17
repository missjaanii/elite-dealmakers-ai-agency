import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import sgMail from '@sendgrid/mail';

// Configure SendGrid
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      
      // Store the submission
      const submission = await storage.createContactSubmission(validatedData);
      
      // Send email notification if SendGrid is configured
      if (SENDGRID_API_KEY) {
        try {
          const emailContent = `
New contact form submission from Elite Dealmakers website:

Name: ${validatedData.name}
Email: ${validatedData.email}
Company: ${validatedData.company}
Message: ${validatedData.message || 'No message provided'}

Submitted at: ${new Date().toLocaleString()}
          `.trim();

          await sgMail.send({
            to: 'support@elitedealmakers.in',
            from: 'no-reply@elitedealmakers.in', // This should be verified in SendGrid
            subject: `New Lead: ${validatedData.company} - ${validatedData.name}`,
            text: emailContent,
            html: emailContent.replace(/\n/g, '<br>'),
          });
        } catch (emailError) {
          console.error('Failed to send email notification:', emailError);
          // Don't fail the request if email fails - lead is still captured
        }
      }
      
      res.json({ 
        success: true, 
        message: "Thank you for your inquiry! We'll be in touch within 24 hours.",
        submissionId: submission.id 
      });
      
    } catch (error) {
      console.error('Contact form submission error:', error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Please check your form data and try again.",
          errors: error.errors
        });
      }
      
      res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again later."
      });
    }
  });

  // Get contact submissions (for admin use)
  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error('Failed to fetch contact submissions:', error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch submissions"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
