# Rido - A Cab Booking System

### By: Krish Srivastava

## Table of Contents

1. [Project Overview](#project-overview)
2. [Backend](#backend)
   - [Introduction](#introduction)
   - [Database Design](#database-design)
   - [High-Level Design](#high-level-design)
3. [Frontend](#frontend)
   - [Introduction](#frontend-introduction)
   - [User and Captain Flow](#user-and-captain-flow)
   - [Prototype Snapshots](#prototype-snapshots)
4. [Deployment](#deployment)
5. [Project Repository](#project-repository)

---

## Project Overview

Rido is a modern ride-sharing application designed to connect passengers with drivers (captains) in real-time. The platform offers:

- **Real-time ride matching and tracking**
- **Multi-vehicle support** (Auto, Bike, Car)
- **Secure authentication system**
- **Location-based driver matching**
- **OTP verification for ride security**
- **Integrated payment system**

---

## Backend

### Introduction

The backend of Rido follows a monolithic architecture, planned for conversion to a microservice-based structure. It uses a well-structured coding and folder design.

**Tech Stack:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.io
- JWT Authentication

---

### Database Design

The database is implemented using MongoDB with Mongoose for Object Data Modeling. The schema supports data integrity and flexibility.

**Core Entities:**
- **User**: Details about passengers.
- **Captain**: Properties of drivers.
- **Ride**: Details of rides booked and assigned.
- **BlackListTokenModel**: Stores logged-out tokens for enhanced security.

![Database Design](https://res.cloudinary.com/dd0168zpx/image/upload/v1735829115/Rido/Rido_ER_Diagram_yd7ya3.png)

---

### High-Level Design

**Socket Server**:
- Real-time location updates (5-second intervals).
- Live ride matching.
- Connection management.

**REST API Endpoints**:
- User/Captain authentication.
- Ride and profile management.

**External Services Integration**:
- OpenRouteServices for mapping.


![High-Level Design](https://res.cloudinary.com/dd0168zpx/image/upload/v1735829117/Rido/Rido_HLD_pmaugw.png)

---

## Frontend

### Frontend Introduction

The frontend is a **React + Vite** application configured with **Tailwind CSS**. It is optimized for mobile views, reflecting the primary use case of booking rides through mobile devices.

**Tech Stack:**
- React.js + Vite
- Tailwind CSS
- React-Router-DOM
- GSAP
- Lucide-React

---

### User and Captain Flow

The application seamlessly integrates separate flows for users and captains to ensure a smooth ride-booking and management experience.

![User Flow](https://res.cloudinary.com/dd0168zpx/image/upload/v1735829121/Rido/User_Data_Flow_cg3mqo.png)

![Captain Flow](https://res.cloudinary.com/dd0168zpx/image/upload/v1735829113/Rido/Captain_Flow_Diagram_octtph.png)

---

### Prototype Snapshots

Snapshots of the application interface are included in the project repository.


![Prototype Snapshot](https://res.cloudinary.com/dd0168zpx/image/upload/v1735829583/Screenshot_2025-01-01_183152_gbnyls.png)

![Prototype Snapshot](https://res.cloudinary.com/dd0168zpx/image/upload/v1735829583/Screenshot_2025-01-01_183320_lkclrl.png)

![Prototype Snapshot](https://res.cloudinary.com/dd0168zpx/image/upload/v1735829584/Screenshot_2025-01-01_183329_jytrcs.png)

![Prototype Snapshot](https://res.cloudinary.com/dd0168zpx/image/upload/v1735829585/Screenshot_2025-01-01_183404_xqq9d9.png)

---

## Deployment

> The project is in its final development phase and has not yet been deployed.

**Planned Deployment Strategy**:
- **Frontend**: Deploy on services like Vercel for a simple and manageable architecture.
- **Backend**: Host on platforms like Digital Ocean or AWS.
- **Database**: Deploy on MongoDB Atlas for scalability and reliability.

---

## Project Repository

[Rido GitHub Repository](https://github.com/krish-srivastava-2305/Cab-Booking-System)
