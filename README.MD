# **PolicyHub**

PolicyHub is an AI-powered editor designed to help bank employees efficiently create and edit policies. With a vast number of policy documents in play, PolicyHub streamlines the editing process using intelligent assistance, making policy management faster and more accurate.

---

## **Technology Stack**

### Frontend

- **Framework:** React
- **Testing Framework:** Jest
- **Linting:** ESLint
- **Folder:** `app`

### Backend

- **Framework:** NestJS
- **Database:** MongoDB
- **File Management:** S3
- **Messaging & Queues:** Kafka
- **Additional Technologies:**
  - **pgvector:** For similarity searches
  - **Future Integration:** Neo4j for knowledge graphs
- **Folder:** `api`

---

## **Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/policyhub.git
   cd policyhub
   ```

2. Install dependencies for frontend and backend:

   ```bash
   cd app && npm install
   cd ../api && npm install
   ```

3. Create `.env` files for both `app` and `api` folders with required environment variables.

---

## **Usage**

1. Start the backend server:

   ```bash
   cd api
   npm run start
   ```

   Your backend server should now be running on port 3000.

2. Start the frontend development server:

   ```bash
   cd ../app
   npm run dev
   ```

3. Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## **Contributing**

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.
