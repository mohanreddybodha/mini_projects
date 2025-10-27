

## ❤️ Mohan’s DevOps Static Website Project

Welcome to my **DevOps mini project**!  
This project demonstrates how to host a **static website** using **Docker**, **Apache HTTP Server**, and **AWS EC2 / S3**, completely automated and version-controlled through **GitHub**.

It’s a simple yet complete DevOps workflow → from **coding → containerization → deployment → hosting**.

---

## 🚀 Project Overview

This project is a static web application built using **HTML and CSS**, hosted inside a **Docker container** running **Apache HTTP Server**.  
It is deployed on an **AWS EC2 instance** or **S3 bucket** for static hosting.

### 🔧 Tools Used

| Tool / Service | Purpose |
|-----------------|----------|
| **HTML, CSS** | Frontend (Static Website) |
| **Apache (httpd)** | Web server inside container |
| **Docker** | Containerization |
| **AWS EC2 / S3** | Cloud hosting |
| **Git & GitHub** | Version control |

---

## 📁 Project Structure

```

📂 mini_projects
│
├── Dockerfile           # Builds and runs the Apache web server
├── index.html           # Main web page
├── style.css            # Styling for the web page
└── README.md            # Project documentation

````

---

## 🧱 Dockerfile Explanation

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

---

## 🪜 Step 1: Clone the Repository

```bash
git clone https://github.com/mohanreddybodha/mini_projects.git
cd mini_projects
```

---

## 🐳 Step 2: Install Docker

For Ubuntu (EC2 or local system):

```bash
sudo apt update
sudo apt install docker.io -y
```

To verify Docker installation:

```bash
docker --version
```

---

## ⚙️ Step 3: Build Docker Image and Run Container

### 🧩 Build the Image

```bash
sudo docker build -t mohanreddybodha/static-site .
```

### 🚀 Run the Container

```bash
sudo docker run -d -p 80:80 mohanreddybodha/static-site
```

Now open your browser and visit:

👉 [http://localhost](http://localhost) (for local setup)
or
👉 [http://<your-ec2-public-ip>](http://<your-ec2-public-ip>) (for AWS EC2)

---

## ☁️ Step 4: Deploy on AWS S3 (Optional)

If you prefer to deploy using **AWS S3 (Static Hosting)**:

1. Go to **AWS Console → S3 → Create Bucket**
2. Enable **“Static website hosting”**
3. Upload `index.html` and `style.css` files
4. Under **Permissions**, make the files **public**
5. Copy the **S3 website endpoint URL**

✅ Your static website will now be live via the S3 endpoint.

---

## 🌐 Website Preview

> “Welcome to My DevOps Static Site 🚀”
> This website is running inside a Docker container using Apache on AWS EC2.

A simple interactive button is included:

```html
<button onclick="alert('Thanks for visiting ❤️')">Click Me</button>
```

---

## 🧠 What I Learned

* Containerizing a static website using Docker
* Deploying containers on AWS EC2
* Hosting static content on S3
* Using Apache HTTP Server inside Docker
* Managing and versioning projects using Git & GitHub

---

## 👨‍💻 About Me

**Name:** Mohan Reddy Bodha

**GitHub:** [github.com/mohanreddybodha](https://github.com/mohanreddybodha)

**DockerHub:** [hub.docker.com/u/mohanreddybodha](https://hub.docker.com/u/mohanreddybodha)

**Email:** [mohanreddybodha05@gmail.com](mailto:mohanreddybodha05@gmail.com)

---

## ❤️ Final Words

This project demonstrates a **complete DevOps lifecycle**:
From coding → containerization → deployment → hosting.

> “Even the simplest project done perfectly speaks louder than a complex one left incomplete.”

⭐ If you liked this project, give it a **star** on GitHub!


