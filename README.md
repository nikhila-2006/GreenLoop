# ♻️ GreenLoop — Smart Waste Management & Recycling Platform

**Turning waste into value. Building a greener tomorrow.**

GreenLoop is an AI-powered waste management and recycling platform designed to make waste segregation, recycling, and waste valuation smarter and more accessible. It bridges the gap between waste generators and recyclers through intelligent waste image analysis, estimated waste valuation, and streamlined pickup management.

By combining artificial intelligence with a user-friendly web experience, GreenLoop encourages responsible waste disposal and helps create a more sustainable, circular economy.

🌐 Live Demo: https://main.d2leri3ub6jz1a.amplifyapp.com

📂 Repository: https://github.com/nikhila-2006/GreenLoop.git

## 🌍 About the Project

Waste management is a growing environmental challenge. Identifying recyclable materials, understanding their potential value, and connecting waste generators with recyclers can be difficult without accessible digital tools.

**GreenLoop addresses this challenge through a unified digital platform** where users can analyze waste images, estimate the value of recyclable materials, and manage pickup requests, while recyclers can manage and respond to pickup requests through a dedicated interface.

The platform aims to make recycling more convenient, transparent, and accessible while promoting sustainable waste management practices.

## ✨ Key Features

### 🤖 AI-Powered Waste Analysis
- Upload an image of waste for intelligent material identification.
- Analyze images using an AI-powered image analysis service.
- Classify waste into predefined categories:
  - Paper
  - Plastic
  - Metal
  - Glass
  - E-waste
  - Organic Waste
  - Other

### 💰 Estimated Waste Valuation
- Enter the weight of the identified waste.
- Calculate an estimated monetary value based on the material category and applicable valuation rates.
- Help users understand the potential value of recyclable materials before requesting a pickup.

*Note: Estimated values are indicative and may differ from actual recycler quotations and market prices.*

### 🚚 Recycler Pickup Management
- Submit waste pickup requests.
- Track pickup request status.
- Allow recyclers to view and manage incoming requests.
- Accept or reject pickup requests.
- Maintain visibility into pickup activities and request statuses.

### 👤 User Dashboard
- Access waste analysis and valuation features.
- Manage pickup requests.
- View relevant request information and status updates.

### ♻️ Dedicated Recycler Portal
- Separate recycler login and authentication flow.
- View and manage pickup requests.
- Monitor pending and accepted pickups through dashboard statistics.
- Manage recycler-side pickup workflows.

### 🔐 Authentication & API Integration
- Dedicated user and recycler authentication flows.
- Token-based authorization for protected endpoints.
- Frontend-to-backend communication through REST APIs.

### ☁️ Cloud Deployment
- Cloud-hosted frontend and backend architecture.
- AWS deployment for application accessibility.
- Environment-based configuration for deployment-specific settings.

### 🏡 Home Page

![GreenLoop Home Page](screenshots/home.png)

### 🔍 AI Waste Analysis

![GreenLoop Waste Analysis](screenshots/waste-analysis.png)

### 📊 Dashboard & Pickup Management

![GreenLoop Dashboard](screenshots/user-dashboard.png)

![GreenLoop Recycler Dashboard](screenshots/recycler-dashboard.png)

## 🛠️ Technology Stack

The following technologies describe the project's current implementation. Adjust the list if your repository uses additional or different tools.

### Frontend
- **React.js** — Component-based user interface
- **JavaScript** — Application logic
- **Tailwind CSS** — Responsive styling
- **Axios** — HTTP requests and API integration
- **React Router** — Client-side navigation

### Backend
- **Node.js** — JavaScript runtime
- **Express.js** — REST API framework
- **MongoDB** — Database for application data, if configured
- **JWT** — Token-based authentication, if configured

### Artificial Intelligence
- **Google Gemini API** — AI-powered waste image analysis

### Cloud & Deployment
- **AWS Amplify** — Frontend hosting, if used for the deployed frontend
- **AWS Elastic Beanstalk** — Backend deployment
- **Amazon CloudFront / AWS WAF** — CDN and web application security, if configured for the deployment

## 🏗️ System Architecture

GreenLoop follows a frontend–backend architecture that connects the user interface to application APIs and external AI services.

**Workflow:**

1. A user uploads an image of waste.
2. The backend sends the image for AI-powered analysis.
3. The identified category is returned to the application.
4. The user enters the waste weight.
5. The application calculates an estimated waste value.
6. The user can submit a pickup request.
7. The recycler views the request and updates its status.

## ⚙️ Getting Started

Follow these steps to run GreenLoop locally.

### Prerequisites

Install the following before starting:

- Node.js and npm
- Git
- A configured application database, if required
- A Google Gemini API key for AI-powered image analysis

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd GreenLoop
```

### 2. Set Up the Backend

```bash
cd Backend
npm install
```

Create a `.env` file in the backend directory and configure the environment variables expected by your application.

Example:

```env
PORT=8080
MONGODB_URI=your_database_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

> Use the exact environment variable names expected by your backend code. The example above is illustrative; remove variables your application does not use. Never commit real credentials or secret keys.

Start the backend using the script configured in `Backend/package.json`. For example:

```bash
npm start
```

### 3. Set Up the Frontend

Open a separate terminal:

```bash
cd frontend
npm install
```

Configure the frontend API base URL using the environment variable expected by your application.

For a Vite application, an example `.env` entry is:

```env
VITE_API_BASE_URL=http://localhost:8080
```

Update your API client to use this variable if it does not already do so.

Start the frontend:

```bash
npm run dev
```

### 4. Open the Application

Open the local URL displayed by your frontend development server, commonly:

```text
http://localhost:5173
```

Your frontend and backend should now be running locally.

> **Note:** The frontend directory name, startup commands, database configuration, and environment variable names may differ in your repository. Follow your actual project structure and package scripts.

---

## 🔌 API Overview

GreenLoop uses HTTP APIs to connect its frontend with backend functionality.

The following table describes the main API areas. Update the paths and methods to match your implemented routes.

| API area | Purpose |
|---|---|
| Waste analysis | Analyze uploaded waste images |
| User authentication | Register and authenticate users |
| Recycler authentication | Authenticate recyclers |
| Pickup management | Create and retrieve pickup requests |
| Recycler operations | Accept, reject, and manage pickup requests |

### Example: Waste Image Analysis

An illustrative request using `multipart/form-data`:

```http
POST /api/waste/analyze
Content-Type: multipart/form-data
```

The request can contain the waste image as a file. The response may include the predicted category and information needed for subsequent valuation.

### Example: Pickup Management

Protected pickup endpoints can use bearer-token authorization:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

Refer to the backend route definitions for the exact endpoints, request fields, and response formats.

---

## 🔒 Security & Configuration

- Keep API keys and database credentials in environment variables.
- Never commit `.env` files or authentication secrets.
- Protect private API endpoints with appropriate authentication and authorization.
- Configure CORS to allow only the frontend origins required by your deployment.
- Use HTTPS for production traffic.
- Validate and handle uploaded files on the backend.
- Configure production API URLs instead of relying on localhost addresses.

---

## 🌱 Environmental Impact

GreenLoop is designed to support more responsible waste management by:

- Encouraging waste segregation.
- Making recyclable materials easier to identify.
- Improving awareness of potential recycling value.
- Connecting waste generators with recycling services.
- Supporting more organized pickup coordination.

The platform provides digital tools to encourage recycling; its actual environmental impact depends on adoption, collection, and successful recycling outcomes.

---

## 🚀 Future Enhancements

Potential improvements for future versions include:

- 📍 Location-based recycler discovery
- 🗺️ Interactive pickup tracking
- 📈 Waste collection and recycling analytics
- 💹 Dynamic valuation using updated material prices
- 🔔 Real-time pickup notifications
- ⭐ Recycler ratings and reviews
- 📱 Progressive Web App or mobile application
- 🌏 Environmental impact reports and recycling insights

---

## 🤝 Contributing

Contributions, suggestions, and feedback are welcome.

1. Fork the repository.
2. Create a feature branch.

   ```bash
   git checkout -b feature/your-feature
   ```

3. Commit your changes.

   ```bash
   git commit -m "feat: add your feature"
   ```

4. Push your branch.

   ```bash
   git push origin feature/your-feature
   ```

5. Open a pull request describing your changes.

---

## 👩‍💻 Author

**Nikhila Reddy**

- GitHub: [Your GitHub Profile](https://github.com/nikhila-2006)
- Project Repository: [GreenLoop](https://github.com/nikhila-2006/GreenLoop.git)
- Live Application: [Try GreenLoop](https://main.d2leri3ub6jz1a.amplifyapp.com)


## 📄 License

This project is available under the license specified in the repository. If you intend to distribute it as an open-source project, consider adding a `LICENSE` file with your chosen license.

---

<p align="center">
  <strong>♻️ GreenLoop — Turning Waste Into Opportunity.</strong>
  <br />
  <em>Small actions. Smarter recycling. A greener future.</em>
</p>
