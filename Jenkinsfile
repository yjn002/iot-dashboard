pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Install') {
            steps { bat 'npm install --legacy-peer-deps' }
        }
        stage('Build React') {
            steps { bat 'npm run build' }
        }
        stage('Docker Image') {
            steps {
                bat "docker build -t iot-dashboard:v${env.BUILD_NUMBER} ."
                bat "docker tag iot-dashboard:v${env.BUILD_NUMBER} iot-dashboard:latest"
            }
        }
        stage('K8s Deployment') {
            steps {
                bat 'kubectl apply -f deployment.yaml'
                bat 'kubectl rollout restart deployment iot-dashboard'
            }
        }
    }
}