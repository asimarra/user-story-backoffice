# Frontend - Angular Application

## 📌 Technologies Used

- **Angular 16.2.0** - Frontend framework
- **PrimeNG** - UI component library
- **RxJS** - Reactive programming
- **TypeScript** - Superset of JavaScript
- **SCSS / CSS** - Styling
- **JWT Authentication** - Secure API requests
- **ChatGPT** - For generate some html, css, interface, and so on.

---

## 🚀 Setup Instructions

### **1. Clone the Repository**

```bash
git clone <repository_url>
cd frontend
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Configure Environment Variables**

Create a `.env` file and specify your API URL if needed:

```bash
API_URL=http://localhost:3000/api
```

### **4. Run the Application**

```bash
ng serve
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

---

## 📖 Usage

### **Authentication**

- Users can register and log in using JWT authentication.
- Access is restricted based on user roles (USER, ADMIN).

### **Navigation & Features**

#### **Admin Users:**

- Manage Users (CRUD operations)
- Manage Products (CRUD operations)
- View all invoices
- System Overview Dashboard

#### **Regular Users:**

- View products
- Create invoices (purchases)
- Track personal purchases via dashboard

### **UI Components**

- **PrimeNG Components** (Tables, Forms, Buttons, Dialogs, Dropdowns)
- **Responsive Layout** with a top navigation bar

---

## 🛠 Deployment

For production builds:

```bash
ng build --configuration production
```

This generates the files in the `/dist` folder, which can be served using Nginx, Apache, or Firebase Hosting.

---

## ❓ Troubleshooting

- If dependencies fail to install, try:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
- If API requests fail, ensure the backend is running at the correct URL.

---

## 🏗 Future Improvements

- Implement update profile feature
- Implement forgot password
- Dark mode toggle
- PWA support
- Improved UI animations

For any issues, feel free to open a GitHub issue. 🚀
