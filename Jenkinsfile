pipeline {
    agent any
    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm install --legacy-peer-deps'
            }
        }
        stage('Build React App') {
            steps {
                bat 'npm run build'
            }
        }
        stage('Docker Build') {
            steps {
                // Creates a unique tag for every build
                bat "docker build -t iot-dashboard:v${env.BUILD_NUMBER} ."
                bat "docker tag iot-dashboard:v${env.BUILD_NUMBER} iot-dashboard:latest"
            }
        }
        stage('Kubernetes Deploy') {
            steps {
                bat 'kubectl apply -f deployment.yaml'
                // Force Kubernetes to pull the new version immediately
                bat 'kubectl rollout restart deployment iot-dashboard'
            }
        }
    }
}