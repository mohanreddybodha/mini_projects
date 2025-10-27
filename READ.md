

```markdown
# ❤️ Mohan’s DevOps Static Website Project

Welcome to my **DevOps mini project**!  
This project showcases how to host a **static website** using **Docker**, **Apache HTTP Server**, and **AWS EC2** — completely automated and version-controlled using **GitHub**.  
It’s a perfect small project demonstrating the DevOps workflow from coding to deployment.

---

## 🚀 Project Overview

This project is a **static web application** built using **HTML and CSS**, hosted inside a **Docker container** running **Apache**.  
The containerized app is deployed on an **AWS EC2 instance**, showcasing my understanding of DevOps concepts like:

- Version control with **Git & GitHub**
- Containerization with **Docker**
- Hosting web applications on **EC2**
- Using **Apache HTTP Server** as a lightweight web server

---

## 💡 Tech Stack

| Tool / Service | Purpose |
|-----------------|----------|
| **HTML, CSS** | Frontend (Static Website) |
| **Apache (httpd)** | Web server inside container |
| **Docker** | Containerization |
| **AWS EC2** | Cloud hosting |
| **Git & GitHub** | Version control and project repository |

---

## 🧱 Project Structure

```

📂 my-devops-static-site
│
├── Dockerfile           # Builds and runs the Apache web server
├── index.html           # Main web page
├── style.css            # Styling for the web page
└── README.md            # Project documentation

````

---

## 🐳 Dockerfile Explanation

```dockerfile
# Use Apache base image
FROM httpd:alpine

# Copy all website files to Apache HTML directory
COPY . /usr/local/apache2/htdocs/

# Expose port 80 for HTTP access
EXPOSE 80

# Run Apache in the foreground
CMD ["httpd-foreground"]
````

🔹 This Dockerfile creates a **lightweight Apache container** that serves your static site.
🔹 It uses the official **httpd:alpine** image for minimal size and high performance.

---

## ⚙️ How to Run Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   cd <your-repo-name>
   ```

2. **Build the Docker image**

   ```bash
   docker build -t my-static-site .
   ```

3. **Run the container**

   ```bash
   docker run -d -p 80:80 my-static-site
   ```

4. **Access your website**

   * Open your browser and go to 👉 [http://localhost](http://localhost)

---

## ☁️ Deploying on AWS EC2

1. Launch an **EC2 instance** (Ubuntu preferred).
2. Install Docker:

   ```bash
   sudo apt update
   sudo apt install docker.io -y
   ```
3. Clone your repository:

   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   cd <your-repo-name>
   ```
4. Build and run the container:

   ```bash
   sudo docker build -t my-static-site .
   sudo docker run -d -p 80:80 my-static-site
   ```
5. Copy your EC2 **public IP address**, then open in browser:

   ```
   http://<EC2_PUBLIC_IP>
   ```

✅ Your website is now live on AWS!

---

## 🌐 Website Preview

### 💻 Homepage

> “Welcome to My DevOps Static Site 🚀”
> This website is running inside a Docker container using Apache on AWS EC2.

It also includes a cute interactive button:

```html
<button onclick="alert('Thanks for visiting ❤️')">Click Me</button>
```

---

## 🧠 What I Learned

* How to **containerize** a static website.
* Deploying Docker containers on **AWS EC2**.
* Hosting websites using **Apache HTTP Server**.
* Managing code with **Git & GitHub**.
* Writing clean and reusable **Dockerfiles**.

---

## 🔗 Connect with Me

👨‍💻 **GitHub:** [Mohan Reddy Bodha](https://github.com/<your-username>)
📫 **Email:** [mohanreddy@example.com](mailto:mohanreddy@example.com)
💬 “DevOps is not a goal, but a way of improving work and collaboration!”

---

## ❤️ Final Words

This mini project might look simple —
but it represents a **complete DevOps lifecycle**:
From **coding → containerization → deployment → hosting**.

> “Even the simplest project done perfectly speaks louder than a complex one left incomplete.”

---

⭐ **If you liked this project, give it a star on GitHub!**

```


