pipeline {
    agent any

    environment {
        IMAGE_NAME = "iot-dashboard"
        IMAGE_TAG = "v${env.BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
                echo "Code checked out"
            }
        }

        stage('Install & Build (Node Container)') {
            agent {
                docker {
                    image 'node:18'
                    args '-u root'
                }
            }
            steps {
                sh '''
                node -v
                npm -v
                npm install --legacy-peer-deps
                npm run build
                '''
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                docker build -t $IMAGE_NAME:$IMAGE_TAG .
                docker tag $IMAGE_NAME:$IMAGE_TAG $IMAGE_NAME:latest
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                kubectl apply -f deployment.yaml
                kubectl rollout restart deployment iot-dashboard
                kubectl rollout status deployment iot-dashboard
                '''
            }
        }
    }
}