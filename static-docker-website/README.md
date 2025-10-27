
```markdown
# 🚀 Mohan’s Static Website Project

A simple and elegant **static website** built using **HTML, CSS, and Apache**, containerized with **Docker**, and deployed on **AWS EC2**.  
This project demonstrates how to build, containerize, and deploy a website — a perfect starting point for beginners learning **DevOps, AWS, and Docker**.

---

## 🧠 Project Overview

This project helps understand how to:
- Build and host a static website.
- Use **Apache** to serve web content.
- Containerize applications using **Docker**.
- Deploy containers on **AWS EC2**.
- Host static sites on **Amazon S3**.
- Use **GitHub** for version control and collaboration.

---

## 📁 Project Structure

```

📦 mohan-static-website
├── 📄 index.html           # Main webpage file
├── 📄 style.css            # Stylesheet for the website
├── 📄 Dockerfile           # Docker build instructions
├── 📄 README.md            # Project documentation
└── 📄 .gitignore           # Optional - ignored files in Git

````

---

## 💡 Technologies Used

| Tool / Service | Purpose |
|----------------|----------|
| **HTML & CSS** | Frontend web design |
| **Apache (httpd)** | Web server used to host the static site |
| **Docker** | Containerization and deployment |
| **AWS EC2** | Hosting container on the cloud |
| **AWS S3** | Static website hosting |
| **Git & GitHub** | Version control and project management |

---

## 🧾 Dockerfile Explanation

```dockerfile
# Base Image
FROM httpd:alpine

# Copy static files to Apache HTML directory
COPY . /usr/local/apache2/htdocs/

# Expose port 80
EXPOSE 80

# Default command to run Apache
CMD ["httpd-foreground"]
````

### 🔍 Explanation:

| Line                                | Description                                                                    |
| ----------------------------------- | ------------------------------------------------------------------------------ |
| `FROM httpd:alpine`                 | Uses the lightweight **Apache** image from Docker Hub (based on Alpine Linux). |
| `COPY . /usr/local/apache2/htdocs/` | Copies all files (HTML, CSS) to Apache’s web root folder inside the container. |
| `EXPOSE 80`                         | Opens **port 80**, the default HTTP port, to allow web traffic.                |
| `CMD ["httpd-foreground"]`          | Runs Apache in the foreground so the container keeps running.                  |

---

## 🐳 Docker Commands (with Explanation)

### 🧱 1. Build the Docker Image

```bash
docker build -t image_name .
```

**Explanation:**

* `docker build`: Builds a new Docker image.
* `-t mohan-static-site`: Tags (names) the image as *mohan-static-site*.
* `.` : Tells Docker to use the current directory (where the Dockerfile is located).

---

### ▶️ 2. Run the Docker Container

```bash
docker run -d -p 80:80 image_name
```

**Explanation:**

* `docker run`: Runs a container from the image.
* `-d`: Detached mode (runs in background).
* `-p 80:80`: Maps container’s port 80 to your system’s port 80.
* `mohan-static-site`: The image name used to create the container.

---

### 🏷️ 3. Tag the Docker Image

```bash
docker tag image_in_local_instance yourdockerhubusername/repo_name:latest
```

**Explanation:**

* `docker tag`: Creates another name for your image (required before pushing to Docker Hub).
* `yourdockerhubusername/mohan-static-site`: Adds your Docker Hub username to associate the image.
* `:latest`: Marks it as the latest version.

---

### ⬆️ 4. Push the Image to Docker Hub

```bash
docker push yourdockerhubusername/repo-name:latest
```

**Explanation:**

* `docker push`: Uploads the image to Docker Hub.
* Once uploaded, anyone can pull and run it from anywhere.

---

## ☁️ Deploy on AWS EC2

### 🪜 Step-by-Step Deployment

#### 1️⃣ Launch an EC2 Instance

* Choose **Ubuntu** or **Amazon Linux**.
* Open **port 80** in the Security Group (for HTTP traffic).

#### 2️⃣ Install Docker

```bash
sudo apt update -y
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
```

**Explanation:**

* `sudo apt update -y`: Updates the package list.
* `sudo apt install docker.io -y`: Installs Docker engine on EC2.
* `sudo systemctl start docker`: Starts Docker service.
* `sudo systemctl enable docker`: Ensures Docker starts automatically on reboot.

#### 3️⃣ Pull the Docker Image from Docker Hub

```bash
docker pull yourdockerhubusername/repo_name:latest
```

**Explanation:**

* `docker pull`: Downloads the image from Docker Hub to your EC2 instance.

#### 4️⃣ Run the Docker Container

```bash
docker run -d -p 80:80 yourdockerhubusername/repo_name:latest
```

**Explanation:**

* Starts your container in the background and maps it to EC2’s port 80 (public access).

#### 5️⃣ Access the Website

Visit:

```
http://<EC2_PUBLIC_IP>
```

Example:

```
http://3.108.227.78
```

🎉 **Congratulations!** Your static website is now live on **AWS EC2**.

---

## 🌐 Host the Same Website on AWS S3

### 🪜 Steps to Host on Amazon S3

1. Go to **AWS Console → S3**.
2. Click **Create Bucket** → Name it (e.g., `static-site`).
3. Uncheck **Block all public access**.
4. Upload your `index.html` and `style.css`.
5. Go to **Properties → Static Website Hosting**.
6. Enable hosting and set:

   * Index document → `index.html`
7. Save and copy the **S3 Website Endpoint**.

Example:

```
http://bucket_name.s3-website-us-east-1.amazonaws.com
```

Your static site is now live on **AWS S3** 🌍

---

## 🔗 GitHub Repository Setup

### 🪜 Steps to Push the Project to GitHub

#### 1️⃣ Initialize Git

```bash
git init
```

**Explanation:**
Initializes a new local Git repository in your project folder.

#### 2️⃣ Add Files

```bash
git add .
```

**Explanation:**
Stages all files in the directory for the next commit.

#### 3️⃣ Commit Changes

```bash
git commit -m "Initial commit - static website project"
```

**Explanation:**
Saves your changes in Git history with a commit message.

#### 4️⃣ Create a New GitHub Repository

* Go to [GitHub](https://github.com) → **New Repository**
* Name it `static-website`.

#### 5️⃣ Connect Local Repo to GitHub

```bash
git branch -M main
git remote add origin https://github.com/<your-github-username>/static-website.git
git push -u origin main
```

**Explanation:**

* `git branch -M main`: Renames the current branch to main.
* `git remote add origin`: Connects local Git to your GitHub repo.
* `git push -u origin main`: Pushes local commits to GitHub.

---

## 📸 Website Preview

![Website Preview](https://via.placeholder.com/900x400?text=Website+Preview)

> The site includes a simple, attractive gradient background with a welcoming button and a thank-you message popup.

---

## 💬 About the Author

👨‍💻 **Mohan Reddy Bodha**
🎓 *B.Tech CSE Student | DevOps Learner | AWS Enthusiast*
🏫 *Aditya College of Engineering and Technology*
📧 **Email:** [bodhamohanreddy05@gmail.com](mailto:bodhamohanreddy05@gmail.com)
🌐 **GitHub:** [https://github.com/mohanreddybodha](https://github.com/mohanreddybodha)
🐋 **Docker Hub:** [https://hub.docker.com/u/](https://hub.docker.com/u/mohanreddybodha)

---

## 🧭 Future Improvements

* Add a feedback/contact form.
* Deploy using **Kubernetes** on AWS.
* Integrate **CI/CD pipeline** with GitHub Actions.
* Add a **custom domain** using Route 53.
* Enable **HTTPS** using AWS Certificate Manager.

---

## 🏁 Conclusion

This project demonstrates:

* Building and containerizing a static web app.
* Running it on **Docker** and hosting on **AWS EC2**.
* Hosting the same static site on **AWS S3**.
* Managing the code with **GitHub**.

> 💡 *A simple yet powerful DevOps project that showcases the full workflow from local development to cloud deployment.*

---

### ⭐ If you like this project, don’t forget to **Star** ⭐ the repository on GitHub!

```
