pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Build React') {
            steps {
                bat 'npm install --legacy-peer-deps'
                bat 'npm run build'
            }
        }
        stage('Docker Build') {
            steps {
                bat "docker build -t iot-dashboard:v${env.BUILD_NUMBER} ."
                bat "docker tag iot-dashboard:v${env.BUILD_NUMBER} iot-dashboard:latest"
            }
        }
        stage('Deploy to K8s') {
            steps {
                bat 'kubectl apply -f deployment.yaml'
                // FORCE THE RESTART
                bat 'kubectl rollout restart deployment iot-dashboard'
            }
        }
    }
}