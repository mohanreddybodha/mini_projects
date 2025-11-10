

---

### User Feedback Portal — Full CI/CD Pipeline using Jenkins, Docker, and AWS EC2

This project demonstrates how to deploy a User Feedback Web Application using a Jenkins CI/CD pipeline on an AWS EC2 Amazon Linux instance.
The project includes both a frontend (HTML/CSS/JS) and a Node.js backend, containerized using Docker, and automated with Jenkins pipelines.

---

## TABLE OF CONTENTS

1. Project Overview
2. Architecture
3. Step 1: Create AWS EC2 Instance
4. Step 2: Install Dependencies (Git, Docker, Node.js, Jenkins)
5. Step 3: Configure Jenkins
6. Step 4: Clone GitHub Repository in Jenkins
7. Step 5: Configure Webhook for Automation
8. Step 6: Jenkins Pipeline File (CI/CD)
9. Step 7: Dockerfile Explanation
10. Step 8: Access the Deployed Application
11. Troubleshooting

---

## PROJECT OVERVIEW

This project automates the following steps:

* Pulls code automatically from GitHub when changes are pushed.
* Builds and tests the backend and frontend code.
* Creates a Docker image and runs the application in a container.
* Deploys the updated container automatically using Jenkins.

---

## ARCHITECTURE

GitHub  →  Jenkins (CI/CD)  →  Docker Container  →  EC2 Instance  →  Web Browser

---

## STEP 1: CREATE AWS EC2 INSTANCE

1. Go to AWS Console  →  EC2  →  Launch Instance
2. Choose Amazon Linux 2023 (Free Tier)
3. Select instance type: t2.medium (Recommended for Jenkins + Docker)
4. Create or use an existing key pair.
5. In Security Group, allow ports:

   * Port 22 (SSH)
   * Port 8080 (Jenkins)
   * Port 3000 (To Access Application from the browser)
6. Launch instance and connect using your terminal:

```
ssh -i your-key.pem ec2-user@<your-ec2-public-ip>
```

---

## STEP 2: INSTALL DEPENDENCIES (GIT, DOCKER, NODE.JS, JENKINS)

1. Update system

```
sudo yum update -y
```

2. Install Git

```
sudo yum install git -y

git -v   
# Verify git installation
```

3. Install Docker

```
sudo yum install docker -y
# Install Docker Engine on the system

docker -v
# Verify docker installation

sudo systemctl start docker  
# Start the Docker service so it begins running now

sudo systemctl enable docker 
# Enable Docker service to start automatically on system boo 

sudo usermod -aG docker ec2-user
# Add the 'ec2-user' to the 'docker' group so this user can run Docker commands WITHOUT needing sudo every time 

```

(Logout and login again to apply permissions)

4. Install Node.js and npm

```
sudo yum install nodejs npm -y

```

5. Install Jenkins

```
sudo yum install java-17-amazon-corretto -y          #To install Jenkins we need to install java 17 before because it is a java based application.

java -version 
# Verify Java installation

sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat stable/jenkins.repo  
# Download and save the official Jenkins repository configuration so yum can fetch Jenkins packages


sudo rpm --import https://pkg.jenkins.io/redhat/jenkins.io-2023.key
# Import Jenkins GPG key to verify package authenticity and security

sudo yum install fontconfig java-17-amazon-corretto -y
# Ensure fontconfig and Java runtime are installed (required for Jenkins to run properly)  

sudo yum install jenkins -y 
# Install Jenkins package from the Jenkins yum repository 

sudo usermod -aG docker Jenkins
# Add the Jenkins user to the 'docker' group so Jenkins can run Docker commands without permission errors

sudo systemctl restart docker
# Restart Docker service to update group permissions changes

sudo systemctl start Jenkins    
# Start Jenkins service 

sudo systemctl enable Jenkins     
# Enable Jenkins to start automatically on server boot

```


Access Jenkins from your browser:

```
http://<your-ec2-public-ip>:8080
```

Find admin password: Run this command in instance terminal to get the password for Jenkins login

```
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

Follow setup steps and install suggested plugins.

---

## STEP 3: CONFIGURE JENKINS

1. Go to Manage Jenkins → Plugins → Available Plugins
   Install these plugins:

   * Git Plugin
   * Docker Pipeline
   * NodeJS Plugin
   * Pipeline Plugin

2. Go to Manage Jenkins → Tools
   Add NodeJS → Name: nodejs → Enable "Install automatically"

3. Add GitHub credentials if your repo is private:
   Manage Jenkins → Credentials → Global → Add Credentials

---

## STEP 4: CLONE GITHUB REPOSITORY IN JENKINS

1. Create a New Item → Choose "Pipeline".
2. Name: User-Feedback-Portal
3. Under Triggers section :
   * Enable GitHub hook trigger for GITScm polling option
4. Under Pipeline Definition:

   * Choose "Pipeline script from SCM"
   * SCM: Git
   * Repository URL:

```
https://github.com/mohanreddybodha/CiCD-pipeline-project-using-jenkins.git
```

* Script Path:

```
User-Feedback-Portal/jenkinsfile
```

4. Save and run the job.

---

## STEP 5: CONFIGURE WEBHOOK FOR AUTOMATION

1. Go to GitHub → Repository Settings → Webhooks → Add Webhook
2. Payload URL:

```
http://<your-ec2-public-ip>:8080/github-webhook/
```

3. Content type:

```
application/json
```

4. Select: Just the push event
5. Save

Now every time you push code to GitHub, Jenkins will automatically trigger the pipeline.

---

## STEP 6: JENKINS PIPELINE FILE (CI/CD)

Below is your Jenkinsfile content:

```
pipeline {
    agent any

    environment {
        IMAGE_NAME = "feedback-web"
        IMAGE_TAG = "latest"
        CONTAINER_NAME = "feedback-container"
        APP_PORT = "5000"
        HOST_PORT = "3000"
        APP_DIR = "User-Feedback-Portal"
    }

    options {
        skipStagesAfterUnstable()
        timeout(time: 20, unit: 'MINUTES')
        timestamps()
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo ' Cloning repository...'
                checkout scm
                echo ' Code checkout completed.'
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('Backend Deps') {
                    steps {
                        echo ' Installing backend dependencies...'
                        sh '''
                            cd $APP_DIR/backend
                            npm install
                        '''
                        echo ' Backend dependencies installed.'
                    }
                }

                stage('Frontend Deps') {
                    steps {
                        echo ' Installing frontend dependencies...'
                        sh '''
                            cd $APP_DIR/frontend
                            npm install
                        '''
                        echo ' Frontend dependencies installed.'
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                echo ' Building frontend...'
                sh '''
                    cd $APP_DIR/frontend
                    npm run build || echo "Static HTML app detected — skipping build."
                    mkdir -p ../backend/public
                    cp index.html style.css ../backend/public/
                '''
                echo ' Frontend build and copy completed.'
            }
        }

        stage('Test Backend') {
            steps {
                echo ' Testing backend (basic start check)...'
                sh '''
                    cd $APP_DIR/backend
                    node -c server.js
                '''
                echo ' Backend syntax check passed.'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo ' Building Docker image...'
                sh '''
                    docker build -t $IMAGE_NAME:$IMAGE_TAG $APP_DIR
                '''
                echo ' Docker image built.'
            }
        }

        stage('Stop Old Container') {
            steps {
                echo ' Stopping and removing old container if exists...'
                sh '''
                    if [ $(docker ps -q -f name=$CONTAINER_NAME) ]; then
                        docker stop $CONTAINER_NAME
                        docker rm $CONTAINER_NAME
                    fi
                '''
                echo ' Old container cleaned up.'
            }
        }

        stage('Deploy New Container') {
            steps {
                echo ' Deploying new version of the container...'
                sh '''
                    docker run -d \
                    -p $HOST_PORT:$APP_PORT \
                    --name $CONTAINER_NAME \
                    $IMAGE_NAME:$IMAGE_TAG
                '''
                echo ' Container deployed.'
            }
        }

        stage('Cleanup Old Images') {
            steps {
                echo ' Cleaning up unused Docker resources...'
                sh '''
                    docker image prune -af || true
                    docker system prune -f --volumes || true
                '''
                echo ' Docker cleanup completed.'
            }
        }

    }

    post {
        success {
            echo " CI/CD pipeline completed successfully!"
        }
        failure {
            echo " Pipeline failed — check logs for details."
        }
    }
}
```
Once look at the above Jenkins file. It makes you to understand what are the stages in this pipeline exists.


---

## STEP 7: DOCKERFILE EXPLANATION

Your Dockerfile:

```
# ------------------------------
# Stage 1: Frontend setup
# ------------------------------
FROM node:alpine AS frontend-build

WORKDIR /app/frontend

# Copy static frontend files
COPY frontend/ ./

# Install dependencies (if package.json exists)
RUN if [ -f package.json ]; then npm install; fi


# --------------------------
# Stage 2: Backend setup
# --------------------------
FROM node:alpine

WORKDIR /app/backend

# Copy backend files
COPY backend/ ./

# Install backend dependencies
RUN npm install

# Copy frontend static files into backend public folder
COPY --from=frontend-build /app/frontend ./public

# Expose backend port
EXPOSE 5000

# Start backend server
CMD ["node", "server.js"]

```

Explanation:

* Stage 1 builds frontend files
* Stage 2 installs backend dependencies
* Copies frontend output into backend’s public folder
* Exposes backend port 5000
* Runs Node.js server

---

## STEP 8: ACCESS THE DEPLOYED APPLICATION

After the pipeline completes, check running containers:

```
docker ps
```

Access your app in browser:

```
http://<your-ec2-public-ip>:3000
```

---

## TROUBLESHOOTING

Problem: Jenkins stuck on "Waiting for executor"
Solution:

```
sudo systemctl restart jenkins
```

Problem: Permission denied when using Docker
Solution:

```
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

Problem: Port already in use
Solution:

```
docker stop feedback-container 
docker rm feedback-container
```

Problem: Jenkins not opening
Solution: Ensure port 8080 is open in EC2 security group

Problem: Disk full
Solution:

```
docker system prune -a -f
```

---


## 👨‍💻 About Me

**Name:** Mohan Reddy Bodha

**GitHub:** [github.com/mohanreddybodha](https://github.com/mohanreddybodha)

**DockerHub:** [hub.docker.com/u/mohanreddybodha](https://hub.docker.com/u/mohanreddybodha)

**Email:** [mohanreddybodha05@gmail.com](mailto:mohanreddybodha05@gmail.com)

**LinkedIn:** [https://www.linkedin.com/in/mohan-reddy-boda-0560722b7/](https://www.linkedin.com/in/mohan-reddy-boda-0560722b7/)

Technologies: AWS EC2, Jenkins, Docker, Node.js, HTML, CSS, JavaScript

Purpose: Educational project demonstrating a complete CI/CD pipeline for beginners.

---

## END OF GUIDE

This document provides step-by-step instructions for anyone — even beginners with zero prior DevOps experience — to deploy and automate a Node.js web application using Jenkins CI/CD on AWS EC2.

> “Even the simplest project done perfectly speaks louder than a complex one left incomplete.”

⭐ If you liked this project, give it a **star** on GitHub!

---


